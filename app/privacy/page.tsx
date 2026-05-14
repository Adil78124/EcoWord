"use client";

import { useI18n } from "@/components/i18n/I18nProvider";

const sections = [
  { h: "privacy.s1h", p: "privacy.s1p" },
  { h: "privacy.s2h", p: "privacy.s2p" },
  { h: "privacy.s3h", p: "privacy.s3p" },
  { h: "privacy.s4h", p: "privacy.s4p" },
  { h: "privacy.s5h", p: "privacy.s5p" },
  { h: "privacy.s6h", p: "privacy.s6p" },
] as const;

export default function PrivacyPage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto max-w-3xl overflow-x-hidden px-margin-mobile pb-unit-xl pt-32 md:px-margin-tablet md:pt-36 lg:px-margin-desktop">
      <h1 className="mb-unit-sm font-display-lg-mobile text-display-lg-mobile text-primary md:font-display-lg md:text-display-lg">
        {t("privacy.title")}
      </h1>
      <p className="mb-unit-xl font-body-md leading-relaxed text-on-surface-variant md:text-body-lg">
        {t("privacy.lead")}
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
