import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type { UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { attachUserSession } from "@/lib/auth/session";
import {
  BOOTSTRAP_ADMIN_USER_ID,
  isBootstrapAdminLogin,
} from "@/lib/auth/bootstrap-admin";
import { jsonError } from "@/lib/api/response";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Некорректные данные", 400);
    }
    const { email, password } = parsed.data;

    if (isBootstrapAdminLogin(email, password)) {
      let userId = BOOTSTRAP_ADMIN_USER_ID;
      let role: UserRole = "ADMIN";
      if (process.env.DATABASE_URL?.trim()) {
        try {
          const u = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
          });
          if (u?.role === "ADMIN") {
            userId = u.id;
            role = u.role;
          }
        } catch (e) {
          console.error(e);
        }
      }
      const res = NextResponse.json({
        success: true,
        userId,
        role,
      });
      await attachUserSession(res, userId, role);
      return res;
    }

    const dbMissing = respondIfDatabaseNotConfigured();
    if (dbMissing) return dbMissing;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      return jsonError("Неверный email или пароль", 401);
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return jsonError("Неверный email или пароль", 401);
    }
    const res = NextResponse.json({
      success: true,
      userId: user.id,
      role: user.role,
    });
    await attachUserSession(res, user.id, user.role);
    return res;
  } catch (e) {
    console.error(e);
    return jsonError("Ошибка сервера", 500);
  }
}
