import { jsonError } from "@/lib/api/response";

/** Возвращает Response, если Prisma не сможет подключиться (нет DATABASE_URL). */
export function respondIfDatabaseNotConfigured(): Response | null {
  if (!process.env.DATABASE_URL?.trim()) {
    return jsonError(
      "База данных не настроена: в папке web создайте файл .env и укажите DATABASE_URL (скопируйте из .env.example). После этого перезапустите npm run dev.",
      503,
    );
  }
  return null;
}
