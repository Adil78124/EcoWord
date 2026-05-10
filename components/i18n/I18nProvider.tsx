"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AppLocale } from "@/lib/locale";
import { isAppLocale } from "@/lib/locale";
import { LOCALE_STORAGE_KEY } from "@/lib/storage-keys";
import { translate } from "@/lib/i18n/bundle";

type I18nContextValue = {
  locale: AppLocale;
  setLocale: (l: AppLocale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n(): I18nContextValue {
  const c = useContext(I18nContext);
  if (!c) throw new Error("useI18n must be used within I18nProvider");
  return c;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>("ru");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isAppLocale(raw)) setLocaleState(raw);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale === "kz" ? "kk" : "ru";
  }, [locale, ready]);

  const setLocale = useCallback((l: AppLocale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback((key: string) => translate(locale, key), [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
