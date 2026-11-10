# Deployment

Production runs on two hosts. Both deploy automatically when `main` changes.

| Part | Host | URL |
| --- | --- | --- |
| Front end (built Vite app) | Vercel | https://medic-vault.vercel.app |
| API (Express server) + SQLite | Railway | https://medic-vault-production.up.railway.app |
| Auth + user profiles | Firebase project `medicvault` | https://console.firebase.google.com/project/medicvault |

## How a request flows

```
browser ──► medic-vault.vercel.app
              ├─ /api/*  ──rewrite──► Railway (Express) ──► SQLite on /data volume
              └─ else    ──► static files, falling back to index.html
```

- `vercel.json` rewrites `/api/*` to Railway. The browser sees one origin, so there is no CORS between front end and API.
- The Railway URL also serves the full app on its own, because Express serves `dist/` in production.

## Release flow

1. Open a PR. **CI** (`.github/workflows/ci.yml`) runs lint, tests and build, and Vercel builds a preview deployment.
   - Previews require a Vercel login.
   - Google sign-in doesn't work on preview URLs because they aren't Firebase authorized domains. Use email/password there.
2. Merge to `main`. Vercel and Railway each build and deploy `main` on their own. There is no deploy workflow in GitHub Actions.
3. Check: `curl https://medic-vault-production.up.railway.app/health` should return `{"status":"ok","env":"production"}`.

Rolling back: redeploy an earlier deployment from the Railway dashboard (Deployments → ⋯ → Redeploy), and in Vercel use Deployments → ⋯ → Promote to Production. You can also revert the commit on `main`.

## Railway

- Project `medic-vault`, service `medic-vault`, environment `production`.
- Source is GitHub `winnpxl/Medic-Vault`, branch `main`. The Railway GitHub App must have access to the repo.
- Service config is **Infrastructure as Code** in `.railway/railway.ts` (replaces the deprecated `railway.json`): build (`npm run build`), start (`npm start`), `/health` healthcheck, restart on failure (5 retries), region, and the `/data` volume.
  - Preview changes with `railway config plan` (read-only); apply with `railway config apply`. Always read the plan first: removing the volume from the file would detach it.
  - Env vars are **not** managed by the file (`variables: { managed: false }`); set them in the Railway dashboard or with `railway variables`.
  - The `railway` npm package (dev dependency) is the SDK the file imports.
- Region: **EU West (Amsterdam, `europe-west4`)**, chosen as the closest Railway region to Nigeria. Change with `railway scale eu-west=1 us-west=0` (scale the old region to 0 in the same command). Keep Postgres in the same region.
- Volume `medic-vault-volume` is mounted at `/data`. The database lives at `/data/medic-vault.db` and is seeded from `src/patients.json` when empty.

### Environment variables (Railway)

| Variable | Value / source |
| --- | --- |
| `VITE_FIREBASE_*` (7 vars) | Firebase web app config (Project settings → Your apps). Needed at **build** time. |
| `FIREBASE_PROJECT_ID` | `medicvault` |
| `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Service account key (Project settings → Service accounts). Used for token revocation checks and to read roles from Firestore. |
| `NODE_ENV` | `production` |
| `SQLITE_PATH` | `/data/medic-vault.db` |
| `TRUST_PROXY_HOPS` | `2` (Vercel rewrite + Railway edge), so rate limiting sees real client IPs |
| `CORS_ALLOWED_ORIGINS` | `https://medic-vault.vercel.app,https://medic-vault-production.up.railway.app` |

Manage them with `railway variables` or in the dashboard. Changing a variable redeploys the service.

## Vercel

- Builds the front end from `main` with the Vite preset. `vercel.json` holds the rewrites.
- It needs the same `VITE_FIREBASE_*` variables in Vercel project settings, because they are built into the bundle.
- If the Railway URL changes, update the destination in `vercel.json`.

## Firebase

- **Sign-in methods:** Email/Password and Google.
- **Authorized domains:** `localhost`, `medicvault.firebaseapp.com`, `medicvault.web.app`, `medic-vault.vercel.app`. Add any new production domain here, or Google sign-in will fail on it.
- **Firestore rules:** the source of truth is `firestore.rules` in the repo. Publish changes by pasting the file into Firestore → Rules → Publish.
  - Users can read and update their own `users/{uid}` profile but can't set or change `role`.
- **Roles:** the API reads `users/{uid}.role` (`staff`, `admin`, `super_admin`). Sign-up always creates `staff`. To grant a role or reset a password:

  ```
  npx tsx scripts/manage-user.ts <email> --role admin
  npx tsx scripts/manage-user.ts <email> --password '<new password>'
  ```

  This needs the service account variables in your local `.env`.

## Local development

```
cp .env.example .env    # then fill in the Firebase values (and the service account for role checks)
npm install
npm run dev             # Express + Vite on PORT (default 3000)
```

In development the server skips the token revocation check and relaxes the CSP for Vite (inline scripts, HMR websockets).
