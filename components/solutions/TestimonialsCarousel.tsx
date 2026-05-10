"use client";

import { useCallback, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";

const IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCVpDuH0nVhGOvEH5ISAQMO26Z1Xuhh-dZ-jNROmG4iley134gFr7lQqj7vsmAcK1F7TVpOLgQHust9ARIjyETVK9iEqu211Q27pVCrZDgRDHBAl2hTM5KP_4UxsxBtvqRl42gHt2pu-v1QxpjcL6V0iSSgiQCt4Hj_37XmoKoo2FtVjw8yma7VSHWYuMOQxvpACpEB7IXGMk-yWNwkSKbj7GtWA7q9v7H6Jx8RjiM6YJJn1i5L7zs6ZyHGLiySsHeold5s7COtxCtI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAjd75XTLLhcSGoubSKgBz5Qa9-Ro4Mcxzu_ctskZVBnfbAmtX7uC43vt9a4tfRWuoCXUehvPXQuaLEETZwMyLfpNDssua-LFgWkrnMTCgmhUyNtS5jAv5tfJ_7HfNI6GvdgJceQvtjeN70TpquWCPy0OfWBTHlrvzH6E1eGJYBI-M_eNPPUf-YGk9ZuqKzRDR4PMnuN3KXP0RvmZLixY8HrKlO6Ark7IMUyUI0eYXs3GiDgpeWK79deeJeQ8FFoBmu48NXzqDblE9j",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDgpM422JvYeZrAuCHQWkxkr2fPEhqShtk45ZrSG59kW9oNgXnr8pHFmx4sQUUhJF9Ek1cmlBQh_cFoAwAzbBUGryBSe8Pju9k1xxY8jv1dMmUd5EEHITHJNgeOqdz4CLMpa4B9SSgIpYAOXUL3khadFCY-vmGd05AzTRfL0qAov-T1Yr4JFkYCr2RVPLXVVShNxykoD4Xk4RxGtLL_Awy7re6XfUyi0uxyPTzmGv8dhjd4tXZQVkRv5tfRMcjsVJ5e6nBUFfQszWlK",
] as const;

export function TestimonialsCarousel() {
  const { t } = useI18n();
  const n = IMAGES.length;
  const [start, setStart] = useState(0);

  const cards = useMemo(
    () =>
      [0, 1, 2].map((offset) => {
        const i = (start + offset) % n;
        const prefix = `sol.tc${i}` as const;
        return {
          img: IMAGES[i],
          tag: t(`${prefix}.tag`),
          quote: t(`${prefix}.quote`),
          name: t(`${prefix}.name`),
          role: t(`${prefix}.role`),
        };
      }),
    [start, n, t],
  );

  const prev = useCallback(() => {
    setStart((i) => (i - 1 + n) % n);
  }, [n]);

  const next = useCallback(() => {
    setStart((i) => (i + 1) % n);
  }, [n]);

  return (
    <section className="mb-unit-xl px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
      <div className="mx-auto max-w-container-max">
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="max-w-xl">
            <h2 className="mb-4 font-headline-md text-headline-md text-primary">
              {t("sol.tc.title")}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {t("sol.tc.sub")}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              aria-label={t("sol.tc.prevAria")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-outline transition-all hover:bg-secondary hover:text-white"
              onClick={prev}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              type="button"
              aria-label={t("sol.tc.nextAria")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-outline transition-all hover:bg-secondary hover:text-white"
              onClick={next}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-3">
          {cards.map((c, idx) => (
            <div
              key={`${start}-${idx}`}
              className="glass-card ambient-shadow overflow-hidden rounded-3xl border border-white/40"
            >
              <div className="relative h-64 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="h-full w-full object-cover" src={c.img} />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-secondary backdrop-blur-md">
                  {c.tag}
                </div>
              </div>
              <div className="p-unit-lg">
                <p className="mb-4 font-body-md text-body-md italic text-on-surface">
                  {c.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary-container" />
                  <div>
                    <div className="text-sm font-bold">{c.name}</div>
                    <div className="text-xs text-on-surface-variant">{c.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
