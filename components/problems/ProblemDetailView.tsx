"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { ProblemCtaActions } from "@/components/problems/ProblemCtaActions";
import { PROBLEMS_BY_SLUG, type ProblemSlug } from "@/lib/problems-detail";

type Props = {
  slug: ProblemSlug;
};

export function ProblemDetailView({ slug }: Props) {
  const { locale, t } = useI18n();
  const problem = PROBLEMS_BY_SLUG[slug];
  const content = problem.content[locale];

  const solutionItems = useMemo(
    () =>
      content.solutions.map((text) => ({
        text,
        key: `${slug}-${text.slice(0, 24)}`,
      })),
    [content.solutions, slug],
  );

  return (
    <main className="min-w-0 overflow-x-hidden pb-unit-xl pt-28 md:pt-32">
      <section className="relative mx-auto mb-unit-xl max-w-container-max px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
        <div className="group relative min-h-[220px] overflow-hidden rounded-[2rem] glass sm:min-h-[280px] md:min-h-[360px] lg:min-h-[420px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={problem.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/20" />
          <div className="relative flex min-h-[inherit] flex-col justify-end p-6 sm:p-8 md:p-12">
            <Link
              href="/"
              className="mb-4 inline-flex w-fit items-center gap-1 font-label-sm text-label-sm text-white/80 transition-colors hover:text-white"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              {t("probDetail.back")}
            </Link>
            <span className="material-symbols-outlined mb-3 text-4xl text-secondary-container md:text-5xl">
              {problem.icon}
            </span>
            <h1 className="max-w-3xl font-display-lg-mobile text-display-lg-mobile text-white md:font-display-lg md:text-display-lg">
              {content.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-unit-xl max-w-container-max px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
        <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-2">
          <div className="min-w-0 space-y-4">
            {content.intro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="font-body-md leading-relaxed text-on-surface-variant md:font-body-lg md:text-body-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="glass-card ambient-shadow overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="aspect-[4/3] w-full object-cover md:aspect-[16/10]"
              src={problem.image}
            />
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-unit-xl">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
            <div className="glass-card ambient-shadow rounded-2xl p-unit-lg md:p-unit-xl">
              <h2 className="mb-unit-md font-headline-md-mobile text-headline-md-mobile text-primary md:font-headline-md md:text-headline-md">
                {t("probDetail.whyImportant")}
              </h2>
              <p className="font-body-md leading-relaxed text-on-surface-variant md:font-body-lg md:text-body-lg">
                {content.whyImportant}
              </p>
            </div>
            <div className="glass-card ambient-shadow rounded-2xl p-unit-lg md:p-unit-xl">
              <h2 className="mb-unit-md font-headline-md-mobile text-headline-md-mobile text-primary md:font-headline-md md:text-headline-md">
                {t("probDetail.howWeSolve")}
              </h2>
              <ul className="space-y-3">
                {solutionItems.map((item) => (
                  <li key={item.key} className="flex gap-3">
                    <span className="material-symbols-outlined mt-0.5 shrink-0 text-secondary">
                      check_circle
                    </span>
                    <span className="font-body-md text-on-surface-variant">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-container-max px-margin-mobile py-unit-xl md:px-margin-tablet lg:px-margin-desktop">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary p-6 text-center text-on-primary sm:p-unit-xl">
          <div className="absolute top-0 right-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-32 -ml-32 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
          <h2 className="relative z-10 mb-unit-md font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md">
            {t("probDetail.cta.title")}
          </h2>
          <p className="relative z-10 mx-auto mb-unit-lg max-w-2xl font-body-md text-on-primary-container/90 md:font-body-lg md:text-body-lg">
            {t("probDetail.cta.sub")}
          </p>
          <ProblemCtaActions />
        </div>
      </section>
    </main>
  );
}
