import { db } from "../db/client";
import { auditLogs } from "../db/schema";

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

export async function logAuditEvent(event: AuditEvent): Promise<void> {
  await db.insert(auditLogs).values({
    actorUid: event.actorUid,
    actorEmail: event.actorEmail ?? null,
    actorRole: event.actorRole,
    action: event.action,
    resourceType: event.resourceType,
    resourceId: event.resourceId ?? null,
    metadata: event.metadata ?? null,
    ipAddress: event.ipAddress ?? null,
    userAgent: event.userAgent ?? null,
  });
}
