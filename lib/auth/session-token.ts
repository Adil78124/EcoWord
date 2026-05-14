import { SignJWT, jwtVerify } from "jose";

/** Роли в JWT совпадают с Prisma UserRole — без импорта @prisma/client (Edge middleware). */
export type SessionRole = "USER" | "VOLUNTEER" | "ADMIN";

export const SESSION_COOKIE = "ecoworld_session";

/** Для понятных ответов API до вызова signSessionToken. */
export function isJwtSecretConfigured(): boolean {
  const s = process.env.JWT_SECRET?.trim();
  return Boolean(s && s.length >= 16);
}

function getSecret(): Uint8Array {
  const s = process.env.JWT_SECRET;
  if (!s || s.length < 16) {
    throw new Error("JWT_SECRET must be set (min 16 chars)");
  }
  return new TextEncoder().encode(s);
}

export async function signSessionToken(
  userId: string,
  role: SessionRole,
): Promise<string> {
  return new SignJWT({ sub: userId, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string,
): Promise<{ userId: string; role: SessionRole } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const sub = payload.sub;
    if (typeof sub !== "string") return null;
    const r = payload.role;
    const role: SessionRole =
      r === "ADMIN" || r === "VOLUNTEER" || r === "USER" ? r : "USER";
    return { userId: sub, role };
  } catch {
    return null;
  }
}
