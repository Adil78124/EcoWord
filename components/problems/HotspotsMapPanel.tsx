"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";

type MapMode = "air" | "water";

export function HotspotsMapPanel() {
  const { t } = useI18n();
  const [mode, setMode] = useState<MapMode>("water");

  const title = t("hotspots.title");
  const subtitle = mode === "air" ? t("hotspots.airSub") : t("hotspots.waterSub");
  const m1 = mode === "air" ? t("hotspots.m1a") : t("hotspots.w1a");
  const m1d = mode === "air" ? t("hotspots.m1ad") : t("hotspots.w1ad");
  const m2 = mode === "air" ? t("hotspots.m2a") : t("hotspots.m2a");
  const m2d = mode === "air" ? t("hotspots.m2ad") : t("hotspots.m2ad");

  const btnInactive =
    "rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-4 py-2 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container-low";
  const btnActive =
    "rounded-lg bg-secondary px-4 py-2 font-label-md text-label-md text-secondary-foreground";

  return (
    <div className="glass-card ambient-shadow rounded-xl p-unit-lg">
      <div className="mb-unit-lg flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary">{title}</h2>
          <p className="text-on-surface-variant">{subtitle}</p>
        </div>
        <div className="flex w-full min-w-0 flex-wrap gap-2">
          <button
            type="button"
            className={mode === "air" ? btnActive : btnInactive}
            onClick={() => setMode("air")}
          >
            {t("hotspots.airTab")}
          </button>
          <button
            type="button"
            className={mode === "water" ? btnActive : btnInactive}
            onClick={() => setMode("water")}
          >
            {t("hotspots.waterTab")}
          </button>
        </div>
      </div>
      <div className="group relative h-[420px] w-full min-w-0 overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-low md:h-[450px]">
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-emerald-100 via-sky-50 to-teal-100"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-70 bg-[radial-gradient(ellipse_80%_60%_at_35%_45%,rgba(20,83,45,0.22)_0%,transparent_55%),radial-gradient(ellipse_70%_50%_at_72%_58%,rgba(0,110,45,0.18)_0%,transparent_50%)]"
          aria-hidden
        />
        <div className="group absolute top-1/4 left-1/3 z-10 cursor-pointer">
          <div className="relative">
            <span className="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-error opacity-40" />
            <span className="relative inline-flex h-6 w-6 rounded-full border-2 border-white bg-error" />
          </div>
          <div className="pointer-events-none absolute top-8 left-0 z-20 w-48 rounded-lg p-3 opacity-0 transition-opacity group-hover:opacity-100 glass-card">
            <p className="relative z-10 font-bold text-primary">{m1}</p>
            <p className="relative z-10 text-xs text-on-surface-variant">{m1d}</p>
          </div>
        </div>
        <div className="group absolute top-1/2 right-1/4 z-10 cursor-pointer">
          <div className="relative">
            <span className="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-secondary opacity-40" />
            <span className="relative inline-flex h-6 w-6 rounded-full border-2 border-white bg-secondary" />
          </div>
          <div className="pointer-events-none absolute top-8 right-0 z-20 w-48 rounded-lg p-3 opacity-0 transition-opacity group-hover:opacity-100 glass-card">
            <p className="relative z-10 font-bold text-primary">{m2}</p>
            <p className="relative z-10 text-xs text-on-surface-variant">{m2d}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
