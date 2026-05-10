import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonError, zodToFieldErrors } from "@/lib/api/response";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";
import { requireAdminApi } from "@/lib/admin/guard";
import { donationStatusSchema } from "@/lib/validations/admin";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, context: Ctx) {
  const db = respondIfDatabaseNotConfigured();
  if (db) return db;
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  try {
    const { id } = await context.params;
    const body = await req.json();
    const parsed = donationStatusSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Некорректные данные", 400, zodToFieldErrors(parsed.error));
    }
    const row = await prisma.donation.update({
      where: { id },
      data: { status: parsed.data.status },
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
  const db = respondIfDatabaseNotConfigured();
  if (db) return db;
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  try {
    const { id } = await context.params;
    await prisma.donation.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return jsonError("Не удалось удалить запись", 500);
  }
}
