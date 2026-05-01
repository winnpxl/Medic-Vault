# Medic Vault Production Readiness Plan

## Phase 1 - Baseline Hardening (Current)
- [x] Ensure local secrets stay out of version control (`.env.local` ignored).
- [x] Add server-side environment loading and production env validation (`server/config.ts`).
- [x] Make cleanup script cross-platform in `package.json`.
- [x] Fix production static asset serving path to use repo `dist/`.
- [x] Add `/health` endpoint for basic uptime checks.

## Phase 2 - API Safety and Auth Enforcement
- [x] Add strict request/response schema validation for all API routes (initial `/api/patients` query validation complete).
- [x] Add centralized error middleware with safe error shapes.
- [x] Add auth middleware that verifies Firebase ID tokens server-side.
- [x] Enforce role-based access control in API handlers (admin route protection on `/api/stats`).
- [x] Add CORS allowlist, `helmet`, request size limits, and rate limiting.

## Phase 3 - Real Data Layer
- [x] Replace `src/patients.json` and hardcoded stats with database-backed services.
- [x] Add migrations and seed scripts (startup migration + seed on empty DB).
- [x] Add repository/service layer boundaries.
- [x] Add audit log table and write events for access-sensitive actions.

## Phase 4 - Test and Quality Gates
- [x] Add unit tests for service logic.
- [x] Add API integration tests for critical routes.
- [ ] Add end-to-end smoke tests for auth + patient list + details.
- [x] Enforce typecheck + tests in CI before merge.

## Phase 5 - Deployability and Observability
- [ ] Add structured logging and request IDs.
- [ ] Add error monitoring (e.g., Sentry) with environment tagging.
- [ ] Add readiness checks for dependent services.
- [ ] Configure staging and production deployment with environment promotion.

## Phase 6 - Medical Data Compliance Controls
- [ ] Define data retention/deletion policy.
- [ ] Ensure PHI-safe logging strategy.
- [ ] Document encryption at rest/in transit controls.
- [ ] Document incident response and access review procedures.
