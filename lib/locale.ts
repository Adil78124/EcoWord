export type AppLocale = "ru" | "kz";

export function isAppLocale(v: string | null): v is AppLocale {
  return v === "ru" || v === "kz";
}
