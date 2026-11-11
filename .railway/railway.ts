import { defineRailway, github, postgres, project, service, volume } from "railway/iac";
// This repository manages only its own resources in the environment. Other
// repositories export their own partial name.
// See https://docs.railway.com/infrastructure-as-code#multi-repo-projects
export const partial = "medic-vault";
export default defineRailway(() => {
  const region = "europe-west4-drams3a"; // EU West (Amsterdam), closest Railway region to Nigeria

  // App database. The service reaches it over the private network via
  // DATABASE_URL=${{Postgres.DATABASE_URL}} (set as a service variable; variables are not managed here).
  const db = postgres("Postgres", { region });

  // Old SQLite volume. No longer used by the app; remove once Postgres is confirmed in production.
  const data = volume("medic-vault-volume", { region, sizeMB: 500 });

  const medicVault = service("medic-vault", {
    source: github("winnpxl/Medic-Vault", { branch: "main", checkSuites: false }),
    build: { buildCommand: "npm run build", buildEnvironment: "V3", builder: "RAILPACK" },
    start: "npm start",
    healthcheck: "/health",
    healthcheckTimeout: 60,
    deploy: { restartPolicyType: "ON_FAILURE", restartPolicyMaxRetries: 5 },
    volumeMounts: { "/data": data },
    replicas: { [region]: 1 },
  });

  return project("medic-vault", {
    // Keep env vars (Firebase keys etc.) out of IaC: Railway owns them. The CLI reads this
    // field, but railway@3.16.0's types don't declare it yet.
    // @ts-expect-error -- remove once the SDK types include `variables`.
    variables: { managed: false },
    resources: [db, data, medicVault],
  });
});
