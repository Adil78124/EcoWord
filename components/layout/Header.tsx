"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n/I18nProvider";
import { navItems } from "@/lib/routes";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navHiddenUntilLg = new Set(["/about", "/help"]);

export function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.classList.add("mobile-menu-active");
      document.body.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("mobile-menu-active");
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.documentElement.classList.remove("mobile-menu-active");
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between gap-3 border-b border-white/40 bg-white/80 px-margin-mobile py-4 shadow-sm backdrop-blur-xl md:bg-white/70 md:px-margin-tablet md:py-3 lg:gap-4 lg:px-margin-desktop lg:py-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 lg:flex-initial">
          <Link
            href="/"
            className="truncate font-display-lg-mobile text-2xl font-bold tracking-tight text-primary lg:text-display-lg-mobile"
          >
            EcoWorld
          </Link>
        </div>
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-6 lg:flex lg:gap-8">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const hideUntilLg = navHiddenUntilLg.has(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  (hideUntilLg ? "hidden lg:block " : "") +
                  (active
                    ? "relative shrink-0 font-bold text-secondary after:absolute after:-bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-secondary after:content-[''] font-label-md text-label-md lg:font-title-lg lg:text-title-lg"
                    : "shrink-0 font-label-md text-label-md text-on-surface-variant transition-colors hover:text-secondary lg:font-title-lg lg:text-title-lg")
                }
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-2 md:gap-3 lg:gap-4">
          <div className="md:hidden">
            <LanguageSwitcher variant="pill" />
          </div>
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <Link
            href="/volunteers#volunteer-form"
            className="hidden rounded-full bg-primary-container px-4 py-2 font-label-md text-label-md text-on-primary-container transition-all duration-300 hover:bg-primary active:scale-95 lg:inline-flex lg:items-center lg:justify-center lg:px-6 lg:py-2.5"
          >
            {t("nav.becomeVolunteer")}
          </Link>
          <button
            type="button"
            className="p-2 text-primary lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[60] bg-white transition-transform duration-300 ease-out lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-surface-container-low px-margin-mobile py-4">
            <span className="font-display-lg-mobile text-2xl font-bold text-primary">
              EcoWorld
            </span>
            <button
              type="button"
              className="p-2 text-primary"
              aria-label={t("nav.closeMenu")}
              onClick={() => setMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>
          <nav className="flex flex-col gap-6 p-margin-mobile">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active
                      ? "text-xl font-semibold text-secondary"
                      : "text-xl font-semibold text-on-surface"
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto p-margin-mobile">
            <Link
              href="/volunteers#volunteer-form"
              className="block w-full rounded-xl bg-primary py-4 text-center font-title-lg text-title-lg text-on-primary shadow-lg"
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.becomeVolunteer")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
