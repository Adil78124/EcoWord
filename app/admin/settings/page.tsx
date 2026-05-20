"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { UserRole } from "@prisma/client";
import { toast } from "sonner";
import { adminJson } from "@/components/admin/admin-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

type MeResponse = {
  success: true;
  user: { id: string; email: string; name: string; role: UserRole };
};

type ProfileForm = {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
};

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const loadMe = useCallback(async () => {
    setLoading(true);
    const res = await adminJson<MeResponse>("/api/admin/me");
    setLoading(false);
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    setForm((f) => ({
      ...f,
      name: res.data.user.name,
      email: res.data.user.email,
    }));
  }, []);

  useEffect(() => {
    void loadMe();
  }, [loadMe]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    const res = await adminJson<MeResponse>("/api/admin/me", {
      method: "PATCH",
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        currentPassword: form.currentPassword || undefined,
        newPassword: form.newPassword || undefined,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success("Профиль администратора обновлён");
    setForm({
      name: res.data.user.name,
      email: res.data.user.email,
      currentPassword: "",
      newPassword: "",
    });
  };

  return (
    <div className="max-w-2xl space-y-6">
      <p className="text-muted-foreground text-sm">
        Настройки панели администратора и данные текущего профиля.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Профиль администратора</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-40" />
            </div>
          ) : (
            <form className="space-y-4" onSubmit={submit}>
              <div className="space-y-2">
                <Label htmlFor="admin-name">Логин / имя</Label>
                <Input
                  id="admin-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Administrator"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email для входа</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@example.com"
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="admin-current-password">Текущий пароль</Label>
                <Input
                  id="admin-current-password"
                  type="password"
                  value={form.currentPassword}
                  onChange={(e) =>
                    setForm({ ...form, currentPassword: e.target.value })
                  }
                  autoComplete="current-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-new-password">Новый пароль</Label>
                <Input
                  id="admin-new-password"
                  type="password"
                  value={form.newPassword}
                  onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                  placeholder="Минимум 8 символов"
                  autoComplete="new-password"
                />
                <p className="text-muted-foreground text-xs">
                  Если пароль менять не нужно, оставьте оба поля пароля пустыми.
                </p>
              </div>
              <Button type="submit" disabled={saving}>
                {saving ? "Сохранение..." : "Сохранить профиль"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Безопасность</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Доступ к <code className="rounded bg-muted px-1">/admin</code>{" "}
            разрешён только при{" "}
            <code className="rounded bg-muted px-1">ADMIN_PANEL_ENABLED=true</code>{" "}
            и активной сессии пользователя с ролью{" "}
            <code className="rounded bg-muted px-1">ADMIN</code>.
          </p>
          <p>
            Проверка выполняется в middleware и API-обработчиках. Публичные
            страницы сайта не используют админский layout.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
