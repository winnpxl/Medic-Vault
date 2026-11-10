import { bigserial, index, integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

// Phase 0: same shape as the old SQLite tables. Phase 1 adds organizations and
// scopes every table by organization_id (see notes/PRODUCT_ROADMAP.md).

export const patients = pgTable(
  "patients",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    age: integer("age").notNull(),
    status: text("status").notNull(),
    files: integer("files").notNull().default(0),
    department: text("department").notNull(),
    lastUpdated: text("last_updated").notNull(),
  },
  (t) => [
    index("idx_patients_department").on(t.department),
    index("idx_patients_status").on(t.status),
    index("idx_patients_name").on(t.name),
  ],
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    actorUid: text("actor_uid").notNull(),
    actorEmail: text("actor_email"),
    actorRole: text("actor_role").notNull(),
    action: text("action").notNull(),
    resourceType: text("resource_type").notNull(),
    resourceId: text("resource_id"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("idx_audit_actor_uid").on(t.actorUid),
    index("idx_audit_action").on(t.action),
    index("idx_audit_created_at").on(t.createdAt),
  ],
);

export type PatientRecord = typeof patients.$inferSelect;
