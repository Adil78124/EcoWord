"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { SolutionsCtaActions } from "@/components/solutions/SolutionsCtaActions";
import { SupportFab } from "@/components/solutions/SupportFab";
import { TestimonialsCarousel } from "@/components/solutions/TestimonialsCarousel";

export default function SolutionsPage() {
  const { t } = useI18n();

  const steps = useMemo(
    () =>
      [
        { n: "1", titleKey: "sol.step1t", descKey: "sol.step1d" },
        { n: "2", titleKey: "sol.step2t", descKey: "sol.step2d" },
        { n: "3", titleKey: "sol.step3t", descKey: "sol.step3d" },
        { n: "4", titleKey: "sol.step4t", descKey: "sol.step4d" },
      ] as const,
    [],
  );

  return (
    <>
      <main className="overflow-x-hidden pb-20 pt-32">
        <section className="mb-unit-xl px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="mx-auto max-w-container-max text-center">
            <span className="mb-6 inline-block rounded-full px-4 py-1.5 font-label-md text-label-md text-secondary soft-mint-bg">
              {t("sol.badge")}
            </span>
            <h1 className="mx-auto mb-6 max-w-3xl font-display-lg-mobile text-display-lg-mobile leading-tight text-primary md:font-display-lg md:text-display-lg">
              {t("sol.title")}
            </h1>
            <p className="mx-auto mb-unit-lg max-w-2xl font-body-md text-on-surface-variant md:font-body-lg md:text-body-lg">
              {t("sol.intro")}
            </p>
          </div>
        </section>
        <section className="mb-unit-xl px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter md:grid-cols-12">
            <div className="glass-card ambient-shadow relative flex min-h-[400px] flex-col justify-between overflow-hidden rounded-3xl p-unit-lg md:col-span-8">
              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-4">
                  <span className="material-symbols-outlined text-4xl text-secondary">recycling</span>
                  <h2 className="font-headline-md text-headline-md text-primary">{t("sol.recycle.title")}</h2>
                </div>
                <p className="max-w-md font-body-md text-body-md text-on-surface-variant">
                  {t("sol.recycle.text")}
                </p>
              </div>
              <div className="mt-8 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex w-32 flex-shrink-0 flex-col items-center rounded-2xl border border-outline-variant/30 bg-white p-4">
                  <span className="material-symbols-outlined text-secondary-fixed-dim">glass</span>
                  <span className="mt-2 font-label-sm text-label-sm">{t("sol.mat.glass")}</span>
                </div>
                <div className="flex w-32 flex-shrink-0 flex-col items-center rounded-2xl border border-outline-variant/30 bg-white p-4">
                  <span className="material-symbols-outlined text-secondary-fixed-dim">inventory_2</span>
                  <span className="mt-2 font-label-sm text-label-sm">{t("sol.mat.paper")}</span>
                </div>
                <div className="flex w-32 flex-shrink-0 flex-col items-center rounded-2xl border border-outline-variant/30 bg-white p-4">
                  <span className="material-symbols-outlined text-secondary-fixed-dim">restaurant</span>
                  <span className="mt-2 font-label-sm text-label-sm">{t("sol.mat.organic")}</span>
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="pointer-events-none absolute right-[-10%] bottom-[-5%] max-w-[min(50%,280px)] opacity-20 md:max-w-none md:w-1/2"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUKwoemnHeG3tDZah5unY1JuAvdpNOg6AR6kMLwwZ3bSztRhbSaxfjbDAxnJYaWAqbgaLXxs65FsugyNW9Z36ay4jS5N7cgYLcjqvVJjG97kRkuv_yoquufPWq3ILwXAVMQpY7S1GEiM3OPZr9YJBh-OgxLma395rku8gB2QatvIb9p3ik_iwirfFjhDw9Tt-r6yOdPoQgpzKe48ne_EBCldCgZQQLV62uK5K3vHvpGoqHKDQqWaUmydo2rGiPAxyXEVCsCWhhwtKK"
              />
            </div>
            <div className="nature-gradient-emerald ambient-shadow flex flex-col justify-between rounded-3xl p-unit-lg text-on-primary md:col-span-4">
              <div>
                <span className="material-symbols-outlined mb-6 text-5xl">park</span>
                <h2 className="mb-4 font-headline-md text-headline-md">{t("sol.trees.title")}</h2>
                <p className="font-body-md text-body-md opacity-90">{t("sol.trees.text")}</p>
              </div>
              <div className="mt-8">
                <div className="mb-1 text-3xl font-bold">1,2M+</div>
                <div className="text-sm font-medium opacity-80">{t("sol.trees.stat")}</div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-3/4 rounded-full bg-white" />
                </div>
              </div>
            </div>
            <div className="glass-card ambient-shadow rounded-3xl border border-secondary/10 p-unit-lg md:col-span-4">
              <span className="material-symbols-outlined mb-6 text-5xl text-secondary">solar_power</span>
              <h2 className="mb-4 font-headline-md text-headline-md text-primary">{t("sol.energy.title")}</h2>
              <p className="mb-6 font-body-md text-body-md text-on-surface-variant">{t("sol.energy.text")}</p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-secondary-container/20 px-3 py-1 font-label-sm text-label-sm text-on-secondary-container">
                  {t("sol.tag.wind")}
                </span>
                <span className="rounded-full bg-secondary-container/20 px-3 py-1 font-label-sm text-label-sm text-on-secondary-container">
                  {t("sol.tag.solar")}
                </span>
              </div>
            </div>
            <div className="glass-card ambient-shadow flex flex-col gap-8 rounded-3xl p-unit-lg md:col-span-8 md:flex-row md:items-center">
              <div className="flex-1">
                <span className="material-symbols-outlined mb-6 text-5xl text-secondary">school</span>
                <h2 className="mb-4 font-headline-md text-headline-md text-primary">{t("sol.edu.title")}</h2>
                <p className="mb-6 font-body-md text-body-md text-on-surface-variant">{t("sol.edu.text")}</p>
                <Link
                  href="/help"
                  className="flex items-center gap-2 font-bold text-secondary hover:underline"
                >
                  {t("sol.edu.link")}{" "}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
              <div className="h-48 w-full flex-1 overflow-hidden rounded-2xl md:h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO1BZYw4gbxZUFg4X9T7nokK7iVVSHOOM7Xkk4MMgqhO3Aqfs7Yt6f_wnT27OUBcke_PksBTVt0EGdd8AsrcNNR12IY1euR28h_QPd8yRZvQHx1gCfQ8hfxNLV4Ix8bbdH0xpugut_jEKbQ-tVbk91IxIlE0OON5diDjgzXCf_jB0H42Y2DkCGazOu3ic9cxpMGALHm7aEwsolQUVAsY1RIwxSmzvIUcTh5-RnfaegiyHPOTCRivrPTfmNR0iShW65e5XqL_B-jFeO"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="mb-unit-xl py-20 soft-mint-bg px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="mx-auto max-w-container-max">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-headline-md text-headline-md text-primary">{t("sol.help.title")}</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">{t("sol.help.sub")}</p>
            </div>
            <div className="relative grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
              <div className="absolute top-12 left-0 -z-10 hidden h-0.5 w-full bg-secondary/10 lg:block" />
              {steps.map((step, i) => (
                <div key={step.n} className="flex flex-col items-center text-center">
                  <div
                    className={`mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-secondary/20 bg-white text-2xl font-bold text-secondary ${i === 0 ? "relative" : ""}`}
                  >
                    {step.n}
                  </div>
                  <h3 className="mb-2 font-title-lg text-title-lg text-primary">{t(step.titleKey)}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{t(step.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <TestimonialsCarousel />
        <section className="mb-unit-xl px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="nature-gradient-emerald ambient-shadow relative mx-auto max-w-container-max overflow-hidden rounded-[40px] p-12 text-center text-on-primary md:p-20">
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="mb-6 font-display-lg text-display-lg-mobile md:text-display-lg">
                {t("sol.cta.title")}
              </h2>
              <p className="mb-unit-lg font-body-lg text-body-lg opacity-90">{t("sol.cta.sub")}</p>
              <SolutionsCtaActions />
            </div>
            <div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-white/10 blur-3xl" />
          </div>
        </section>
      </main>
      <SupportFab />
    </>
  );
}
