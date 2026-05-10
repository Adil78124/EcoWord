import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/api/response";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_req: Request, context: RouteContext) {
  const dbMissing = respondIfDatabaseNotConfigured();
  if (dbMissing) return dbMissing;
  try {
    const { id } = await context.params;
    const donation = await prisma.donation.findUnique({ where: { id } });
    if (!donation) {
      return jsonError("Пожертвование не найдено", 404);
    }
    if (donation.status === "CANCELLED") {
      return jsonError("Счёт отменён", 400);
    }
    const updated = await prisma.donation.update({
      where: { id },
      data: { status: "TEST_PAID" },
    });
    return NextResponse.json({
      success: true,
      donationId: updated.id,
      invoiceNumber: updated.invoiceNumber,
      status: updated.status,
      amount: updated.amount.toString(),
      type: updated.type,
    });
  } catch (e) {
    console.error(e);
    return jsonError("Ошибка сервера", 500);
  }
}
