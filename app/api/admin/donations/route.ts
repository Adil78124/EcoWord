import { NextResponse } from "next/server";
import type { DonationStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { jsonError, zodToFieldErrors } from "@/lib/api/response";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";
import { requireAdminApi } from "@/lib/admin/guard";
import { listQuerySchema } from "@/lib/validations/admin";

const STATUSES: DonationStatus[] = ["CREATED", "TEST_PAID", "CANCELLED"];

export async function GET(req: Request) {
  const db = respondIfDatabaseNotConfigured();
  if (db) return db;
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
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
    const where: Prisma.DonationWhereInput = {};
    if (status && STATUSES.includes(status as DonationStatus)) {
      where.status = status as DonationStatus;
    }
    if (q?.trim()) {
      const t = q.trim();
      where.OR = [
        { donorName: { contains: t, mode: "insensitive" } },
        { donorEmail: { contains: t, mode: "insensitive" } },
        { invoiceNumber: { contains: t, mode: "insensitive" } },
      ];
    }
    const rows = await prisma.donation.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({
      success: true,
      items: rows.map((d) => ({ ...d, amount: d.amount.toString() })),
    });
  } catch (e) {
    console.error(e);
    return jsonError("Ошибка сервера", 500);
  }
}
