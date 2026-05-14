import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/api/response";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";
import { requireAdminApi } from "@/lib/admin/guard";
import {
  BOOTSTRAP_ADMIN_EMAIL,
  isBootstrapAdminSession,
} from "@/lib/auth/bootstrap-admin";

/** Текущий пользователь админ-сессии (без чувствительных полей). */
export async function GET() {
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  if (!process.env.DATABASE_URL?.trim()) {
    if (isBootstrapAdminSession(auth.userId)) {
      return NextResponse.json({
        success: true,
        user: {
          id: auth.userId,
          email: BOOTSTRAP_ADMIN_EMAIL,
          name: "Administrator",
          role: "ADMIN" as const,
        },
      });
    }
    const dbMissing = respondIfDatabaseNotConfigured();
    if (dbMissing) return dbMissing;
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: { id: true, email: true, name: true, role: true },
    });
    if (!user) {
      if (isBootstrapAdminSession(auth.userId)) {
        return NextResponse.json({
          success: true,
          user: {
            id: auth.userId,
            email: BOOTSTRAP_ADMIN_EMAIL,
            name: "Administrator",
            role: "ADMIN" as const,
          },
        });
      }
      return jsonError("Пользователь не найден.", 404);
    }
    return NextResponse.json({ success: true, user });
  } catch (e) {
    console.error(e);
    return jsonError("Ошибка сервера", 500);
  }
}
