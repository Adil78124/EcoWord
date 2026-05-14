"use client";

import { useCallback, useRef } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";

const IMAGES = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=900&h=600&fit=crop&q=80",
] as const;

export function TestimonialsCarousel() {
  const { t } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-testimonial-card]");
    const step = first ? first.offsetWidth + 24 : 360;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  return (
    <section className="mb-unit-xl px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
      <div className="mx-auto max-w-container-max">
        <div className="mb-8 flex flex-col items-end justify-between gap-6 md:mb-12 md:flex-row">
          <div className="max-w-xl">
            <h2 className="mb-4 font-headline-md text-headline-md text-primary">
              {t("sol.tc.title")}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {t("sol.tc.sub")}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label={t("sol.tc.prevAria")}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-outline bg-white/90 shadow-sm transition-all hover:bg-emerald-700 hover:text-white"
              onClick={() => scrollBy(-1)}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              type="button"
              aria-label={t("sol.tc.nextAria")}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-outline bg-white/90 shadow-sm transition-all hover:bg-emerald-700 hover:text-white"
              onClick={() => scrollBy(1)}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-gutter overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-color:rgba(5,150,105,0.45)_rgba(236,253,245,0.9)] [scrollbar-width:thin] sm:pb-5 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-600/50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-emerald-50"
        >
          {IMAGES.map((img, i) => {
            const prefix = `sol.tc${i}` as const;
            return (
              <div
                key={i}
                data-testimonial-card
                className="glass-card ambient-shadow w-[min(100%,340px)] shrink-0 snap-center snap-always overflow-hidden rounded-3xl border border-white/40 sm:w-[min(100%,380px)] md:w-[360px]"
              >
                <div className="relative h-64 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="h-full w-full object-cover" src={img} />
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-emerald-900 backdrop-blur-md">
                    {t(`${prefix}.tag`)}
                  </div>
                </div>
                <div className="p-unit-lg">
                  <p className="mb-4 font-body-md text-body-md italic text-on-surface">
                    {t(`${prefix}.quote`)}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-100 ring-2 ring-emerald-200/80" />
                    <div>
                      <div className="text-sm font-bold text-primary">{t(`${prefix}.name`)}</div>
                      <div className="text-xs text-on-surface-variant">{t(`${prefix}.role`)}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
