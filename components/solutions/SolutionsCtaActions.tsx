"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";

export function SolutionsCtaActions() {
  const { t } = useI18n();
  return (
    <div className="flex max-w-full flex-col justify-center gap-4 md:flex-row md:flex-wrap">
      <Link
        href="/help"
        className="w-full rounded-full bg-white px-8 py-4 text-center font-bold text-secondary shadow-xl transition-all hover:scale-105 active:scale-95 md:w-auto"
      >
        {t("cta.participate")}
      </Link>
      <button
        type="button"
        className="w-full rounded-full border border-white/30 bg-primary-container/20 px-8 py-4 font-bold text-white transition-all hover:bg-white/10 md:w-auto"
        onClick={() => window.alert(t("cta.reportsSoon"))}
      >
        {t("cta.readReports")}
      </button>
    </div>
  );
}
