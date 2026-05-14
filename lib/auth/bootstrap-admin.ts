/**
 * Временный фиксированный вход администратора (в т.ч. без DATABASE_URL).
 * Удалите после полноценной настройки БД и секретов на Vercel — не храните
 * пароли в репозитории в production.
 */
export const BOOTSTRAP_ADMIN_EMAIL = "admin@ecoworld.local";
export const BOOTSTRAP_ADMIN_PASSWORD = "EcoWorldAdmin2026!";
/** Совпадает с id в prisma/sql/add_admin.sql при сидировании админа. */
export const BOOTSTRAP_ADMIN_USER_ID = "cmadminseed00001ecoworldx";

export function isBootstrapAdminLogin(
  email: string,
  password: string,
): boolean {
  return (
    email.trim().toLowerCase() === BOOTSTRAP_ADMIN_EMAIL.toLowerCase() &&
    password === BOOTSTRAP_ADMIN_PASSWORD
  );
}

export function isBootstrapAdminSession(userId: string): boolean {
  return userId === BOOTSTRAP_ADMIN_USER_ID;
}
