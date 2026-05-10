import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonError, zodToFieldErrors } from "@/lib/api/response";
import { volunteerApplicationSchema } from "@/lib/validations/schemas";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";

export async function POST(req: Request) {
  const dbMissing = respondIfDatabaseNotConfigured();
  if (dbMissing) return dbMissing;
  try {
    const body = await req.json();
    const parsed = volunteerApplicationSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Некорректные данные", 400, zodToFieldErrors(parsed.error));
    }
    const d = parsed.data;
    const row = await prisma.volunteerApplication.create({
      data: {
        name: d.name,
        phone: d.phone,
        email: d.email,
        city: d.city,
        age: d.age,
        direction: d.direction,
        experience: d.experience ?? "",
        comment: d.comment ?? "",
      },
    });
    return NextResponse.json({ success: true, id: row.id });
  } catch (e) {
    console.error(e);
    return jsonError("Ошибка сервера", 500);
  }
}
