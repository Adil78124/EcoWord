import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { generateInvoiceNumber } from "@/lib/donations/invoice";
import { jsonError, zodToFieldErrors } from "@/lib/api/response";
import { donationSchema } from "@/lib/validations/schemas";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";

export async function POST(req: Request) {
  const dbMissing = respondIfDatabaseNotConfigured();
  if (dbMissing) return dbMissing;
  try {
    const body = await req.json();
    const parsed = donationSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Некорректные данные", 400, zodToFieldErrors(parsed.error));
    }
    const d = parsed.data;
    const invoiceNumber = await generateInvoiceNumber();
    const row = await prisma.donation.create({
      data: {
        donorName: d.donorName,
        donorEmail: d.donorEmail,
        amount: new Prisma.Decimal(d.amount),
        type: d.type,
        status: "CREATED",
        invoiceNumber,
      },
    });
    return NextResponse.json({
      success: true,
      donationId: row.id,
      invoiceNumber: row.invoiceNumber,
      status: row.status,
      amount: row.amount.toString(),
      type: row.type,
    });
  } catch (e) {
    console.error(e);
    return jsonError("Ошибка сервера", 500);
  }
}
