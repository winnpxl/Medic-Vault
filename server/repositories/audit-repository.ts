import { db } from "../database";

type AuditEvent = {
  actorUid: string;
  actorEmail?: string;
  actorRole: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
};

const insertAuditLog = db.prepare(`
  INSERT INTO audit_logs (
    actor_uid,
    actor_email,
    actor_role,
    action,
    resource_type,
    resource_id,
    metadata_json,
    ip_address,
    user_agent
  ) VALUES (
    @actorUid,
    @actorEmail,
    @actorRole,
    @action,
    @resourceType,
    @resourceId,
    @metadataJson,
    @ipAddress,
    @userAgent
  )
`);

export function logAuditEvent(event: AuditEvent): void {
  insertAuditLog.run({
    actorUid: event.actorUid,
    actorEmail: event.actorEmail ?? null,
    actorRole: event.actorRole,
    action: event.action,
    resourceType: event.resourceType,
    resourceId: event.resourceId ?? null,
    metadataJson: event.metadata ? JSON.stringify(event.metadata) : null,
    ipAddress: event.ipAddress ?? null,
    userAgent: event.userAgent ?? null,
  });
}
