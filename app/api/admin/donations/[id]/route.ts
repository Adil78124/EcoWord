import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { jsonError, zodToFieldErrors } from "@/lib/api/response";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";
import { requireAdminApi } from "@/lib/admin/guard";
import { adminDonationUpdateSchema } from "@/lib/validations/admin";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, context: Ctx) {
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  const db = respondIfDatabaseNotConfigured();
  if (db) return db;
  try {
    const { id } = await context.params;
    const body = await req.json();
    const parsed = adminDonationUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Некорректные данные", 400, zodToFieldErrors(parsed.error));
    }
    const d = parsed.data;
    const row = await prisma.donation.update({
      where: { id },
      data: {
        ...(d.donorName !== undefined ? { donorName: d.donorName } : {}),
        ...(d.donorEmail !== undefined ? { donorEmail: d.donorEmail.toLowerCase() } : {}),
        ...(d.amount !== undefined ? { amount: new Prisma.Decimal(d.amount) } : {}),
        ...(d.type !== undefined ? { type: d.type } : {}),
        ...(d.status !== undefined ? { status: d.status } : {}),
      },
    });
    return NextResponse.json({
      success: true,
      item: { ...row, amount: row.amount.toString() },
    });
  } catch (e) {
    console.error(e);
    return jsonError("Не удалось обновить запись", 500);
  }
}

export async function DELETE(_req: Request, context: Ctx) {
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  const db = respondIfDatabaseNotConfigured();
  if (db) return db;
  try {
    const { id } = await context.params;
    await prisma.donation.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return jsonError("Не удалось удалить запись", 500);
  }
}
