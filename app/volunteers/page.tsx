"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { VolunteerApplicationForm } from "@/components/forms/VolunteerApplicationForm";
import { VolunteersSection } from "@/components/sections/VolunteersSection";

export default function VolunteersPage() {
  const { t } = useI18n();

  const events = useMemo(
    () =>
      [
        {
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBodaDftZJ0IUpRjC3eNXxkDHKRpHlApodBJVNEpo6tB7neAbzq6IZkEg05L2_TKHP9VeQtiCROMe9Y6iUGW9yGQQdJPcVN1iB1BoYRU1omzb0goaqRxUzTLj3GlbBug5rrMsZva_NnK5AOkYvvx9CcjMn45VKLDZM92JCSz-J73qTtX8Y5UQd2yMC2auWOt9Yd64eu0iU6NmOM5pTbc231ZGd4OWRWTZv0E24X13UVK2b6DDWHWon7otXABa0trYpLsUCK8_V1lPqs",
          dateKey: "vol.ev1.date",
          titleKey: "vol.ev1.title",
          locKey: "vol.ev1.loc",
          icon: "location_on" as const,
        },
        {
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtIfQkzGqlJmLkkZhreA-PCcnuctle9W5T9BPDUKp2DMJe6Q98x_7kUVaSodaR70paFRfP1eRnq2_b9JvJCRRAUN5g7fd4wLbQhaSCnWX5vLek1ZVUv3x2FbxEq3Upz_Lg8IapxO00bE1c1S5d4eV16_erFqq5CCH23102V99bqa5GNXqiJLGHU8yv1TJVumeSzlV5VqQ72xgQJYeDhVvg3nJHXaN7ERac1XKftuXWVj3o-3U72VuLUcwVBH8TUC3bH81UC3gcB9r8",
          dateKey: "vol.ev2.date",
          titleKey: "vol.ev2.title",
          locKey: "vol.ev2.loc",
          icon: "location_on" as const,
        },
        {
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUOaW9tlLOJ_HdFRce3teJWPbkNHU30N-N9o1hU8yUQ1gZm6EjjfZnWWjUAklQqOJS9bARB_76O3fq6ATc2L2gyrbR8PSawaNoxgPL1O2i_CHjRRvTrpFxvo0KyURk-NfqZxmgcXQ0qLKZjtU25bswreuGCd1fCwg-nX6zWYaYUnd2FnCH13kKhSFIR6bjyW-cCgjOErUG5c4mWC78UhkB6lZDpeEeyyZ6_fT-g6d2YPsLPWnPtmvTif9jGbEs6SOlIZoCMpocTJjO",
          dateKey: "vol.ev3.date",
          titleKey: "vol.ev3.title",
          locKey: "vol.ev3.loc",
          icon: "videocam" as const,
        },
        {
          img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&h=560&fit=crop&q=80",
          dateKey: "vol.ev4.date",
          titleKey: "vol.ev4.title",
          locKey: "vol.ev4.loc",
          icon: "location_on" as const,
        },
      ] as const,
    [],
  );

  const stories = useMemo(
    () =>
      [
        {
          quoteKey: "vol.story1.quote",
          initials: "БЖ",
          nameKey: "vol.story1.name",
          roleKey: "vol.story1.role",
          bg: "bg-secondary text-white",
        },
        {
          quoteKey: "vol.story2.quote",
          initials: "АС",
          nameKey: "vol.story2.name",
          roleKey: "vol.story2.role",
          bg: "bg-secondary-container text-on-secondary-container",
        },
        {
          quoteKey: "vol.story3.quote",
          initials: "КМ",
          nameKey: "vol.story3.name",
          roleKey: "vol.story3.role",
          bg: "bg-primary-fixed text-on-primary-fixed",
        },
        {
          quoteKey: "vol.story4.quote",
          initials: "ЕЛ",
          nameKey: "vol.story4.name",
          roleKey: "vol.story4.role",
          bg: "bg-tertiary-fixed text-on-tertiary-fixed",
        },
      ] as const,
    [],
  );

  return (
    <main className="mt-24 space-y-unit-xl overflow-x-hidden pb-unit-xl">
      <section className="mx-auto max-w-container-max px-margin-mobile pt-8 md:px-margin-tablet md:pt-unit-xl lg:px-margin-desktop">
        <div className="relative flex min-h-[280px] items-center overflow-hidden rounded-xl bg-primary-container p-unit-lg md:min-h-[400px] md:p-unit-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-overlay"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-suGbBl1KgGoyfOkFSw9R4uujw0C5GcpX1xc0coWWzHs1Irn_I7MpsDN6tA0aU2ywikH6dLhFUw53BFQrGlX7BkwOlLShT9btRCdsbEOsXimGKZPfQxLRhUXMJDC2UfTJ0VvTkczVwFea7V0eVyLwKgeFBgSdxrkfL77gQezFWHP-a-7y0hQoJd9aAmXlY4j_XLWEC_FUV5yQdO9ZJekltFSET4J76NbNMyJhHRxFeijXuPAROGQQegikoRgwM9mjS3bmlg8EzEk4"
          />
          <div className="relative z-10 max-w-2xl min-w-0">
            <h1 className="mb-unit-md font-display-lg-mobile text-display-lg-mobile text-white md:font-display-lg md:text-display-lg">
              {t("vol.hero.title")}
            </h1>
            <p className="mb-unit-lg font-body-md text-on-primary-container opacity-90 md:font-body-lg">
              {t("vol.hero.sub")}
            </p>
            <div className="flex max-w-full flex-col gap-4 md:flex-row md:gap-unit-md">
              <Link
                href="/volunteers#volunteer-form"
                className="w-full rounded-xl bg-secondary-container px-unit-lg py-unit-md text-center font-title-lg text-title-lg text-on-secondary-container transition-all hover:bg-secondary-fixed active:scale-95 md:w-auto"
              >
                {t("vol.hero.reg")}
              </Link>
              <Link
                href="/about"
                className="glass-panel w-full rounded-xl border border-white/20 px-unit-lg py-unit-md text-center font-title-lg text-title-lg text-white transition-all hover:bg-white/10 md:w-auto"
              >
                {t("vol.hero.more")}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <VolunteersSection />
      <section className="mx-auto max-w-container-max px-margin-mobile py-unit-xl md:px-margin-tablet lg:px-margin-desktop">
        <h2 className="mb-unit-lg font-headline-md text-headline-md text-primary">
          {t("vol.events.title")}
        </h2>
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
          {events.map((ev) => (
            <div
              key={ev.titleKey}
              className="glass-panel group flex flex-col overflow-hidden rounded-2xl border border-white/40 ambient-shadow"
            >
              <div className="relative h-40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={ev.img}
                />
                <div className="absolute top-2 right-2 rounded-lg bg-secondary px-2 py-1 font-label-sm text-label-sm text-white">
                  {t(ev.dateKey)}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-unit-md">
                <h4 className="mb-2 font-title-lg text-title-lg text-on-surface">
                  {t(ev.titleKey)}
                </h4>
                <div className="mb-unit-md flex items-center gap-2 font-body-md text-body-md text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">{ev.icon}</span>
                  {t(ev.locKey)}
                </div>
                <Link
                  href="/volunteers#volunteer-form"
                  className="eco-gradient mt-auto w-full rounded-xl py-2 text-center font-label-md text-label-md text-on-primary transition-all hover:opacity-90"
                >
                  {t("vol.join")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-surface-container-low py-unit-xl">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <h2 className="mb-unit-lg text-center font-headline-md text-headline-md text-primary">
            {t("vol.stories.title")}
          </h2>
          <div className="columns-1 gap-gutter space-y-gutter md:columns-2 lg:columns-3">
            {stories.map((s) => (
              <div
                key={s.nameKey}
                className="glass-panel mb-gutter break-inside-avoid rounded-2xl border border-white/40 p-unit-lg ambient-shadow"
              >
                <p className="mb-unit-md font-body-lg italic text-on-surface">{t(s.quoteKey)}</p>
                <div className="flex items-center gap-unit-md">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${s.bg}`}
                  >
                    {s.initials}
                  </div>
                  <div>
                    <h5 className="font-label-md text-label-md text-primary">{t(s.nameKey)}</h5>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      {t(s.roleKey)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="volunteer-form"
        className="mx-auto max-w-container-max scroll-mt-28 px-margin-mobile py-unit-xl md:px-margin-tablet lg:px-margin-desktop"
      >
        <div className="glass-panel mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/40 ambient-shadow">
          <div className="eco-gradient p-unit-lg text-center">
            <h2 className="font-headline-md text-headline-md text-white">{t("vol.formBanner.title")}</h2>
            <p className="mt-2 font-body-md text-on-primary-container opacity-90">
              {t("vol.formBanner.sub")}
            </p>
          </div>
          <VolunteerApplicationForm />
        </div>
      </section>
    </main>
  );
}
