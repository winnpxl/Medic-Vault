# Deployment Promotion Setup

## Workflow
- File: `.github/workflows/deploy.yml`
- Trigger: push to `main` or manual `workflow_dispatch`.
- Flow:
  1. Build/test once and upload `dist` artifact.
  2. Deploy artifact to `staging` environment.
  3. Promote same artifact to `production` environment.

## Required GitHub Environments
Create these repository environments:
- `staging`
- `production`

Set protection rules:
- `staging`: optional reviewer approval.
- `production`: required reviewer approval (recommended).

## Required Environment Variables and Secrets

For `staging` environment:
- Variable: `STAGING_DEPLOY_TARGET`
- Secret: `STAGING_DEPLOY_TOKEN`

For `production` environment:
- Variable: `PRODUCTION_DEPLOY_TARGET`
- Secret: `PRODUCTION_DEPLOY_TOKEN`

## Final Step
Replace placeholder deploy lines in `.github/workflows/deploy.yml` with your real deployment command, for example:
- `./scripts/deploy.sh staging dist`
- `./scripts/deploy.sh production dist`
