"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import { Leaf } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

function LoginForm() {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const err = searchParams.get("error");
    if (err === "admin_only") {
      setError(t("login.adminOnly"));
    }
  }, [searchParams, t]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
        role?: string;
      };
      if (!res.ok || !json.success) {
        setError(json.message ?? t("login.error"));
        return;
      }

      const nextRaw = searchParams.get("next");
      const nextSafe =
        nextRaw &&
        nextRaw.startsWith("/") &&
        !nextRaw.startsWith("//") &&
        (nextRaw.startsWith("/admin") || nextRaw.startsWith("/profile"));

      if (json.role === "ADMIN") {
        if (nextSafe && nextRaw.startsWith("/admin")) {
          router.push(nextRaw);
        } else {
          router.push("/admin");
        }
        return;
      }

      if (nextSafe && nextRaw.startsWith("/profile")) {
        router.push(nextRaw);
      } else {
        router.push("/profile");
      }
    } catch {
      setError(t("login.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-md items-center px-margin-mobile pb-unit-xl pt-24 md:px-margin-tablet">
      <Card className="w-full shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Leaf className="size-7" aria-hidden />
          </div>
          <CardTitle className="font-heading text-xl">{t("login.title")}</CardTitle>
          <CardDescription>{t("login.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="bg-destructive/10 text-destructive mb-4 rounded-lg border border-destructive/20 px-3 py-2 text-sm">
              {error}
            </p>
          )}
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="login-email">{t("login.email")}</Label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-pass">{t("login.password")}</Label>
              <Input
                id="login-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? t("form.sending") : t("login.submit")}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <p className="text-muted-foreground text-center text-sm">
            <Link
              href="/register"
              className="text-primary font-medium underline underline-offset-4 hover:text-primary/90"
            >
              {t("login.registerLink")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[50vh] max-w-md items-center justify-center px-4">
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
