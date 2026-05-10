import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  verifySessionToken,
} from "@/lib/auth/session-token";

/**
 * /admin только при включённой панели + валидная сессия + роль ADMIN в JWT.
 * Иначе редирект на /login (неавторизован) или сообщение о правах (не админ).
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (process.env.ADMIN_PANEL_ENABLED !== "true") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.redirect(loginUrl);
  }

  if (session.role !== "ADMIN") {
    const deny = new URL("/login", request.url);
    deny.searchParams.set("error", "admin_only");
    return NextResponse.redirect(deny);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
