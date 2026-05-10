"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";

export function CtaSection() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-container-max px-margin-mobile py-16 md:px-margin-tablet md:py-24 lg:px-margin-desktop">
      <div className="nature-gradient relative overflow-hidden rounded-[32px] p-8 text-center md:p-20">
        <div className="absolute top-0 right-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-secondary-container/20 blur-2xl md:h-64 md:w-64 md:blur-3xl" />
        <div className="absolute bottom-0 left-0 hidden h-64 w-64 translate-y-1/2 -translate-x-1/2 rounded-full bg-primary-fixed-dim/10 blur-3xl md:block" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="mb-6 font-display-lg-mobile text-display-lg-mobile leading-tight text-on-primary md:mb-8 md:font-display-lg md:text-display-lg">
            {t("home.cta.title")}
          </h2>
          <p className="mb-8 font-body-md text-on-primary/80 md:mb-12 md:font-body-lg md:text-body-lg">
            {t("home.cta.sub")}
          </p>
          <Link
            href="/volunteers#volunteer-form"
            className="inline-flex w-full max-w-full items-center justify-center rounded-full bg-white px-8 py-4 font-bold text-lg text-primary shadow-xl transition-transform active:scale-95 md:w-auto md:px-12 md:py-5 md:font-display-lg-mobile md:text-display-lg-mobile md:shadow-2xl md:hover:bg-secondary-container"
          >
            {t("home.cta.join")}
          </Link>
        </div>
      </div>
    </section>
  );
}
