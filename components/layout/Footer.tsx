"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";
import { navItems } from "@/lib/routes";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-surface-container-low bg-background">
      <div className="mx-auto grid w-full max-w-container-max grid-cols-1 gap-8 px-margin-mobile py-unit-lg sm:grid-cols-2 md:grid-cols-4 md:gap-gutter md:px-margin-tablet md:py-unit-xl lg:px-margin-desktop">
        <div className="sm:col-span-2 md:col-span-1">
          <span className="mb-4 block font-headline-md-mobile text-headline-md-mobile text-primary md:font-headline-md md:text-headline-md">
            EcoWorld
          </span>
          <p className="mb-6 font-body-md text-body-md text-on-surface-variant">
            {t("footer.tagline")}
          </p>
          <p className="font-label-md text-label-md text-on-surface-variant md:font-body-md">
            {t("footer.copy")}
          </p>
        </div>
        <div>
          <h5 className="mb-4 font-title-lg text-title-lg text-primary">
            {t("footer.company")}
          </h5>
          <ul className="space-y-3">
            <li>
              <Link
                href="/about"
                className="font-body-md text-body-md text-slate-700 transition-colors hover:text-emerald-800 hover:underline"
              >
                {t("footer.about")}
              </Link>
            </li>
            <li>
              <Link
                href="/documents"
                className="font-body-md text-body-md text-slate-700 transition-colors hover:text-emerald-800 hover:underline"
              >
                {t("footer.reports")}
              </Link>
            </li>
            <li>
              <Link
                href="/help"
                className="font-body-md text-body-md text-slate-700 transition-colors hover:text-emerald-800 hover:underline"
              >
                {t("footer.contacts")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="mb-4 font-title-lg text-title-lg text-primary">
            {t("footer.directions")}
          </h5>
          <ul className="space-y-3">
            {navItems.map((i) => (
              <li key={i.href}>
                <Link
                  href={i.href}
                  className="font-body-md text-body-md text-slate-700 transition-colors hover:text-emerald-800 hover:underline"
                >
                  {t(i.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="mb-4 font-title-lg text-title-lg text-primary">
            {t("footer.docs")}
          </h5>
          <ul className="space-y-3">
            <li>
              <Link
                href="/documents"
                className="font-body-md text-body-md text-slate-700 transition-colors hover:text-emerald-800 hover:underline"
              >
                {t("footer.documentsIndex")}
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="font-body-md text-body-md text-slate-700 transition-colors hover:text-emerald-800 hover:underline"
              >
                {t("footer.privacy")}
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="font-body-md text-body-md text-slate-700 transition-colors hover:text-emerald-800 hover:underline"
              >
                {t("footer.terms")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
