import type { NextFunction, Request, Response } from "express";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
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

export async function requireAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const token = extractBearerToken(req.header("authorization"));
    const decoded = await getAuth().verifyIdToken(token, true);
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      role: parseRole(decoded.role),
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
