"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Leaf,
  Mail,
  Menu,
  Settings,
  UserPlus,
  Users,
  Wallet,
  ExternalLink,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Обзор", icon: LayoutDashboard },
  { href: "/admin/volunteers", label: "Волонтёры", icon: UserPlus },
  { href: "/admin/contact", label: "Вопросы", icon: Mail },
  { href: "/admin/donations", label: "Финансовая помощь", icon: Wallet },
  { href: "/admin/users", label: "Пользователи", icon: Users },
  { href: "/admin/settings", label: "Настройки", icon: Settings },
] as const;

const TITLE_MAP: Record<string, string> = {
  "/admin": "Обзор",
  "/admin/volunteers": "Волонтёры",
  "/admin/contact": "Вопросы",
  "/admin/donations": "Финансовая помощь",
  "/admin/users": "Пользователи",
  "/admin/settings": "Настройки",
};

function navActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({
  pathname,
  onNavigate,
  className,
}: {
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <nav className={cn("flex flex-col gap-0.5", className)}>
      {NAV.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            navActive(pathname, href)
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <Icon className="size-4 shrink-0" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const title =
    TITLE_MAP[pathname] ??
    [...NAV].reverse().find((n) => pathname.startsWith(n.href) && n.href !== "/admin")
      ?.label ??
    "Админка";

  return (
    <div className="admin-dashboard-theme flex min-h-screen bg-background text-foreground">
      <aside className="relative hidden w-56 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <Leaf className="size-5 text-primary" />
          <span className="font-heading text-sm font-semibold">EcoWorld</span>
          <Badge variant="secondary" className="ml-auto text-[10px]">
            Admin
          </Badge>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <NavLinks pathname={pathname} />
        </div>
        <Separator />
        <div className="p-3 text-xs text-muted-foreground">
          {/* TODO: заменить на RBAC / middleware после расширения сессии */}
          Доступ только для роли ADMIN в БД и при включённом{" "}
          <code className="rounded bg-muted px-1">ADMIN_PANEL_ENABLED</code>.
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b bg-card/95 px-3 backdrop-blur md:px-6">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="md:hidden"
                  aria-label="Открыть меню"
                />
              }
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(100%,18rem)] p-0">
              <SheetHeader className="border-b p-4 text-left">
                <SheetTitle className="flex items-center gap-2 font-heading">
                  <Leaf className="size-5 text-primary" />
                  EcoWorld Admin
                </SheetTitle>
              </SheetHeader>
              <div className="p-3">
                <NavLinks
                  pathname={pathname}
                  onNavigate={() => setMobileOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>

          <h1 className="min-w-0 flex-1 truncate font-heading text-base font-semibold md:text-lg">
            {title}
          </h1>

          <Badge variant="outline" className="hidden sm:inline-flex">
            Admin
          </Badge>

          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "inline-flex gap-1.5",
            )}
          >
            На сайт
            <ExternalLink className="size-3.5 opacity-70" />
          </Link>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
