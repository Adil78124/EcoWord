import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonError, zodToFieldErrors } from "@/lib/api/response";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";
import { requireAdminApi } from "@/lib/admin/guard";
import { adminVolunteerUpdateSchema } from "@/lib/validations/admin";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, context: Ctx) {
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  const db = respondIfDatabaseNotConfigured();
  if (db) return db;
  try {
    const { id } = await context.params;
    const body = await req.json();
    const parsed = adminVolunteerUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Некорректные данные", 400, zodToFieldErrors(parsed.error));
    }
    const d = parsed.data;
    const row = await prisma.volunteerApplication.update({
      where: { id },
      data: {
        ...(d.name !== undefined ? { name: d.name } : {}),
        ...(d.phone !== undefined ? { phone: d.phone } : {}),
        ...(d.email !== undefined ? { email: d.email.toLowerCase() } : {}),
        ...(d.city !== undefined ? { city: d.city } : {}),
        ...(d.age !== undefined ? { age: d.age } : {}),
        ...(d.direction !== undefined ? { direction: d.direction } : {}),
        ...(d.experience !== undefined ? { experience: d.experience ?? "" } : {}),
        ...(d.comment !== undefined ? { comment: d.comment ?? "" } : {}),
        ...(d.status !== undefined ? { status: d.status } : {}),
      },
    });
    return NextResponse.json({ success: true, item: row });
  } catch (e) {
    console.error(e);
    return jsonError("Не удалось обновить заявку", 500);
  }
}

export async function DELETE(_req: Request, context: Ctx) {
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  const db = respondIfDatabaseNotConfigured();
  if (db) return db;
  try {
    const { id } = await context.params;
    await prisma.volunteerApplication.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return jsonError("Не удалось удалить заявку", 500);
  }
}
