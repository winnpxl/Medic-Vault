/**
 * Admin tool for Firebase users (uses the service account in .env, bypasses Firestore rules).
 *
 *   npx tsx scripts/manage-user.ts <email> [--password <new>] [--role staff|admin|super_admin] [--create]
 *
 * --password  set a new password directly (no reset email needed)
 * --role      set users/{uid}.role in Firestore (what the API checks)
 * --create    create the account if it does not exist (requires --password)
 * With only <email>, prints the account and its role.
 */
import "dotenv/config";
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth, type UserRecord } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const ROLES = ["staff", "admin", "super_admin"] as const;

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : undefined;
}

const email = process.argv[2];
const password = arg("--password");
const role = arg("--role");
const create = process.argv.includes("--create");

if (!email || email.startsWith("--")) {
  console.error("Usage: npx tsx scripts/manage-user.ts <email> [--password <new>] [--role <role>] [--create]");
  process.exit(1);
}
if (role && !ROLES.includes(role as (typeof ROLES)[number])) {
  console.error(`--role must be one of: ${ROLES.join(", ")}`);
  process.exit(1);
}
if (password && password.length < 8) {
  console.error("--password must be at least 8 characters");
  process.exit(1);
}

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  console.error("Missing FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY in .env");
  process.exit(1);
}

initializeApp({
  credential: cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

const auth = getAuth();
const db = getFirestore();

let user: UserRecord;
let created = false;
try {
  user = await auth.getUserByEmail(email);
} catch (error: any) {
  if (error?.code !== "auth/user-not-found") throw error;
  if (!create || !password) {
    console.error(`No account for ${email}. Re-run with --create --password <new> to create it.`);
    process.exit(1);
  }
  user = await auth.createUser({ email, password, emailVerified: true });
  created = true;
  console.log(`Created account ${email} (${user.uid})`);
}

if (password && !created) {
  await auth.updateUser(user.uid, { password });
  console.log(`Password updated for ${email}`);
}

const ref = db.doc(`users/${user.uid}`);
if (role) {
  const existing = await ref.get();
  await ref.set(
    {
      uid: user.uid,
      email,
      role,
      ...(existing.exists ? {} : { displayName: user.displayName ?? "", createdAt: new Date().toISOString() }),
      roleUpdatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
  console.log(`Role set to ${role}`);
}

const profile = (await ref.get()).data();
console.log({
  uid: user.uid,
  email: user.email,
  disabled: user.disabled,
  providers: user.providerData.map((p) => p.providerId),
  lastSignIn: user.metadata.lastSignInTime,
  role: profile?.role ?? "(no Firestore profile)",
});
