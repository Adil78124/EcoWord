"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";

type MeResponse = {
  success?: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    city: string | null;
    role: string;
  };
  profile?: {
    bio: string | null;
    interests: string | null;
    volunteerHours: number;
  } | null;
  message?: string;
};

export default function ProfilePage() {
  const { t } = useI18n();
  const [data, setData] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const json = (await res.json().catch(() => ({}))) as MeResponse;
      setData(json);
    } catch {
      setData({ success: false, message: t("profile.loadError") });
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void load();
  }, [load]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setData(null);
    void load();
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-lg px-margin-mobile pb-unit-xl pt-32">
        <p className="text-on-surface-variant">{t("form.sending")}</p>
      </main>
    );
  }

  if (!data?.success || !data.user) {
    return (
      <main className="mx-auto max-w-lg px-margin-mobile pb-unit-xl pt-32">
        <h1 className="mb-4 font-headline-md text-headline-md text-primary">{t("profile.title")}</h1>
        <p className="mb-6 font-body-md text-on-surface-variant">{t("profile.noAuth")}</p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/login"
            className="rounded-xl bg-primary px-6 py-3 font-label-md text-on-primary"
          >
            {t("profile.loginLink")}
          </Link>
          <Link
            href="/register"
            className="rounded-xl border border-secondary px-6 py-3 font-label-md text-secondary"
          >
            {t("profile.registerLink")}
          </Link>
        </div>
      </main>
    );
  }

  const { user, profile } = data;

  return (
    <main className="mx-auto max-w-lg px-margin-mobile pb-unit-xl pt-32 md:px-margin-tablet">
      <h1 className="mb-unit-lg font-headline-md text-headline-md text-primary">{t("profile.title")}</h1>
      <div className="glass-card space-y-3 rounded-2xl border border-outline-variant/20 p-unit-lg">
        <p>
          <span className="font-semibold text-primary">{user.name}</span>
        </p>
        <p className="text-sm text-on-surface-variant">
          {t("profile.email")}: {user.email}
        </p>
        {user.phone && (
          <p className="text-sm text-on-surface-variant">
            {t("profile.phone")}: {user.phone}
          </p>
        )}
        {user.city && (
          <p className="text-sm text-on-surface-variant">
            {t("profile.city")}: {user.city}
          </p>
        )}
        <p className="text-sm text-on-surface-variant">
          {t("profile.role")}: {user.role}
        </p>
        {profile && (
          <>
            <p className="text-sm text-on-surface-variant">
              {t("profile.hours")}: {profile.volunteerHours}
            </p>
            {profile.bio && (
              <p className="text-sm">
                <span className="font-semibold">{t("profile.bio")}:</span> {profile.bio}
              </p>
            )}
            {profile.interests && (
              <p className="text-sm">
                <span className="font-semibold">{t("profile.interests")}:</span>{" "}
                {profile.interests}
              </p>
            )}
          </>
        )}
      </div>
      <button
        type="button"
        className="mt-6 rounded-xl border border-outline-variant px-6 py-3 font-label-md text-on-surface"
        onClick={() => void logout()}
      >
        {t("profile.logout")}
      </button>
    </main>
  );
}
