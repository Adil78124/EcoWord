import { NextResponse } from "next/server";
import type { Prisma, UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { jsonError, zodToFieldErrors } from "@/lib/api/response";
import { isDatabaseConfigured } from "@/lib/db-config";
import { requireAdminApi } from "@/lib/admin/guard";
import { listQuerySchema } from "@/lib/validations/admin";

const ROLES: UserRole[] = ["USER", "VOLUNTEER", "ADMIN"];

export async function GET(req: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ success: true, items: [] });
  }
  try {
    const { searchParams } = new URL(req.url);
    const parsed = listQuerySchema.safeParse({
      status: searchParams.get("status") ?? undefined,
      q: searchParams.get("q") ?? undefined,
    });
    if (!parsed.success) {
      return jsonError("Некорректные параметры", 400, zodToFieldErrors(parsed.error));
    }
    const { status, q } = parsed.data;
    const where: Prisma.UserWhereInput = {};
    if (status && ROLES.includes(status as UserRole)) {
      where.role = status as UserRole;
    }
    if (q?.trim()) {
      const t = q.trim();
      where.OR = [
        { name: { contains: t, mode: "insensitive" } },
        { email: { contains: t, mode: "insensitive" } },
        { phone: { contains: t, mode: "insensitive" } },
      ];
    }
    const rows = await prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
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
    return NextResponse.json({ success: true, items: rows });
  } catch (e) {
    console.error(e);
    return jsonError("Ошибка сервера", 500);
  }
}
