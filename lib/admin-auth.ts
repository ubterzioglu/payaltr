import { cookies } from "next/headers";

const COOKIE_NAME = "payal_admin_session";
const MAX_AGE = 60 * 60 * 8; // 8 saat

function getSecret(): string {
  const pass = process.env.ADMIN_PASS;
  if (!pass) throw new Error("ADMIN_PASS ortam değişkeni tanımlı değil.");
  return pass;
}

async function hmac(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeStringEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/** Belirtilen şifre ADMIN_PASS ile eşleşiyorsa true döner (timing-safe). */
export function verifyAdminPassword(candidate: string): boolean {
  return timingSafeStringEqual(candidate, getSecret());
}

/** Girişten sonra çağrılır — imzalı, http-only session cookie'si yazar. */
export async function setAdminSession(): Promise<void> {
  const issuedAt = Date.now().toString();
  const token = `${issuedAt}.${await hmac(issuedAt)}`;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function hasAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  return isValidToken(raw);
}

/** Middleware (Edge Runtime) içinden de kullanılır — Web Crypto tabanlı, Node'a bağımsız. */
export async function isValidToken(raw: string | undefined): Promise<boolean> {
  if (!raw) return false;
  const [issuedAt, sig] = raw.split(".");
  if (!issuedAt || !sig) return false;
  if (Date.now() - Number(issuedAt) > MAX_AGE * 1000) return false;
  const expectedSig = await hmac(issuedAt);
  return timingSafeStringEqual(sig, expectedSig);
}

export const ADMIN_SESSION_COOKIE = COOKIE_NAME;
