import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonError, zodToFieldErrors } from "@/lib/api/response";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";
import { requireAdminApi } from "@/lib/admin/guard";
import { adminUserUpdateSchema } from "@/lib/validations/admin";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, context: Ctx) {
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  const db = respondIfDatabaseNotConfigured();
  if (db) return db;
  try {
    const { id } = await context.params;
    const body = await req.json();
    const parsed = adminUserUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Некорректные данные", 400, zodToFieldErrors(parsed.error));
    }
    const d = parsed.data;
    if (id === auth.userId && d.role !== undefined) {
      return jsonError("Нельзя изменить собственную роль.", 400);
    }
    if (d.email) {
      const existing = await prisma.user.findFirst({
        where: { email: d.email.toLowerCase(), NOT: { id } },
        select: { id: true },
      });
      if (existing) {
        return jsonError("Email уже занят другим пользователем.", 409, {
          email: ["Email занят"],
        });
      }
    }
    const row = await prisma.user.update({
      where: { id },
      data: {
        ...(d.name !== undefined ? { name: d.name } : {}),
        ...(d.email !== undefined ? { email: d.email.toLowerCase() } : {}),
        ...(d.phone !== undefined ? { phone: d.phone.trim() || null } : {}),
        ...(d.city !== undefined ? { city: d.city.trim() || null } : {}),
        ...(d.role !== undefined ? { role: d.role } : {}),
      },
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
            id: true,
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
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  const db = respondIfDatabaseNotConfigured();
  if (db) return db;
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
