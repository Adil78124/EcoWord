"use client";

type MapMode = "air" | "water";

/** Встраивание Google Карт через output=embed (без отдельного API-ключа). */
const EMBED = {
  air: [
    { labelKey: "hotspots.m1a" as const, src: "https://www.google.com/maps?q=43.2220,76.8512&z=11&output=embed" },
    { labelKey: "hotspots.m2a" as const, src: "https://www.google.com/maps?q=49.8019,73.1023&z=11&output=embed" },
  ],
  water: [
    { labelKey: "hotspots.w1a" as const, src: "https://www.google.com/maps?q=45.55,61.75&z=8&output=embed" },
    { labelKey: "hotspots.w2a" as const, src: "https://www.google.com/maps?q=49.165,84.345&z=9&output=embed" },
  ],
} as const;

type Props = {
  mode: MapMode;
  label: (key: string) => string;
};

export function HotspotsGoogleMaps({ mode, label }: Props) {
  const pair = EMBED[mode];
  return (
    <div className="grid h-[420px] w-full grid-cols-1 gap-2 md:h-[450px] md:grid-cols-2 md:gap-3">
      {pair.map((slot) => (
        <div
          key={slot.src}
          className="relative min-h-[200px] overflow-hidden rounded-lg border border-outline-variant/30 bg-surface-container-low md:min-h-0"
        >
          <iframe
            title={label(slot.labelKey)}
            className="absolute inset-0 h-full w-full border-0"
            src={slot.src}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/55 to-transparent px-2 py-2 pt-8">
            <p className="text-center font-label-md text-label-md font-semibold text-white drop-shadow-sm">
              {label(slot.labelKey)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
