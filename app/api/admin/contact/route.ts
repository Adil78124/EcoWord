import { NextResponse } from "next/server";
import type { ContactMessageStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { jsonError, zodToFieldErrors } from "@/lib/api/response";
import { isDatabaseConfigured } from "@/lib/db-config";
import { requireAdminApi } from "@/lib/admin/guard";
import { listQuerySchema } from "@/lib/validations/admin";

const STATUSES: ContactMessageStatus[] = ["NEW", "READ", "CLOSED"];

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
    const where: Prisma.ContactMessageWhereInput = {};
    if (status && STATUSES.includes(status as ContactMessageStatus)) {
      where.status = status as ContactMessageStatus;
    }
    if (q?.trim()) {
      const t = q.trim();
      where.OR = [
        { name: { contains: t, mode: "insensitive" } },
        { email: { contains: t, mode: "insensitive" } },
        { subject: { contains: t, mode: "insensitive" } },
      ];
    }
    const rows = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, items: rows });
  } catch (e) {
    console.error(e);
    return jsonError("Ошибка сервера", 500);
  }
}
