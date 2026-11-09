import cors from "cors";
import type { Express } from "express";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./config";

const firebaseAuthDomain = process.env.VITE_FIREBASE_AUTH_DOMAIN;

// CSP that allows the Firebase Auth/Firestore SDKs and Google sign-in popup.
// In development, Vite needs inline scripts (React refresh preamble) and websockets (HMR).
function contentSecurityPolicy() {
  const dev = !config.isProduction;
  return {
    useDefaults: true,
    directives: {
      scriptSrc: ["'self'", "https://apis.google.com", ...(dev ? ["'unsafe-inline'"] : [])],
      connectSrc: [
        "'self'",
        "https://*.googleapis.com",
        "https://apis.google.com",
        ...(dev ? ["ws:", "wss:"] : []),
      ],
      frameSrc: [
        "'self'",
        "https://accounts.google.com",
        ...(firebaseAuthDomain ? [`https://${firebaseAuthDomain}`] : []),
      ],
      imgSrc: ["'self'", "data:", "blob:", "https:"],
      upgradeInsecureRequests: dev ? null : [],
    },
  };
}

export function applySecurityMiddleware(app: Express): void {
  app.use(
    helmet({
      contentSecurityPolicy: contentSecurityPolicy(),
      // Firebase signInWithPopup needs to talk to the Google popup window.
      crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
    }),
  );
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || config.allowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(new Error("Origin not allowed by CORS"));
      },
      credentials: true,
    }),
  );

  // Only rate-limit the API; static assets and Vite dev modules would otherwise exhaust the limit.
  app.use(
    "/api",
    rateLimit({
      windowMs: config.rateLimitWindowMs,
      limit: config.rateLimitMaxRequests,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.use(express.json({ limit: config.requestBodyLimit }));
}
