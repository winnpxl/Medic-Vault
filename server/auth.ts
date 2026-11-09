import type { NextFunction, Request, Response } from "express";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { config } from "./config";
import { HttpError } from "./errors";

type AppRole = "super_admin" | "admin" | "staff";

type AuthenticatedUser = {
  uid: string;
  email?: string;
  role: AppRole;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

function initializeFirebaseAdmin(): void {
  if (getApps().length > 0) {
    return;
  }

  if (config.firebaseProjectId && config.firebaseClientEmail && config.firebasePrivateKey) {
    initializeApp({
      credential: cert({
        projectId: config.firebaseProjectId,
        clientEmail: config.firebaseClientEmail,
        privateKey: config.firebasePrivateKey,
      }),
      projectId: config.firebaseProjectId,
    });
    return;
  }

  initializeApp();
}

initializeFirebaseAdmin();

function extractBearerToken(authorization?: string): string {
  if (!authorization?.startsWith("Bearer ")) {
    throw new HttpError(401, "Missing or invalid Authorization header");
  }
  return authorization.slice("Bearer ".length).trim();
}

function parseRole(value: unknown): AppRole {
  if (value === "super_admin" || value === "admin" || value === "staff") {
    return value;
  }
  return "staff";
}

// The user's role lives in Firestore at users/{uid}.role (single source of truth).
// Firestore rules prevent users from changing their own role; scripts/manage-user.ts grants roles.
const ROLE_CACHE_TTL_MS = 60_000;
const roleCache = new Map<string, { role: AppRole; expires: number }>();

async function lookupRole(uid: string): Promise<AppRole> {
  const cached = roleCache.get(uid);
  if (cached && cached.expires > Date.now()) {
    return cached.role;
  }
  const snapshot = await getFirestore().doc(`users/${uid}`).get();
  const role = parseRole(snapshot.get("role"));
  roleCache.set(uid, { role, expires: Date.now() + ROLE_CACHE_TTL_MS });
  return role;
}

export async function requireAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  if (config.isTest) {
    const testUid = req.header("x-test-uid");
    const testRole = req.header("x-test-role");
    if (testUid && (testRole === "super_admin" || testRole === "admin" || testRole === "staff")) {
      req.user = {
        uid: testUid,
        email: req.header("x-test-email") ?? undefined,
        role: testRole,
      };
      next();
      return;
    }
  }

  try {
    const token = extractBearerToken(req.header("authorization"));
    // Revocation checks call the Admin API and need service-account credentials;
    // in development we verify signature/expiry only (needs just the project ID).
    const decoded = await getAuth().verifyIdToken(token, config.isProduction);
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      role: await lookupRole(decoded.uid),
    };
    next();
  } catch (error) {
    next(error instanceof HttpError ? error : new HttpError(401, "Unauthorized"));
  }
}

export function requireRole(roles: AppRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new HttpError(401, "Unauthorized"));
      return;
    }
    if (!roles.includes(req.user.role)) {
      next(new HttpError(403, "Forbidden"));
      return;
    }
    next();
  };
}
