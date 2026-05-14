"use client";

import { useI18n } from "@/components/i18n/I18nProvider";

const sections = [
  { h: "terms.s1h", p: "terms.s1p" },
  { h: "terms.s2h", p: "terms.s2p" },
  { h: "terms.s3h", p: "terms.s3p" },
  { h: "terms.s4h", p: "terms.s4p" },
  { h: "terms.s5h", p: "terms.s5p" },
  { h: "terms.s6h", p: "terms.s6p" },
] as const;

export default function TermsPage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto max-w-3xl overflow-x-hidden px-margin-mobile pb-unit-xl pt-32 md:px-margin-tablet md:pt-36 lg:px-margin-desktop">
      <h1 className="mb-unit-sm font-display-lg-mobile text-display-lg-mobile text-primary md:font-display-lg md:text-display-lg">
        {t("terms.title")}
      </h1>
      <p className="mb-unit-xl font-body-md leading-relaxed text-on-surface-variant md:text-body-lg">
        {t("terms.lead")}
      </p>
      <div className="space-y-unit-lg">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="mb-2 font-title-lg text-title-lg text-emerald-900">{t(s.h)}</h2>
            <p className="font-body-md leading-relaxed text-on-surface md:text-body-lg">
              {t(s.p)}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
