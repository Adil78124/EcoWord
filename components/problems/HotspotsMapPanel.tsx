"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { HotspotsGoogleMaps } from "@/components/problems/HotspotsGoogleMaps";

type MapMode = "air" | "water";

export function HotspotsMapPanel() {
  const { t } = useI18n();
  const [mode, setMode] = useState<MapMode>("water");

  const title = t("hotspots.title");
  const subtitle = mode === "air" ? t("hotspots.airSub") : t("hotspots.waterSub");

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
      <div className="relative w-full min-w-0 overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-low">
        <HotspotsGoogleMaps mode={mode} label={(key) => t(key)} />
      </div>
    </div>
  );
}
