import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonError, zodToFieldErrors } from "@/lib/api/response";
import { contactMessageSchema } from "@/lib/validations/schemas";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";

export async function POST(req: Request) {
  const dbMissing = respondIfDatabaseNotConfigured();
  if (dbMissing) return dbMissing;
  try {
    const body = await req.json();
    const parsed = contactMessageSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Некорректные данные", 400, zodToFieldErrors(parsed.error));
    }
    const d = parsed.data;
    const row = await prisma.contactMessage.create({
      data: {
        name: d.name,
        email: d.email,
        subject: d.subject,
        message: d.message,
      },
    });
    return NextResponse.json({ success: true, id: row.id });
  } catch (e) {
    console.error(e);
    return jsonError("Ошибка сервера", 500);
  }
}
