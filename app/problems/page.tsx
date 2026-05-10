"use client";

import { useI18n } from "@/components/i18n/I18nProvider";
import { HotspotsMapPanel } from "@/components/problems/HotspotsMapPanel";

export default function ProblemsPage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto max-w-container-max min-w-0 overflow-x-hidden px-margin-mobile pb-unit-xl pt-28 md:px-margin-tablet md:pt-32 lg:px-margin-desktop">
      <header className="mb-unit-xl max-w-3xl text-center md:text-left">
        <h1 className="mb-unit-sm font-display-lg-mobile text-display-lg-mobile text-primary md:font-display-lg md:text-display-lg">
          {t("prob.title")}
        </h1>
        <p className="font-body-md leading-relaxed text-on-surface-variant md:font-body-lg md:text-body-lg">
          {t("prob.intro")}
        </p>
      </header>
      <div className="mb-unit-xl grid grid-cols-1 gap-gutter md:grid-cols-12">
        <div className="glass-card group ambient-shadow flex flex-col overflow-hidden rounded-xl md:col-span-8 md:flex-row">
          <div className="h-64 overflow-hidden md:h-auto md:w-1/2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqneujYFpGpOJhSBr1-t6Xxjpz5RnkSQcatpkXfYr3G4q9SdnO_pKpy8bzgM8NpLuA3L4T3d7RlKSFfCT-xsGy0zRlUxL2VEWnAiIk14VmE3XsVBrVD4QSsuvVlIKUkQaggC5jeGu1XAr7eTXaJO6_vF2gNEv7QOLQc_UV1zjYOQmXLCm7dNdc6jDPpYLfpkl7Smwu8v3IQW8f0ZO-0Fklvj4IpYnqNOp6t8JAlBrWgjB9PMwkpS1j6F42i8S3y42LeD2N5qNFLz2R"
            />
          </div>
          <div className="flex flex-col justify-between p-unit-lg md:w-1/2">
            <div>
              <div className="mb-unit-sm flex items-center justify-between">
                <span className="rounded-full bg-error-container px-3 py-1 font-label-sm text-label-sm text-on-error-container">
                  {t("prob.badge.critical")}
                </span>
                <span className="material-symbols-outlined text-secondary">air</span>
              </div>
              <h2 className="mb-2 font-headline-md text-headline-md text-primary">
                {t("prob.air.title")}
              </h2>
              <p className="mb-4 text-on-surface-variant">{t("prob.air.text")}</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-label-sm text-on-surface-variant">
                <span>{t("prob.severity")}</span>
                <span>88%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                <div className="nature-gradient-emerald h-full w-[88%]" />
              </div>
            </div>
          </div>
        </div>
        <div className="glass-card group ambient-shadow overflow-hidden rounded-xl md:col-span-4">
          <div className="h-48 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdRiSlluvcckUWgzJP5P7pgXApihukfxj0YTBDlaH1XgIN30BfJyT4HsIfFG5LYpn0HrEqOqrezTmQBHJp5QFD6_AzznrK_xSS8x-PSSQuNv5vGD_PmENXDgK9vl5LM0hCTLnA4lzlFwRn2NEZSq3aEfPI3NKma_qgZ47mv-2afbefHS9U6wolsS5WhtGpQQzC3A1PXE8SP30HAKWBoIbAL0CCspNWkHjFY7lyrODvKNRrkTtkbbOjIUGitBTAm0RgFOcfNEldI_Mf"
            />
          </div>
          <div className="p-unit-md">
            <div className="mb-unit-xs flex items-center justify-between">
              <span className="rounded-full bg-secondary-container px-3 py-1 font-label-sm text-label-sm text-on-secondary-container">
                {t("prob.badge.growing")}
              </span>
              <span className="material-symbols-outlined text-secondary">delete_outline</span>
            </div>
            <h3 className="mb-2 font-title-lg text-title-lg text-primary">{t("prob.waste.title")}</h3>
            <p className="mb-4 font-body-md text-body-md text-on-surface-variant">{t("prob.waste.text")}</p>
            <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-high">
              <div className="nature-gradient-emerald h-full w-[62%]" />
            </div>
          </div>
        </div>
        <div className="glass-card group ambient-shadow overflow-hidden rounded-xl md:col-span-4">
          <div className="h-48 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU0irbWE_hpzmLIJYGWCLYHVyHlV90dW6UOrTYeJPHVTwH81_UdJMi_n7Eb9hbkBjL991BGk0aXf-Lj5ThkqGGSzOy6f_nF1N-hqS9lhYyMLMMRbAMD2MdBWAI6HCFgV0vm2c_qpfLVwsq-UKP6ygrXUO8MxyA1QQb0TLvr6qA-HS-dvaQ9BMohv3yYcHoGzBk2gRfjA3semB-M65RX7Zwe8ZnPpthcN7dOhg0lg0RuAgIGUgmsXKmU8tY1vtJVG-u382Ikbi1YRRS"
            />
          </div>
          <div className="p-unit-md">
            <div className="mb-unit-xs flex items-center justify-between">
              <span className="rounded-full bg-error-container px-3 py-1 font-label-sm text-label-sm text-on-error-container">
                {t("prob.badge.high")}
              </span>
              <span className="material-symbols-outlined text-secondary">water_drop</span>
            </div>
            <h3 className="mb-2 font-title-lg text-title-lg text-primary">{t("prob.water.title")}</h3>
            <p className="mb-4 font-body-md text-body-md text-on-surface-variant">{t("prob.water.text")}</p>
            <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-high">
              <div className="nature-gradient-emerald h-full w-[75%]" />
            </div>
          </div>
        </div>
        <div className="glass-card group ambient-shadow flex flex-col overflow-hidden rounded-xl md:col-span-8 md:flex-row-reverse">
          <div className="h-64 overflow-hidden md:h-auto md:w-1/2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAKGAVQ1h5bB2awny2_1frHCFjvrbKNhJFLOuM3xmkdLfEt1-BtMFbp_GRiswiH1Ze31g0rJaZsB3S4aR3ZeNRtPxxYUC36YmIOK8xc1xreU7OxB0lUhtVBQGE4ox44e_9c9y7DV4A6qo4P9vOSPMAWuJnDLbhW3vzyNKPpZEHrejbIGHsQ_CdcTl_L4D1wuPnLXXKeg5aUMfHxrcTYy9o3HW5t_6RorjTmaZF3op929hUXH9XzpnzqKPx3JIybFqGsJYiX8UI9Jh_"
            />
          </div>
          <div className="flex flex-col justify-between p-unit-lg md:w-1/2">
            <div>
              <div className="mb-unit-sm flex items-center justify-between">
                <span className="rounded-full bg-secondary-container px-3 py-1 font-label-sm text-label-sm text-on-secondary-container">
                  {t("prob.badge.alert")}
                </span>
                <span className="material-symbols-outlined text-secondary">pets</span>
              </div>
              <h2 className="mb-2 font-headline-md text-headline-md text-primary">{t("prob.bio.title")}</h2>
              <p className="mb-4 text-on-surface-variant">{t("prob.bio.text")}</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-label-sm text-on-surface-variant">
                <span>{t("prob.threatLevel")}</span>
                <span>45%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                <div className="nature-gradient-emerald h-full w-[45%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="mb-unit-xl">
        <HotspotsMapPanel />
      </section>
      <section className="grid grid-cols-1 gap-gutter md:grid-cols-3">
        <div className="glass-card ambient-shadow rounded-xl p-unit-lg text-center">
          <span className="material-symbols-outlined mb-unit-sm text-4xl text-secondary">co2</span>
          <div className="mb-1 text-4xl font-extrabold text-primary">280M</div>
          <div className="font-label-md text-on-surface-variant">{t("prob.stat1")}</div>
          <div className="mt-4 flex items-center justify-center gap-1 border-t border-outline-variant/20 pt-4 text-sm font-bold text-error">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            {t("prob.stat1trend")}
          </div>
        </div>
        <div className="glass-card ambient-shadow rounded-xl p-unit-lg text-center">
          <span className="material-symbols-outlined mb-unit-sm text-4xl text-secondary">opacity</span>
          <div className="mb-1 text-4xl font-extrabold text-primary">15,4%</div>
          <div className="font-label-md text-on-surface-variant">{t("prob.stat2")}</div>
          <div className="mt-4 flex items-center justify-center gap-1 border-t border-outline-variant/20 pt-4 text-sm font-bold text-secondary">
            <span className="material-symbols-outlined text-sm">trending_down</span>
            {t("prob.stat2trend")}
          </div>
        </div>
        <div className="glass-card ambient-shadow rounded-xl p-unit-lg text-center">
          <span className="material-symbols-outlined mb-unit-sm text-4xl text-secondary">forest</span>
          <div className="mb-1 text-4xl font-extrabold text-primary">5,2%</div>
          <div className="font-label-md text-on-surface-variant">{t("prob.stat3")}</div>
          <div className="mt-4 flex items-center justify-center gap-1 border-t border-outline-variant/20 pt-4 text-sm font-bold text-secondary">
            <span className="material-symbols-outlined text-sm">park</span>
            {t("prob.stat3trend")}
          </div>
        </div>
      </section>
    </main>
  );
}
