"use client";

import { useI18n } from "@/components/i18n/I18nProvider";

export function SolutionsSection() {
  const { t } = useI18n();
  return (
    <section className="bg-surface-container-low py-unit-xl">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
        <div className="mb-unit-lg text-left md:text-center">
          <h2 className="mb-4 font-headline-md-mobile text-headline-md-mobile text-primary md:font-headline-md md:text-headline-md">
            {t("home.solutions.title")}
          </h2>
          <p className="max-w-xl text-on-surface-variant md:mx-auto">
            {t("home.solutions.sub")}
          </p>
        </div>
        <div className="relative mt-16 hidden before:absolute before:top-0 before:bottom-0 before:left-0 before:w-0.5 before:-translate-x-1/2 before:bg-primary-fixed lg:block lg:before:left-1/2">
          <div className="relative mb-unit-xl flex items-center justify-between">
            <div className="w-[45%] pr-12 text-right">
              <h4 className="mb-2 font-title-lg text-title-lg text-primary">
                {t("home.solutions.step1t")}
              </h4>
              <p className="text-on-surface-variant">{t("home.solutions.step1d")}</p>
            </div>
            <div className="absolute left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-lg">
              <span className="material-symbols-outlined">volunteer_activism</span>
            </div>
            <div className="w-[45%] pl-12" />
          </div>
          <div className="relative mb-unit-xl flex items-center justify-between">
            <div className="w-[45%] pr-12" />
            <div className="absolute left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-lg">
              <span className="material-symbols-outlined">delete_sweep</span>
            </div>
            <div className="w-[45%] pl-12 text-left">
              <h4 className="mb-2 font-title-lg text-title-lg text-primary">
                {t("home.solutions.step2t")}
              </h4>
              <p className="text-on-surface-variant">{t("home.solutions.step2d")}</p>
            </div>
          </div>
          <div className="relative mb-unit-xl flex items-center justify-between">
            <div className="w-[45%] pr-12 text-right">
              <h4 className="mb-2 font-title-lg text-title-lg text-primary">
                {t("home.solutions.step3t")}
              </h4>
              <p className="text-on-surface-variant">{t("home.solutions.step3d")}</p>
            </div>
            <div className="absolute left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-lg">
              <span className="material-symbols-outlined">potted_plant</span>
            </div>
            <div className="w-[45%] pl-12" />
          </div>
          <div className="relative flex items-center justify-between">
            <div className="w-[45%] pr-12" />
            <div className="absolute left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-lg">
              <span className="material-symbols-outlined">school</span>
            </div>
            <div className="w-[45%] pl-12 text-left">
              <h4 className="mb-2 font-title-lg text-title-lg text-primary">
                {t("home.solutions.step4t")}
              </h4>
              <p className="text-on-surface-variant">{t("home.solutions.step4d")}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:hidden">
          <div className="glass flex flex-col gap-4 rounded-2xl border border-white/40 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-on-secondary">
              <span className="material-symbols-outlined">volunteer_activism</span>
            </div>
            <div>
              <h4 className="mb-2 font-title-lg text-title-lg text-primary">
                {t("home.solutions.m1t")}
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {t("home.solutions.m1d")}
              </p>
            </div>
          </div>
          <div className="glass flex flex-col gap-4 rounded-2xl border border-white/40 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-on-secondary">
              <span className="material-symbols-outlined">delete_sweep</span>
            </div>
            <div>
              <h4 className="mb-2 font-title-lg text-title-lg text-primary">
                {t("home.solutions.m2t")}
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {t("home.solutions.m2d")}
              </p>
            </div>
          </div>
          <div className="glass flex flex-col gap-4 rounded-2xl border border-white/40 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-on-secondary">
              <span className="material-symbols-outlined">potted_plant</span>
            </div>
            <div>
              <h4 className="mb-2 font-title-lg text-title-lg text-primary">
                {t("home.solutions.m3t")}
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {t("home.solutions.m3d")}
              </p>
            </div>
          </div>
          <div className="glass flex flex-col gap-4 rounded-2xl border border-white/40 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-on-secondary">
              <span className="material-symbols-outlined">school</span>
            </div>
            <div>
              <h4 className="mb-2 font-title-lg text-title-lg text-primary">
                {t("home.solutions.step4t")}
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {t("home.solutions.step4d")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
