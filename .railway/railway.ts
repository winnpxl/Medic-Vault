import { defineRailway, github, project, service, volume } from "railway/iac";
// This repository manages only its own resources in the environment. Other
// repositories export their own partial name.
// See https://docs.railway.com/infrastructure-as-code#multi-repo-projects
export const partial = "medic-vault";
export default defineRailway(() => {
  // SQLite lives here until the Postgres migration (Phase 0).
  const data = volume("medic-vault-volume", { region: "europe-west4-drams3a", sizeMB: 500 });

  const medicVault = service("medic-vault", {
    source: github("winnpxl/Medic-Vault", { branch: "main", checkSuites: false }),
    build: { buildCommand: "npm run build", buildEnvironment: "V3", builder: "RAILPACK" },
    start: "npm start",
    healthcheck: "/health",
    healthcheckTimeout: 60,
    deploy: { restartPolicyType: "ON_FAILURE", restartPolicyMaxRetries: 5 },
    volumeMounts: { "/data": data },
    replicas: { "europe-west4-drams3a": 1 },
  });

  return project("medic-vault", {
    // Keep env vars (Firebase keys etc.) out of IaC: Railway owns them. The CLI reads this
    // field, but railway@3.16.0's types don't declare it yet.
    // @ts-expect-error -- remove once the SDK types include `variables`.
    variables: { managed: false },
    resources: [data, medicVault],
  });
});
