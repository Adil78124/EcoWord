import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonError, zodToFieldErrors } from "@/lib/api/response";
import { respondIfDatabaseNotConfigured } from "@/lib/db-config";
import { requireAdminApi } from "@/lib/admin/guard";
import { adminContactUpdateSchema } from "@/lib/validations/admin";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, context: Ctx) {
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  const db = respondIfDatabaseNotConfigured();
  if (db) return db;
  try {
    const { id } = await context.params;
    const body = await req.json();
    const parsed = adminContactUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Некорректные данные", 400, zodToFieldErrors(parsed.error));
    }
    const d = parsed.data;
    const row = await prisma.contactMessage.update({
      where: { id },
      data: {
        ...(d.name !== undefined ? { name: d.name } : {}),
        ...(d.email !== undefined ? { email: d.email.toLowerCase() } : {}),
        ...(d.subject !== undefined ? { subject: d.subject } : {}),
        ...(d.message !== undefined ? { message: d.message } : {}),
        ...(d.status !== undefined ? { status: d.status } : {}),
      },
    });
    return NextResponse.json({ success: true, item: row });
  } catch (e) {
    console.error(e);
    return jsonError("Не удалось обновить сообщение", 500);
  }
}

export async function DELETE(_req: Request, context: Ctx) {
  const auth = await requireAdminApi();
  if (auth instanceof Response) return auth;
  const db = respondIfDatabaseNotConfigured();
  if (db) return db;
  try {
    const { id } = await context.params;
    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return jsonError("Не удалось удалить сообщение", 500);
  }
}
