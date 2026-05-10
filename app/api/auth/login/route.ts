import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { attachUserSession } from "@/lib/auth/session";
import { jsonError } from "@/lib/api/response";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const dbMissing = respondIfDatabaseNotConfigured();
  if (dbMissing) return dbMissing;
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Некорректные данные", 400);
    }
    const { email, password } = parsed.data;
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
