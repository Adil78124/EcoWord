"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function RegisterPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          city: city.trim(),
          password,
          confirmPassword,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
        errors?: Record<string, string[]>;
      };
      if (!res.ok || !json.success) {
        if (json.errors) {
          const fe: Record<string, string> = {};
          for (const [k, v] of Object.entries(json.errors)) {
            if (v?.[0]) fe[k] = v[0];
          }
          setFieldErrors(fe);
        }
        setError(json.message ?? t("register.error"));
        return;
      }
      router.push("/profile");
    } catch {
      setError(t("register.error"));
    } finally {
      setSubmitting(false);
    }
  };

  const field =
    "w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-secondary/20";
  const label = "mb-1 block font-label-md text-label-md text-on-surface-variant";

  return (
    <main className="mx-auto max-w-md px-margin-mobile pb-unit-xl pt-32 md:px-margin-tablet">
      <h1 className="mb-unit-lg font-headline-md text-headline-md text-primary">{t("register.title")}</h1>
      {error && (
        <p className="mb-4 rounded-xl bg-error-container/50 p-3 font-body-md text-on-error-container">
          {error}
        </p>
      )}
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className={label} htmlFor="reg-name">
            {t("register.name")} <span className="text-error">*</span>
          </label>
          <input
            id="reg-name"
            className={field}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
          {fieldErrors.name && <p className="mt-1 text-sm text-error">{fieldErrors.name}</p>}
        </div>
        <div>
          <label className={label} htmlFor="reg-email">
            {t("register.email")} <span className="text-error">*</span>
          </label>
          <input
            id="reg-email"
            type="email"
            className={field}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          {fieldErrors.email && <p className="mt-1 text-sm text-error">{fieldErrors.email}</p>}
        </div>
        <div>
          <label className={label} htmlFor="reg-phone">
            {t("register.phone")}
          </label>
          <input
            id="reg-phone"
            type="tel"
            className={field}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />
          {fieldErrors.phone && <p className="mt-1 text-sm text-error">{fieldErrors.phone}</p>}
        </div>
        <div>
          <label className={label} htmlFor="reg-city">
            {t("register.city")}
          </label>
          <input
            id="reg-city"
            className={field}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            autoComplete="address-level2"
          />
          {fieldErrors.city && <p className="mt-1 text-sm text-error">{fieldErrors.city}</p>}
        </div>
        <div>
          <label className={label} htmlFor="reg-pass">
            {t("register.password")} <span className="text-error">*</span>
          </label>
          <input
            id="reg-pass"
            type="password"
            className={field}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          {fieldErrors.password && (
            <p className="mt-1 text-sm text-error">{fieldErrors.password}</p>
          )}
        </div>
        <div>
          <label className={label} htmlFor="reg-pass2">
            {t("register.confirm")} <span className="text-error">*</span>
          </label>
          <input
            id="reg-pass2"
            type="password"
            className={field}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          {fieldErrors.confirmPassword && (
            <p className="mt-1 text-sm text-error">{fieldErrors.confirmPassword}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="eco-gradient w-full rounded-xl py-3 font-title-lg text-title-lg text-on-primary shadow-lg disabled:opacity-60"
        >
          {submitting ? t("form.sending") : t("register.submit")}
        </button>
      </form>
      <p className="mt-6 text-center font-body-md text-on-surface-variant">
        <Link href="/login" className="text-secondary underline">
          {t("register.loginLink")}
        </Link>
      </p>
    </main>
  );
}
