"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { ProblemSlug } from "@/lib/problems-detail";

const cards: {
  col: string;
  src: string;
  titleKey: "home.p.c1t" | "home.p.c2t" | "home.p.c3t" | "home.p.c4t" | "home.p.c5t";
  descKey: "home.p.c1d" | "home.p.c2d" | "home.p.c3d" | "home.p.c4d" | "home.p.c5d";
  href: `/problems/${ProblemSlug}`;
}[] = [
  {
    col: "md:col-span-3",
    href: "/problems/air-pollution",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8FWNqm5PTnvTdJqHV2JlKqu1koEugMt8Sv5RJIXeu0i6nUfebXJ0n-wFNObciafTk0rqoNLXMYnKPWsGq9qG2b1dTcem2masIyaH8y9FhFpyR287GAkwE0QE5HkRoYZVKbktC9u3YPXtJGRd1aaOf0mExYe6oyQVC6-jtXM5PI-ye7d3pzW0OjPFlZ8xiB59JfwUD__ZxfC-tMcXnH1lp_wbnDLri94En639nvxeefW6cbiHYHP6q8s2loB8KKmameXp0S5LLw8hc",
    titleKey: "home.p.c1t",
    descKey: "home.p.c1d",
  },
  {
    col: "md:col-span-3",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDAA3otz2daQmp0C_UUR2jehVbhSGh67s4qvrQyXs7n_ak5LQd08Ukr0qrcXXuYzh92tqzwnc9IAm8BZmMMSti_AKFOFmPm82kXs746QFHwjEhaFlI5ucwNDEnuPw1JZmkBX1UCaxmyVUAMsT_k71z6gV2QPVjqQAAQKt7FZHffoEKmHenndqYBx4Xubv6vZdrD9PAuOge-LFgQanDxYJcpHkQEGXgRo5ZrV8tU9gMl53F0d7sIql8n9O5Cwp7MWVRA6OC5X-RLO_O",
    titleKey: "home.p.c2t",
    descKey: "home.p.c2d",
    href: "/problems/waste",
  },
  {
    col: "md:col-span-2",
    href: "/problems/deforestation",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-SWSqdBSxBMvQgB1Qp19eFePUzPcsi17uz7x-9z1Zu6DF7KSMoK7DbOP9N5SI7w8N2QG2pLdYHOeUDtFkvjK2xvEl_AQHm2ywUij8XipLrVt7cRRXTvwItuoEr2r-jSsu4TbR0TQZg0cLBhSSxEmrLZnhU9mvwXQo3x5Kj-5YsDtpZ4Kb24fN3amqkeP6Fxqfu61qz4UMt-BWnzHjEDtW3tkVoAUqk6mDXOCI3CZspClpYMecXfu_agFD5WLxawrHjD6MosinqIsm",
    titleKey: "home.p.c3t",
    descKey: "home.p.c3d",
  },
  {
    col: "md:col-span-2",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCa6Lmg9zgznULneFA1gJpAj0UwiaTBxkC65iuqsNCAhvk-pRFw_G2ubM-D0S4WAWebnwCsAjsZmvLEe4u9h0Bbcz1SZAuQ5xLmPsFWxep1jFq_1JgpzHOKU2gP8iey8emg7joN8JLfHRpeVyzeWHIhJ9GWqeedc9dGBSLJeOsM0QozMUTVQ5yrWEXwg1LhungDwth3_6-HO0hv7oI4kOS9l1RPiYhtGgXF4qYm-lzimdUWS3jm57z2XAAUC6e0m9MHPek9kmJPjY_b",
    titleKey: "home.p.c4t",
    descKey: "home.p.c4d",
    href: "/problems/water-pollution",
  },
  {
    col: "md:col-span-2",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVodXmJ3FWhA0ZjcpwjOv-pVWMB0w59SsRG51V3Sr0tuxmIkOIGD2M-DdPo7ZbO6UoCpJuK4tqrgTr-e9NE5Eafz0tCb8b3Sh-EXRfpREEZ365Bxw6mgDQ6FhhS3vQRptPidIDSWc38T6AO1Y-DzBnEYcwubSIbAnOK78YMxUEwvD16oMRYqyiE0SYYkGowSeVyKSA6wi5at8FTsgks3OggdxB8BlO8rChg6R6Gxc14zkRVzzEVdap_ENf_UC-mdAZm3FWYuRlU3VH",
    titleKey: "home.p.c5t",
    descKey: "home.p.c5d",
    href: "/problems/steppe-fires",
  },
];

export function ProblemsSection() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-container-max px-margin-mobile py-unit-xl md:px-margin-tablet lg:px-margin-desktop">
      <div className="mb-unit-lg text-left md:text-center">
        <h2 className="mb-4 font-headline-md-mobile text-headline-md-mobile text-primary md:font-headline-md md:text-headline-md">
          {t("home.problems.title")}
        </h2>
        <p className="max-w-xl text-on-surface-variant md:mx-auto">
          {t("home.problems.sub")}
        </p>
      </div>
      <div className="flex flex-col gap-4 md:grid md:auto-rows-[280px] md:grid-cols-6 md:gap-gutter">
        {cards.map((c) => (
          <Link
            key={c.titleKey}
            href={c.href}
            className={`group relative block h-[240px] cursor-pointer overflow-hidden rounded-2xl glass transition-shadow hover:shadow-lg md:h-auto ${c.col}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={c.src}
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/80 to-transparent p-6 md:p-8">
              <h4 className="font-title-lg text-title-lg text-white md:mb-2">
                {t(c.titleKey)}
              </h4>
              <p className="hidden translate-y-4 font-body-md text-body-md text-white/80 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:block">
                {t(c.descKey)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
