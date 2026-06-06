"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";
import { ContactHelpForm } from "@/components/forms/ContactHelpForm";
import { DonationTypePicker } from "@/components/help/DonationTypePicker";

export default function HelpPage() {
  const { t } = useI18n();

  return (
    <main className="overflow-x-hidden pb-unit-xl pt-32">
      <section className="mx-auto mb-unit-xl max-w-container-max px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
        <div className="mx-auto mb-16 max-w-3xl px-0 text-center">
          <h1 className="mb-6 font-display-lg-mobile text-display-lg-mobile text-primary md:font-display-lg md:text-display-lg">
            {t("help.title")}
          </h1>
          <p className="font-body-md text-on-surface-variant md:font-body-lg md:text-body-lg">
            {t("help.intro")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
          <div className="glass-card flex flex-col gap-gutter rounded-xl p-unit-lg md:col-span-8 md:flex-row">
            <div className="md:w-1/2">
              <div className="mb-4 flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined">volunteer_activism</span>
                <span className="font-label-md text-label-md uppercase tracking-wider">
                  {t("help.donationsBadge")}
                </span>
              </div>
              <h2 className="mb-4 font-headline-md text-headline-md text-primary">
                {t("help.donationsTitle")}
              </h2>
              <p className="mb-8 text-on-surface-variant">{t("help.donationsText")}</p>
              <DonationTypePicker />
            </div>
            <div className="relative min-h-[300px] overflow-hidden rounded-lg md:w-1/2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRPn4mSmxtTXMmagE6GceM09GmmkT7QEgae1SyRFu2hhVOPfp4ULuoeGAPVwjVDFFuOA0m2juwJkUGlhK-Gzf4CcwtIEzgfgnzYIFo_pIJC9KF0GSbYcQHX-78zAD6duDsL2IAumuvctkdHXm2htQVa3M9tI9hglki5xGTK8ZPZlufFuYNJPEooEyK472rA43S1DX0wIuEEMkb_8Yr63KY9Un0Fzz0byJgAj96mkeeBAwNGQwiGduvU4rKzwNjmBCaVaRtb7kzwcrz"
              />
            </div>
          </div>
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-primary p-unit-lg text-white md:col-span-4">
            <div className="relative z-10">
              <span className="material-symbols-outlined mb-4 text-4xl text-secondary-container">
                groups
              </span>
              <h3 className="mb-2 font-headline-md text-headline-md">{t("help.volunteerTitle")}</h3>
              <p className="mb-6 text-on-primary-container/80">{t("help.volunteerText")}</p>
            </div>
            <Link
              href="/volunteers#volunteer-form"
              className="relative z-10 flex items-center gap-2 font-label-md text-label-md text-white underline-offset-4 transition-all hover:gap-4 hover:underline"
            >
              {t("help.volunteerCta")}{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <div className="absolute -bottom-10 -right-10 opacity-10 transition-transform duration-500 group-hover:scale-110">
              <span className="material-symbols-outlined text-[120px]">eco</span>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-container-max px-margin-mobile py-unit-xl md:px-margin-tablet lg:px-margin-desktop">
        <div className="flex flex-col gap-gutter lg:flex-row">
          <div className="lg:w-1/3">
            <h2 className="mb-4 font-headline-md text-headline-md text-primary">{t("help.faqTitle")}</h2>
            <p className="mb-8 text-on-surface-variant">{t("help.faqIntro")}</p>
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-6">
              <span className="material-symbols-outlined mb-2 text-secondary">support_agent</span>
              <p className="mb-2 font-label-md text-label-md text-primary">{t("help.consultTitle")}</p>
              <p className="mb-4 text-body-md text-on-surface-variant">{t("help.consultText")}</p>
              <a
                className="font-bold text-secondary hover:underline"
                href="mailto:support@ecoworld.kz"
              >
                support@ecoworld.kz
              </a>
            </div>
          </div>
          <div className="space-y-4 lg:w-2/3">
            <details
              className="group glass-card overflow-hidden rounded-xl border border-outline-variant/20"
              open
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 md:p-6">
                <span className="min-w-0 font-title-lg text-title-lg text-primary">
                  {t("help.faq1q")}
                </span>
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="border-t border-white/40 p-4 pt-0 text-on-surface-variant md:p-6 md:pt-0">
                {t("help.faq1a")}
              </div>
            </details>
            <details className="group glass-card overflow-hidden rounded-xl border border-outline-variant/20">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 md:p-6">
                <span className="min-w-0 font-title-lg text-title-lg text-primary">
                  {t("help.faq2q")}
                </span>
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="border-t border-white/40 p-4 pt-0 text-on-surface-variant md:p-6 md:pt-0">
                {t("help.faq2a")}
              </div>
            </details>
            <details className="group glass-card overflow-hidden rounded-xl border border-outline-variant/20">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 md:p-6">
                <span className="min-w-0 font-title-lg text-title-lg text-primary">
                  {t("help.faq3q")}
                </span>
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="border-t border-white/40 p-4 pt-0 text-on-surface-variant md:p-6 md:pt-0">
                {t("help.faq3a")}
              </div>
            </details>
          </div>
        </div>
      </section>
      <section
        id="contact-form"
        className="mx-auto max-w-container-max scroll-mt-28 px-margin-mobile py-unit-xl md:px-margin-tablet lg:px-margin-desktop"
      >
        <div className="glass-card flex flex-col overflow-hidden rounded-2xl border border-white/50 shadow-2xl shadow-primary/5 md:flex-row">
          <div className="bg-primary p-unit-lg text-white md:w-2/5">
            <h2 className="mb-8 font-headline-md text-headline-md">{t("help.contactBlockTitle")}</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary-container">location_on</span>
                <div>
                  <p className="mb-1 font-label-md text-label-md opacity-70">{t("help.addressLabel")}</p>
                  <p>пр. Абая 150, Алматы, Казахстан</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary-container">call</span>
                <div>
                  <p className="mb-1 font-label-md text-label-md opacity-70">{t("help.phoneLabel")}</p>
                  <p>+7 (727) 344 00 22</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary-container">mail</span>
                <div>
                  <p className="mb-1 font-label-md text-label-md opacity-70">{t("help.emailLabel")}</p>
                  <p>hello@ecoworld.kz</p>
                </div>
              </div>
            </div>
            <div className="mt-20 flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-white/10"
              >
                {t("help.socialInst")}
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-white/10"
              >
                {t("help.socialFb")}
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-white/10"
              >
                {t("help.socialIn")}
              </a>
            </div>
          </div>
          <div className="bg-white/80 p-unit-lg md:w-3/5">
            <ContactHelpForm />
          </div>
        </div>
      </section>
    </main>
  );
}
