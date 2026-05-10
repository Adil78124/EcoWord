import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonError, zodToFieldErrors } from "@/lib/api/response";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";
import { requireAdminApi } from "@/lib/admin/guard";
import { userRoleSchema } from "@/lib/validations/admin";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, context: Ctx) {
  const db = respondIfDatabaseNotConfigured();
  if (db) return db;
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  try {
    const { id } = await context.params;
    const body = await req.json();
    const parsed = userRoleSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Некорректные данные", 400, zodToFieldErrors(parsed.error));
    }
    if (id === auth.userId) {
      return jsonError("Нельзя изменить собственную роль.", 400);
    }
    const row = await prisma.user.update({
      where: { id },
      data: { role: parsed.data.role },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        city: true,
        role: true,
        createdAt: true,
        profile: {
          select: {
            bio: true,
            interests: true,
            volunteerHours: true,
            avatarUrl: true,
          },
        },
      },
    });
    return NextResponse.json({ success: true, item: row });
  } catch (e) {
    console.error(e);
    return jsonError("Не удалось обновить пользователя", 500);
  }
}

export async function DELETE(_req: Request, context: Ctx) {
  const db = respondIfDatabaseNotConfigured();
  if (db) return db;
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  try {
    const { id } = await context.params;
    if (id === auth.userId) {
      return jsonError("Нельзя удалить собственную учётную запись.", 400);
    }
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return jsonError("Не удалось удалить пользователя", 500);
  }
}
