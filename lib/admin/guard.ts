import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";
import { isBootstrapAdminSession } from "@/lib/auth/bootstrap-admin";
import { jsonError } from "@/lib/api/response";

export type AdminGuardOk = { userId: string };

/**
 * Защита API админки: флаг окружения + JWT с ролью ADMIN + подтверждение в БД.
 */
export async function requireAdminApi(): Promise<AdminGuardOk | Response> {
  if (process.env.ADMIN_PANEL_ENABLED !== "true") {
    return jsonError("Панель администратора отключена.", 403);
  }
  const session = await getSession();
  if (!session) {
    return jsonError("Требуется войти в систему.", 401);
  }
  if (session.role !== "ADMIN") {
    return jsonError("Недостаточно прав: нужна роль ADMIN.", 403);
  }
  if (isBootstrapAdminSession(session.userId)) {
    return { userId: session.userId };
  }
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, role: true },
  });
  if (!user || user.role !== "ADMIN") {
    return jsonError("Недостаточно прав: нужна роль ADMIN.", 403);
  }
  return { userId: user.id };
}
