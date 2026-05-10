"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }
  return (
    <I18nProvider>
      <Header />
      {children}
      <Footer />
    </I18nProvider>
  );
}
