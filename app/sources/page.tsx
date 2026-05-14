"use client";

import { useI18n } from "@/components/i18n/I18nProvider";
import { EXTRA_SOURCE_LINKS, SOURCE_SECTIONS } from "@/lib/sources-content";

export default function SourcesPage() {
  const { t } = useI18n();

  return (
    <main className="mx-auto max-w-3xl overflow-x-hidden px-margin-mobile pb-unit-xl pt-32 md:px-margin-tablet md:pt-36 lg:px-margin-desktop">
      <header className="mb-unit-xl">
        <h1 className="mb-unit-sm font-display-lg-mobile text-display-lg-mobile text-primary md:font-display-lg md:text-display-lg">
          {t("sources.pageTitle")}
        </h1>
        <p className="font-body-md leading-relaxed text-on-surface-variant md:text-body-lg">
          {t("sources.pageLead")}
        </p>
      </header>

      <div className="space-y-unit-xl">
        {SOURCE_SECTIONS.map((section) => (
          <section key={section.id} className="rounded-2xl border border-outline-variant/25 bg-surface-container-lowest/80 p-unit-lg">
            <h2 className="mb-unit-md font-headline-md-mobile text-headline-md-mobile text-emerald-900 md:font-headline-md md:text-headline-md">
              {section.heading}
            </h2>
            <ul className="space-y-unit-md">
              {section.entries.map((e) => (
                <li key={e.url} className="border-b border-outline-variant/20 pb-unit-md last:border-0 last:pb-0">
                  <a
                    href={encodeURI(e.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-title-lg text-title-lg text-primary underline-offset-2 hover:text-emerald-800 hover:underline"
                  >
                    {e.title}
                  </a>
                  {e.description ? (
                    <p className="mt-2 font-body-md leading-relaxed text-on-surface-variant">{e.description}</p>
                  ) : null}
                  <p className="mt-1 font-label-sm text-label-sm text-on-surface-variant/80">
                    {t("sources.linkLabel")}{" "}
                    <span className="break-all text-emerald-800/90">{e.url}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="rounded-2xl border border-outline-variant/25 bg-surface-container-lowest/80 p-unit-lg">
          <h2 className="mb-unit-md font-headline-md-mobile text-headline-md-mobile text-emerald-900 md:font-headline-md md:text-headline-md">
            {t("sources.extraTitle")}
          </h2>
          <ul className="list-inside list-disc space-y-2 font-body-md text-on-surface">
            {EXTRA_SOURCE_LINKS.map((e) => (
              <li key={e.url}>
                <a
                  href={encodeURI(e.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-2 hover:text-emerald-800 hover:underline"
                >
                  {e.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <aside className="rounded-2xl border border-emerald-800/20 bg-emerald-50/60 p-unit-lg">
          <h2 className="mb-2 font-title-lg text-title-lg text-emerald-950">{t("sources.importantTitle")}</h2>
          <p className="font-body-md leading-relaxed text-on-surface">{t("sources.importantBody")}</p>
        </aside>
      </div>
    </main>
  );
}
