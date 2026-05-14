import { jsonError } from "@/lib/api/response";

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

/** Возвращает Response, если Prisma не сможет подключиться (нет DATABASE_URL). */
export function respondIfDatabaseNotConfigured(): Response | null {
  if (!isDatabaseConfigured()) {
    return jsonError(
      "База данных не подключена: задайте DATABASE_URL (локально в web/.env, на Vercel — Settings → Environment Variables), затем примените миграции (npx prisma migrate deploy).",
      503,
    );
  }
  return null;
}
