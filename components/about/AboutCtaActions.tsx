"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";

export function AboutCtaActions() {
  const { t } = useI18n();
  return (
    <div className="relative z-10 flex max-w-full flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
      <Link
        href="/help"
        className="w-full rounded-full bg-secondary-container px-8 py-4 text-center font-label-md text-label-md text-on-secondary-container transition-transform hover:scale-105 sm:w-auto"
      >
        {t("cta.participate")}
      </Link>
      <button
        type="button"
        className="w-full rounded-full border border-white/20 px-8 py-4 font-label-md text-label-md text-white transition-colors hover:bg-white/10 sm:w-auto"
        onClick={() => window.alert(t("cta.reportsSoon"))}
      >
        {t("cta.readImpact")}
      </button>
    </div>
  );
}
