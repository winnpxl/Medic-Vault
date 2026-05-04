# Medic Vault Compliance Runbook (Phase 6)

## Scope
This runbook defines baseline controls for handling medical data and PHI in Medic Vault.

## 1) Data Retention and Deletion Policy

### Data Classes
- Patient records: core medical metadata and identifiers.
- Audit logs: access/activity records for regulated traceability.
- Operational logs: server events, request telemetry, error traces.

### Retention Windows
- Patient records: retain for 7 years minimum from last patient activity (or stricter local legal requirement).
- Audit logs: retain for 6 years minimum.
- Operational logs: retain for 90 days in hot storage, then archive up to 1 year.

### Deletion Controls
- Soft-delete first, hard-delete by scheduled purge job after retention period.
- Purge jobs must write an audit event (`action=record.purge`).
- Deletion requests must be ticketed and approved by authorized operations/legal owner.

### Backup/Restore Retention
- Daily backups retained 35 days.
- Monthly backups retained 12 months.
- Restores are tested quarterly and documented.

## 2) PHI-Safe Logging Strategy

### Logging Rules
- Never log full patient names, emails, diagnosis text, file contents, access tokens, or private keys.
- Log stable IDs only (e.g., patient ID, user UID, request ID).
- Mask identifiers if they could map directly to external identity in shared logs.

### Redaction Standard
- Use `[REDACTED]` for blocked fields.
- For partial masking use last 4 chars only (example: `***A12F`).

### Required Log Fields
- `ts`, `level`, `msg`, `requestId`, `path`, `status`, `durationMs`.
- Optional actor fields: `userId`, `role` (no email unless strictly required).

### Access Controls
- Logs are restricted to least-privilege roles (Ops/Security only).
- Exported logs must be encrypted and access-audited.

## 3) Encryption Controls (At Rest and In Transit)

### In Transit
- TLS 1.2+ mandatory for all client and service traffic.
- HSTS enabled at edge/load balancer.
- Plain HTTP redirected to HTTPS.

### At Rest
- Database volumes encrypted using platform-managed encryption (AES-256 equivalent).
- Object/file storage encrypted at rest.
- Backup archives encrypted at rest.

### Key Management
- Secrets and keys stored only in environment/secret manager (never in repo).
- Key rotation every 90 days for high-sensitivity credentials.
- Immediate rotation on suspected compromise.

## 4) Incident Response and Access Review Procedures

### Incident Severity
- Sev-1: confirmed PHI exposure or unauthorized production access.
- Sev-2: suspected PHI exposure or security control bypass.
- Sev-3: contained misconfiguration with no confirmed exposure.

### Response Timeline
- T+0: open incident, assign incident commander, freeze risky deployments.
- T+15m: scope affected systems, revoke suspicious sessions/tokens.
- T+60m: mitigation update and preliminary blast-radius report.
- T+24h: documented root cause and remediation plan.

### Notification
- Notify security lead immediately for Sev-1/Sev-2.
- Legal/compliance notification follows jurisdictional requirements.

### Access Reviews
- Quarterly review of all privileged accounts and service tokens.
- Immediate deprovision on role change or offboarding.
- Review output stored with reviewer, date, and action results.

## Operational Checklist
- [ ] Confirm retention jobs exist and are scheduled.
- [ ] Confirm log redaction tests run in CI.
- [ ] Confirm TLS and encryption settings in staging/production.
- [ ] Confirm quarterly restore test and access review calendar.
