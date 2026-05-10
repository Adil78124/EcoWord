"use client";

import { useI18n } from "@/components/i18n/I18nProvider";
import type { AppLocale } from "@/lib/locale";

type LanguageSwitcherProps = {
  variant?: "inline" | "pill";
};

export function LanguageSwitcher({ variant = "inline" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();

  const select = (next: AppLocale) => {
    setLocale(next);
  };

  if (variant === "pill") {
    return (
      <div className="flex items-center rounded-full border border-outline-variant/30 bg-surface-container-low px-2 py-1 font-label-sm font-semibold text-label-sm">
        <button
          type="button"
          className={
            locale === "ru"
              ? "cursor-pointer rounded-full bg-primary px-2 py-0.5 text-on-primary"
              : "cursor-pointer rounded-full px-2 py-0.5 text-on-surface-variant"
          }
          onClick={() => select("ru")}
          aria-pressed={locale === "ru"}
        >
          RU
        </button>
        <button
          type="button"
          className={
            locale === "kz"
              ? "cursor-pointer rounded-full bg-primary px-2 py-0.5 text-on-primary"
              : "cursor-pointer rounded-full px-2 py-0.5 text-on-surface-variant"
          }
          onClick={() => select("kz")}
          aria-pressed={locale === "kz"}
        >
          KZ
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant lg:gap-2">
      <button
        type="button"
        className={
          locale === "ru"
            ? "cursor-pointer font-bold text-primary"
            : "cursor-pointer text-outline-variant transition-colors hover:text-primary"
        }
        onClick={() => select("ru")}
        aria-pressed={locale === "ru"}
      >
        RU
      </button>
      <span className="text-outline-variant">|</span>
      <button
        type="button"
        className={
          locale === "kz"
            ? "cursor-pointer font-bold text-primary"
            : "cursor-pointer text-outline-variant transition-colors hover:text-primary"
        }
        onClick={() => select("kz")}
        aria-pressed={locale === "kz"}
      >
        KZ
      </button>
    </div>
  );
}
