"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";

export function SupportFab() {
  const { t } = useI18n();
  return (
    <div className="fixed right-8 bottom-8 z-50">
      <Link
        href="/help"
        aria-label={t("fab.helpAria")}
        className="nature-gradient-emerald flex h-16 w-16 items-center justify-center rounded-full text-white shadow-2xl transition-all hover:scale-110 active:scale-95"
      >
        <span className="material-symbols-outlined text-3xl">support_agent</span>
      </Link>
    </div>
  );
}
