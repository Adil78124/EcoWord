import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth/session";
import { jsonError } from "@/lib/api/response";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";

export async function GET() {
  const dbMissing = respondIfDatabaseNotConfigured();
  if (dbMissing) return dbMissing;
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return jsonError("Не авторизован", 401);
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
    if (!user) {
      return jsonError("Пользователь не найден", 404);
    }
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        role: user.role,
      },
      profile: user.profile
        ? {
            avatarUrl: user.profile.avatarUrl,
            bio: user.profile.bio,
            interests: user.profile.interests,
            volunteerHours: user.profile.volunteerHours,
          }
        : null,
    });
  } catch (e) {
    console.error(e);
    return jsonError("Ошибка сервера", 500);
  }
}
