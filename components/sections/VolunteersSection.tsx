"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";

export function VolunteersSection() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-container-max px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
        <div className="space-y-gutter lg:col-span-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-headline-md text-headline-md text-primary">
              {t("volsec.heroes")}
            </h2>
            <Link
              href="/volunteers#volunteer-form"
              className="flex shrink-0 items-center gap-1 font-label-md text-label-md text-secondary"
            >
              {t("volsec.allProfiles")}{" "}
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-unit-md md:grid-cols-2 lg:grid-cols-3">
            <div className="glass-panel group rounded-xl border border-white/40 p-unit-md ambient-shadow transition-all hover:translate-y-[-4px]">
              <div className="mb-unit-md flex items-center gap-unit-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  className="h-14 w-14 rounded-full border-2 border-secondary object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW_xjh8C0ZYZ74ML9g8zn9-8-a8pDKC2dIv5ZL1yohIuq72OdwP-8JkkGx598c9jM0rKOI6SvOAC4mRRNbNQJpv7UCrn8YdSCjk92SlpgGVpGsLWhIrdDbhSlkOcN47G9Uc_mZ4xLaKd7qZZg2Mczx9YMuMdNok9G-xXumZCEkldg64zmSGMHRbTqiSVJJXb1vc6q6XvYbxwWxAyGd__1BTKapFLoaH-cOqzNiH7CQupcDht9dBGFZKrEWnAkgc3qMgvn7c1hag24S"
                />
                <div>
                  <h3 className="font-title-lg text-title-lg text-on-surface">
                    {t("volsec.name1")}
                  </h3>
                  <span className="rounded-full bg-secondary/10 px-2 py-0.5 font-label-sm text-label-sm text-secondary">
                    {t("volsec.badge1")}
                  </span>
                </div>
              </div>
              <div className="mb-unit-md flex gap-2">
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  eco
                </span>
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  forest
                </span>
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  water_drop
                </span>
              </div>
              <div className="font-body-md text-body-md text-on-surface-variant">
                {t("volsec.contrib1")}
              </div>
            </div>
            <div className="glass-panel group rounded-xl border border-white/40 p-unit-md ambient-shadow transition-all hover:translate-y-[-4px]">
              <div className="mb-unit-md flex items-center gap-unit-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  className="h-14 w-14 rounded-full border-2 border-secondary/30 object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtjJfOF_sue1oj2XqOCZTeEME4IGZS-PEzefPxSeux0pEwPlI-uEFC3cmx5bgTmQUR39dVpZpo_IyHNa0KtNlLqkRcLr1nn1gA2DO2lbn11nk-LI7zZZX80lQScTqRQA4cuViqQsAi0VLTZIyz8IIpjn--mMOQwMh77AfENthOJXrimL3SM3AhP2aM0-IetgvaPWbKU3RjC-JpHDw7TpgMYJuoQQe1I8M8EZdvkLxfcx8Kv8gdu_tA_u649I6fdEnlgocr2vMcIKAH"
                />
                <div>
                  <h3 className="font-title-lg text-title-lg text-on-surface">
                    {t("volsec.name2")}
                  </h3>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 font-label-sm text-label-sm text-primary">
                    {t("volsec.badge2")}
                  </span>
                </div>
              </div>
              <div className="mb-unit-md flex gap-2">
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  mountain_flag
                </span>
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  groups
                </span>
              </div>
              <div className="font-body-md text-body-md text-on-surface-variant">
                {t("volsec.contrib2")}
              </div>
            </div>
            <div className="glass-panel group rounded-xl border border-white/40 p-unit-md ambient-shadow transition-all hover:translate-y-[-4px]">
              <div className="mb-unit-md flex items-center gap-unit-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  className="h-14 w-14 rounded-full border-2 border-secondary/30 object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgrKnttkDJ-MYoZMuG2SooRnXezY1rFyDiu-lhFyD3CTFwfU9ngTPkAaGCr3WfEJ-dxNyR7Kyqu9qKcbGY9jZ4uhEt-Z8Kmpc9eysKVxwmAiK2QNHQ0g7U-gbZ0VpQc30GsRV-rYn64c2MM0cpAbCmgGlJ3_kc7xXQAuMjCmEx4rIsfBnzNNoqBm6By3Jz9-uW-ksWoaZhA5kPnvxy61KR8gtCQ5wLnG1nwxRsybgdcXLP4a5Zxw7xwcpQwMZ4M3HNHvtvDGJ6vkuw"
                />
                <div>
                  <h3 className="font-title-lg text-title-lg text-on-surface">
                    {t("volsec.name3")}
                  </h3>
                  <span className="rounded-full bg-secondary/10 px-2 py-0.5 font-label-sm text-label-sm text-secondary">
                    {t("volsec.badge3")}
                  </span>
                </div>
              </div>
              <div className="mb-unit-md flex gap-2">
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  volunteer_activism
                </span>
              </div>
              <div className="font-body-md text-body-md text-on-surface-variant">
                {t("volsec.contrib3")}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="glass-panel sticky top-28 rounded-2xl border border-white/40 p-unit-lg ambient-shadow">
            <h3 className="mb-unit-md font-headline-md text-headline-md text-primary">
              {t("volsec.leaderboard")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl p-unit-sm transition-colors hover:bg-secondary/5">
                <div className="flex items-center gap-unit-md">
                  <span className="w-6 text-center font-bold text-secondary text-title-lg">
                    1
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-fixed font-bold text-on-secondary-fixed">
                    МК
                  </div>
                  <span className="font-title-lg text-title-lg">Мурат К.</span>
                </div>
                <span className="font-bold text-primary">2,450 XP</span>
              </div>
              <div className="flex items-center justify-between rounded-xl p-unit-sm transition-colors hover:bg-secondary/5">
                <div className="flex items-center gap-unit-md">
                  <span className="w-6 text-center font-bold text-on-surface-variant text-title-lg">
                    2
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-container font-bold text-on-secondary-container">
                    АС
                  </div>
                  <span className="font-title-lg text-title-lg">Айя С.</span>
                </div>
                <span className="font-bold text-primary">2,120 XP</span>
              </div>
              <div className="flex items-center justify-between rounded-xl p-unit-sm transition-colors hover:bg-secondary/5">
                <div className="flex items-center gap-unit-md">
                  <span className="w-6 text-center font-bold text-on-surface-variant text-title-lg">
                    3
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-fixed font-bold text-on-primary-fixed">
                    ВЛ
                  </div>
                  <span className="font-title-lg text-title-lg">Вадим Л.</span>
                </div>
                <span className="font-bold text-primary">1,980 XP</span>
              </div>
            </div>
            <Link
              href="/volunteers#volunteer-form"
              className="mt-unit-lg block w-full rounded-xl border border-secondary/20 py-unit-sm text-center font-label-md text-label-md text-secondary transition-all hover:bg-secondary/5"
            >
              {t("volsec.fullRating")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
