import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { jsonError, zodToFieldErrors } from "@/lib/api/response";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";
import { requireAdminApi } from "@/lib/admin/guard";
import {
  BOOTSTRAP_ADMIN_EMAIL,
  isBootstrapAdminSession,
} from "@/lib/auth/bootstrap-admin";
import { adminProfileUpdateSchema } from "@/lib/validations/admin";

function bootstrapAdminResponse(userId: string) {
  return NextResponse.json({
    success: true,
    user: {
      id: userId,
      email: BOOTSTRAP_ADMIN_EMAIL,
      name: "Administrator",
      role: "ADMIN" as const,
    },
  });
}

export async function GET() {
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  if (!process.env.DATABASE_URL?.trim()) {
    if (isBootstrapAdminSession(auth.userId)) {
      return bootstrapAdminResponse(auth.userId);
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
        return bootstrapAdminResponse(auth.userId);
      }
      return jsonError("Пользователь не найден.", 404);
    }
    return NextResponse.json({ success: true, user });
  } catch (e) {
    console.error(e);
    return jsonError("Ошибка сервера", 500);
  }
}

export async function PATCH(req: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  const dbMissing = respondIfDatabaseNotConfigured();
  if (dbMissing) return dbMissing;
  if (isBootstrapAdminSession(auth.userId)) {
    return jsonError("Профиль bootstrap-администратора нельзя изменить из панели.", 400);
  }
  try {
    const body = await req.json();
    const parsed = adminProfileUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Некорректные данные", 400, zodToFieldErrors(parsed.error));
    }
    const { name, email, currentPassword, newPassword } = parsed.data;
    const user = await prisma.user.findUnique({ where: { id: auth.userId } });
    if (!user) return jsonError("Пользователь не найден.", 404);

    const nextEmail = email.toLowerCase();
    if (nextEmail !== user.email) {
      const existing = await prisma.user.findUnique({
        where: { email: nextEmail },
        select: { id: true },
      });
      if (existing) {
        return jsonError("Email уже занят другим пользователем.", 409, {
          email: ["Email занят"],
        });
      }
    }

    const data: { name: string; email: string; passwordHash?: string } = {
      name,
      email: nextEmail,
    };
    if (newPassword) {
      const ok = await bcrypt.compare(currentPassword ?? "", user.passwordHash);
      if (!ok) {
        return jsonError("Текущий пароль указан неверно.", 400, {
          currentPassword: ["Неверный пароль"],
        });
      }
      data.passwordHash = await bcrypt.hash(newPassword, 10);
    }

    const updated = await prisma.user.update({
      where: { id: auth.userId },
      data,
      select: { id: true, email: true, name: true, role: true },
    });
    return NextResponse.json({ success: true, user: updated });
  } catch (e) {
    console.error(e);
    return jsonError("Не удалось обновить профиль", 500);
  }
}
