import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/api/response";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";
import { requireAdminApi } from "@/lib/admin/guard";

/** Текущий пользователь админ-сессии (без чувствительных полей). */
export async function GET() {
  const db = respondIfDatabaseNotConfigured();
  if (db) return db;
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  try {
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: { id: true, email: true, name: true, role: true },
    });
    if (!user) {
      return jsonError("Пользователь не найден.", 404);
    }
    return NextResponse.json({ success: true, user });
  } catch (e) {
    console.error(e);
    return jsonError("Ошибка сервера", 500);
  }
}
