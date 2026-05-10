import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { attachUserSession } from "@/lib/auth/session";
import { jsonError, zodToFieldErrors } from "@/lib/api/response";
import { registerSchema } from "@/lib/validations/schemas";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";

export async function POST(req: Request) {
  const dbMissing = respondIfDatabaseNotConfigured();
  if (dbMissing) return dbMissing;
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Некорректные данные", 400, zodToFieldErrors(parsed.error));
    }
    const { name, email, phone, city, password } = parsed.data;
    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      return jsonError("Этот email уже зарегистрирован", 409, {
        email: ["Email занят"],
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone: phone?.trim() || null,
        city: city?.trim() || null,
        passwordHash,
        profile: {
          create: {
            bio: "",
            interests: "",
            volunteerHours: 0,
          },
        },
      },
    });
    const res = NextResponse.json({ success: true, userId: user.id });
    await attachUserSession(res, user.id, user.role);
    return res;
  } catch (e) {
    console.error(e);
    return jsonError("Ошибка сервера", 500);
  }
}
