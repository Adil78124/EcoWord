/**
 * Заготовка под полноценные переводы (например next-intl).
 * Сейчас локаль хранится в localStorage через LanguageSwitcher;
 * при подключении i18n сюда можно вынести словари и хелпер t().
 */
export type MessageKey = string;

export const SUPPORTED_LOCALES = ["ru", "kz"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
