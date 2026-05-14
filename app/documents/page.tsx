"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";

const cards = [
  {
    href: "/privacy",
    titleKey: "doc.card.privacy.title" as const,
    descKey: "doc.card.privacy.desc" as const,
  },
  {
    href: "/terms",
    titleKey: "doc.card.terms.title" as const,
    descKey: "doc.card.terms.desc" as const,
  },
  {
    href: "#",
    stub: true,
    titleKey: "doc.card.reports.title" as const,
    descKey: "doc.card.reports.desc" as const,
  },
  {
    href: "#",
    stub: true,
    titleKey: "doc.card.partners.title" as const,
    descKey: "doc.card.partners.desc" as const,
  },
] as const;

export default function DocumentsPage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto max-w-container-max overflow-x-hidden px-margin-mobile pb-unit-xl pt-32 md:px-margin-tablet md:pt-36 lg:px-margin-desktop">
      <header className="mb-unit-xl max-w-3xl">
        <h1 className="mb-unit-sm font-display-lg-mobile text-display-lg-mobile text-primary md:font-display-lg md:text-display-lg">
          {t("doc.title")}
        </h1>
        <p className="font-body-md text-on-surface-variant md:font-body-lg md:text-body-lg">
          {t("doc.intro")}
        </p>
      </header>
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
        {cards.map((c) => (
          <div
            key={c.titleKey}
            className="glass-card ambient-shadow relative flex flex-col rounded-2xl border border-outline-variant/20 p-unit-lg"
          >
            {"stub" in c && c.stub ? (
              <span className="absolute top-4 right-4 rounded-full bg-surface-container-high px-2 py-0.5 font-label-sm text-label-sm text-on-surface-variant">
                {t("doc.stub")}
              </span>
            ) : null}
            <h2 className="mb-2 font-headline-md-mobile text-headline-md-mobile text-primary md:font-headline-md md:text-headline-md">
              {t(c.titleKey)}
            </h2>
            <p className="mb-unit-md flex-1 font-body-md text-body-md text-on-surface-variant">
              {t(c.descKey)}
            </p>
            {"stub" in c && c.stub ? (
              <span className="mt-auto inline-flex w-fit cursor-default rounded-full border border-outline-variant px-4 py-2 font-label-md text-label-md text-on-surface-variant">
                {t("doc.stub")}
              </span>
            ) : (
              <Link
                href={c.href}
                className="relative z-10 mt-auto inline-flex w-fit items-center gap-1 rounded-full bg-emerald-900 px-4 py-2 font-label-md text-label-md text-white transition-colors hover:bg-emerald-800"
              >
                {t("form.next")}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
