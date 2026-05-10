"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCBMdMc8mRBPE0Mxk0Inz7AAh57fWV8OVzi_eE9Y-3ctAZiLeMgab-T97nQgZpcsotItjOCRckrCmlbhBGbUVOAVVtGSmObNYNyArKTCyz7KLSLWGkTDuHMwUph4UMXwFhJ9WGLNdngg_UhrPv39H1HIb1NziYCn9-sJvh_8Rj9NvvW_4uSVWGtKTHQgMduSO9TW406tO6sfRikzN0Mlf-5QRoTGLW3e0vgT3PD60IlPhCIeACdjsiHUnqLMENV3lG5ic7EPAYx17oN";

export function HeroSection() {
  const { t } = useI18n();
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background pt-24 md:min-h-[600px] md:pt-20 lg:min-h-[800px] lg:pt-24">
      <div className="absolute inset-0 z-0 md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="h-full w-full object-cover"
          src={HERO_IMG}
        />
        <div className="hero-gradient absolute inset-0" />
      </div>
      <div className="absolute inset-0 z-0 hidden md:flex md:justify-end">
        <div className="relative h-full w-full md:h-2/3 lg:h-full lg:w-3/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="h-full w-full object-cover"
            src={HERO_IMG}
          />
          <div className="hero-gradient absolute inset-0" />
        </div>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-container-max px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
        <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
          <h1 className="mb-6 font-display-lg text-display-lg-mobile leading-tight text-primary md:mb-4 md:font-display-lg md:text-display-lg-mobile lg:mb-6 lg:text-display-lg">
            {t("home.hero.title")}
          </h1>
          <p className="mb-8 font-body-md text-on-surface-variant md:mb-10 md:font-body-lg md:text-body-lg lg:text-body-lg">
            {t("home.hero.sub")}
          </p>
          <div className="flex max-w-full flex-col gap-4 md:flex-row md:justify-start">
            <Link
              href="/volunteers#volunteer-form"
              className="order-1 inline-flex w-full min-w-0 items-center justify-center rounded-full px-8 py-3.5 font-title-lg text-title-lg text-on-primary shadow-lg transition-all duration-300 max-md:bg-[linear-gradient(135deg,#14532d_0%,#006e2d_100%)] max-md:active:scale-95 md:order-2 md:w-auto md:border md:border-secondary/20 md:bg-[rgba(255,255,255,0.7)] md:py-4 md:text-secondary md:shadow-none md:backdrop-blur-xl md:hover:bg-secondary/10"
            >
              {t("home.hero.volunteer")}
            </Link>
            <Link
              href="/help"
              className="order-2 inline-flex w-full min-w-0 items-center justify-center rounded-full border border-secondary/20 px-8 py-3.5 font-title-lg text-title-lg text-secondary transition-all duration-300 max-md:bg-[rgba(255,255,255,0.7)] max-md:backdrop-blur-xl max-md:active:scale-95 md:order-1 md:w-auto md:border-transparent md:bg-[linear-gradient(135deg,#14532d_0%,#006e2d_100%)] md:py-4 md:text-on-primary md:shadow-lg md:hover:-translate-y-1 md:hover:shadow-xl"
            >
              {t("home.hero.help")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
