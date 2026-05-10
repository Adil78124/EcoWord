import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import type { UserRole } from "@prisma/client";
import {
  SESSION_COOKIE,
  signSessionToken,
  verifySessionToken,
  type SessionRole,
} from "@/lib/auth/session-token";

export {
  SESSION_COOKIE,
  type SessionRole,
} from "@/lib/auth/session-token";

const cookieBase = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export async function attachUserSession(
  res: NextResponse,
  userId: string,
  role: UserRole,
): Promise<void> {
  const token = await signSessionToken(userId, role as SessionRole);
  res.cookies.set(SESSION_COOKIE, token, cookieBase);
}

/** Полная сессия: userId + роль из JWT (после входа/регистрации). */
export async function getSession(): Promise<{
  userId: string;
  role: SessionRole;
} | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function getSessionUserId(): Promise<string | null> {
  const s = await getSession();
  return s?.userId ?? null;
}
