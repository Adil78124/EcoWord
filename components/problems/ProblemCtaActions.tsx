"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";

export function ProblemCtaActions() {
  const { t } = useI18n();
  return (
    <div className="relative z-10 flex w-full max-w-full flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
      <Link
        href="/volunteers#volunteer-form"
        className="w-full rounded-full bg-secondary-container px-8 py-4 text-center font-label-md text-label-md text-on-secondary-container transition-transform hover:scale-105 active:scale-95 sm:w-auto"
      >
        {t("probDetail.cta.volunteer")}
      </Link>
      <Link
        href="/help"
        className="w-full rounded-full border-2 border-on-primary/30 bg-white/10 px-8 py-4 text-center font-label-md text-label-md text-on-primary backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95 sm:w-auto"
      >
        {t("probDetail.cta.support")}
      </Link>
    </div>
  );
}
