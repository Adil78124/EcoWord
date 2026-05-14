"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { AboutCtaActions } from "@/components/about/AboutCtaActions";

export default function AboutPage() {
  const { t } = useI18n();

  const values = useMemo(
    () =>
      [
        {
          icon: "nature" as const,
          circle: "bg-secondary-container",
          icolor: "text-secondary",
          titleKey: "about.v1t",
          textKey: "about.v1d",
        },
        {
          icon: "verified_user" as const,
          circle: "bg-primary-container",
          icolor: "text-primary-fixed-dim",
          titleKey: "about.v2t",
          textKey: "about.v2d",
        },
        {
          icon: "auto_awesome" as const,
          circle: "bg-surface-container-highest",
          icolor: "text-secondary",
          titleKey: "about.v3t",
          textKey: "about.v3d",
        },
        {
          icon: "bolt" as const,
          circle: "bg-secondary-fixed",
          icolor: "text-on-secondary-fixed-variant",
          titleKey: "about.v4t",
          textKey: "about.v4d",
        },
      ] as const,
    [],
  );

  const path = useMemo(
    () =>
      [
        {
          year: "2020",
          titleKey: "about.path20t",
          descKey: "about.path20d",
          dot: "bg-secondary",
          inner: "bg-white",
        },
        {
          year: "2022",
          titleKey: "about.path22t",
          descKey: "about.path22d",
          dot: "bg-secondary-container",
          inner: "bg-secondary",
        },
        {
          year: "2024",
          titleKey: "about.path24t",
          descKey: "about.path24d",
          dot: "bg-secondary-fixed",
          inner: "bg-on-secondary-fixed-variant",
        },
      ] as const,
    [],
  );

  const team = useMemo(
    () =>
      [
        {
          img: "/images/team/member-1.svg",
          name: "д-р Алмагуль Садыкова",
          roleKey: "about.team.r0" as const,
        },
        {
          img: "/images/team/member-2.svg",
          name: "Данияр Аманов",
          roleKey: "about.team.r1" as const,
        },
        {
          img: "/images/team/member-3.svg",
          name: "Жанар Искакова",
          roleKey: "about.team.r2" as const,
        },
        {
          img: "/images/team/member-4.svg",
          name: "Кайрат Нурмаханов",
          roleKey: "about.team.r3" as const,
        },
      ] as const,
    [],
  );

  return (
    <main className="overflow-x-hidden pt-32">
      <section className="mx-auto mb-unit-xl max-w-container-max px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-gutter lg:grid-cols-2">
          <div className="space-y-unit-lg">
            <span className="rounded-full bg-secondary-container px-4 py-1 font-label-sm text-label-sm text-on-secondary-container">
              {t("about.mission")}
            </span>
            <h1 className="max-w-xl font-display-lg-mobile text-display-lg-mobile text-primary md:font-display-lg md:text-display-lg">
              {t("about.hero.title")}
            </h1>
            <p className="max-w-lg font-body-md text-on-surface-variant md:font-body-lg md:text-body-lg">
              {t("about.hero.sub")}
            </p>
          </div>
          <div className="glass-card ambient-shadow rounded-xl border border-white/40 p-unit-xl">
            <h2 className="mb-unit-md font-headline-md text-headline-md text-secondary">
              {t("about.vision.title")}
            </h2>
            <p className="font-body-lg text-body-lg leading-relaxed text-on-surface italic">
              {t("about.vision.quote")}
            </p>
            <div className="mt-unit-lg flex items-center gap-4">
              <div className="h-1 w-12 rounded-full bg-secondary px-0.5" />
              <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">
                {t("about.vision.footer")}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-surface-container-low py-unit-xl">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="mb-unit-xl text-center">
            <h2 className="font-headline-md text-headline-md text-primary">{t("about.values.title")}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">{t("about.values.sub")}</p>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.titleKey}
                className="glass-card flex flex-col items-center rounded-xl p-unit-lg text-center transition-transform duration-300 hover:translate-y-[-4px]"
              >
                <div
                  className={`mb-unit-md flex h-16 w-16 items-center justify-center rounded-full ${v.circle}`}
                >
                  <span className={`material-symbols-outlined text-4xl ${v.icolor}`}>
                    {v.icon}
                  </span>
                </div>
                <h3 className="mb-2 font-title-lg text-title-lg text-primary">{t(v.titleKey)}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{t(v.textKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-container-max px-margin-mobile py-unit-xl md:px-margin-tablet lg:px-margin-desktop">
        <div className="flex flex-col gap-gutter md:flex-row">
          <div className="md:w-1/3">
            <h2 className="sticky top-24 font-display-lg-mobile text-display-lg-mobile text-primary">
              {t("about.path.title")}
            </h2>
            <p className="mt-4 max-w-xs font-body-md text-on-surface-variant">{t("about.path.sub")}</p>
          </div>
          <div className="relative space-y-unit-xl md:w-2/3">
            <div className="absolute top-0 left-0 ml-[15px] hidden h-full w-px bg-outline-variant/30 md:block" />
            {path.map((item) => (
              <div key={item.year} className="relative pl-12">
                <div
                  className={`absolute top-1.5 left-0 -ml-4 hidden h-8 w-8 items-center justify-center rounded-full ring-8 ring-background md:flex ${item.dot}`}
                >
                  <div className={`h-2 w-2 rounded-full ${item.inner}`} />
                </div>
                <span className="font-label-sm text-label-sm font-bold text-secondary">
                  {item.year}
                </span>
                <h3 className="mb-2 font-title-lg text-title-lg text-primary">{t(item.titleKey)}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-surface py-unit-xl">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="mb-unit-xl flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <h2 className="font-headline-md text-headline-md text-primary">{t("about.team.title")}</h2>
              <p className="font-body-md text-on-surface-variant">{t("about.team.sub")}</p>
            </div>
            <Link
              href="/volunteers#volunteer-form"
              className="flex shrink-0 items-center gap-2 font-label-md text-label-md text-secondary hover:underline"
            >
              {t("about.team.join")}{" "}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="group">
                <div className="relative mb-unit-md aspect-square overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    src={m.img}
                  />
                </div>
                <h4 className="font-title-lg text-title-lg text-primary">{m.name}</h4>
                <p className="font-label-md text-label-md text-secondary">{t(m.roleKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-container-max px-margin-mobile py-unit-xl md:px-margin-tablet lg:px-margin-desktop">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary p-unit-xl text-center text-on-primary">
          <div className="absolute top-0 right-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-32 -ml-32 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
          <h2 className="relative z-10 mb-unit-md font-headline-md text-headline-md">
            {t("about.final.title")}
          </h2>
          <p className="relative z-10 mx-auto mb-unit-lg max-w-2xl font-body-lg text-body-lg text-on-primary-container">
            {t("about.final.sub")}
          </p>
          <AboutCtaActions />
        </div>
      </section>
    </main>
  );
}
