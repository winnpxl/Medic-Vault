import dotenv from "dotenv";

dotenv.config();

function readEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function isProd(): boolean {
  return process.env.NODE_ENV === "production";
}

const prod = isProd();

export const config = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProduction: prod,
  port: Number.parseInt(process.env.PORT ?? "3000", 10),
  host: process.env.HOST ?? "0.0.0.0",
  appBaseDir: process.cwd(),
  requireFirebaseConfig: prod,
};

if (config.requireFirebaseConfig) {
  readEnv("VITE_FIREBASE_API_KEY");
  readEnv("VITE_FIREBASE_AUTH_DOMAIN");
  readEnv("VITE_FIREBASE_PROJECT_ID");
  readEnv("VITE_FIREBASE_STORAGE_BUCKET");
  readEnv("VITE_FIREBASE_MESSAGING_SENDER_ID");
  readEnv("VITE_FIREBASE_APP_ID");
}
