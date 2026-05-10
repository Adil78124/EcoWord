"use client";

import { useI18n } from "@/components/i18n/I18nProvider";

const stats = [
  { icon: "groups", value: "15,000+", labelKey: "home.stats.volunteers" as const },
  { icon: "task_alt", value: "420", labelKey: "home.stats.solved" as const },
  { icon: "park", value: "85,000", labelKey: "home.stats.trees" as const },
  { icon: "eco", value: "1,200", labelKey: "home.stats.events" as const },
] as const;

export function StatsSection() {
  const { t } = useI18n();
  return (
    <section className="relative z-20 mx-auto -mt-16 max-w-container-max px-margin-mobile py-unit-lg md:px-margin-tablet md:py-unit-lg lg:-mt-20 lg:px-margin-desktop lg:py-unit-xl">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-gutter">
        {stats.map((s) => (
          <div
            key={s.labelKey}
            className="glass flex items-center gap-6 rounded-xl p-6 md:min-h-[160px] md:flex-col md:items-center md:justify-center md:gap-0 md:p-6 md:text-center lg:p-8"
          >
            <span className="material-symbols-outlined shrink-0 text-4xl text-secondary md:mb-3 md:text-3xl lg:mb-4 lg:text-4xl">
              {s.icon}
            </span>
            <div className="min-w-0 text-left md:text-center">
              <h3 className="font-headline-md-mobile text-headline-md-mobile text-primary md:font-display-lg-mobile md:text-display-lg-mobile">
                {s.value}
              </h3>
              <p className="font-label-md text-label-md text-on-surface-variant">
                {t(s.labelKey)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
