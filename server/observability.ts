import type { Express, NextFunction, Request, Response } from "express";
import crypto from "crypto";
import * as Sentry from "@sentry/node";
import { config } from "./config";

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
    }
  }
}

function sanitizePath(pathname: string): string {
  return pathname.replace(/[A-Za-z0-9_-]{12,}/g, ":id");
}

export function initializeMonitoring(): void {
  if (!config.sentryDsn) {
    return;
  }

  Sentry.init({
    dsn: config.sentryDsn,
    environment: config.nodeEnv,
    enabled: !config.isTest,
    tracesSampleRate: config.sentryTracesSampleRate,
  });
}

export function applyObservabilityMiddleware(app: Express): void {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const startedAt = Date.now();
    const requestId = req.header("x-request-id") ?? crypto.randomUUID();
    req.requestId = requestId;
    res.setHeader("x-request-id", requestId);

    res.on("finish", () => {
      const durationMs = Date.now() - startedAt;
      const line = {
        ts: new Date().toISOString(),
        level: res.statusCode >= 500 ? "error" : "info",
        msg: "http_request",
        requestId,
        method: req.method,
        path: sanitizePath(req.path),
        status: res.statusCode,
        durationMs,
      };
      console.log(JSON.stringify(line));
    });

    next();
  });
}

export function captureException(error: unknown, req: Request): void {
  if (!config.sentryDsn || config.isTest) {
    return;
  }

  Sentry.withScope((scope) => {
    scope.setTag("request_id", req.requestId ?? "unknown");
    scope.setTag("http_method", req.method);
    scope.setTag("path", sanitizePath(req.path));
    scope.setContext("request", {
      requestId: req.requestId,
      method: req.method,
      path: sanitizePath(req.path),
      userId: req.user?.uid,
      role: req.user?.role,
    });
    Sentry.captureException(error);
  });
}
