"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { UserRole } from "@prisma/client";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
import { adminJson } from "@/components/admin/admin-api";
import { formatRuDateTime } from "@/components/admin/format";
import { UserRoleBadge } from "@/components/admin/status-badges";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ProfileSlice = {
  id: string;
  bio: string;
  interests: string;
  volunteerHours: number;
  avatarUrl: string | null;
} | null;

type UserRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  role: UserRole;
  createdAt: string;
  profile: ProfileSlice;
};

type UserDraft = {
  name: string;
  email: string;
  phone: string;
  city: string;
  role: UserRole;
};

type ListResponse = { success: true; items: UserRow[] };
type MeResponse = {
  success: true;
  user: { id: string; email: string; name: string; role: UserRole };
};

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: "USER", label: "Пользователь" },
  { value: "VOLUNTEER", label: "Волонтёр" },
  { value: "ADMIN", label: "Администратор" },
];

function buildQuery(role: string, q: string): string {
  const p = new URLSearchParams();
  if (role && role !== "ALL") p.set("status", role);
  if (q.trim()) p.set("q", q.trim());
  const s = p.toString();
  return s ? `?${s}` : "";
}

function toDraft(row: UserRow): UserDraft {
  return {
    name: row.name,
    email: row.email,
    phone: row.phone ?? "",
    city: row.city ?? "",
    role: row.role,
  };
}

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<UserRow[]>([]);
  const [meId, setMeId] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [detail, setDetail] = useState<UserRow | null>(null);
  const [editTarget, setEditTarget] = useState<UserRow | null>(null);
  const [draft, setDraft] = useState<UserDraft | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UserRow | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const loadMe = useCallback(async () => {
    const res = await adminJson<MeResponse>("/api/admin/me");
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    setMeId(res.data.user.id);
  }, []);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const qs = buildQuery(roleFilter, debouncedSearch);
    const res = await adminJson<ListResponse>(`/api/admin/users${qs}`);
    setLoading(false);
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    setItems(res.data.items);
  }, [roleFilter, debouncedSearch]);

  useEffect(() => {
    void loadMe();
  }, [loadMe]);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const openEdit = (row: UserRow) => {
    setEditTarget(row);
    setDraft(toDraft(row));
  };

  const saveEdit = async () => {
    if (!editTarget || !draft) return;
    const payload = editTarget.id === meId ? { ...draft, role: undefined } : draft;
    const res = await adminJson<{ success: true; item: UserRow }>(
      `/api/admin/users/${editTarget.id}`,
      { method: "PATCH", body: JSON.stringify(payload) },
    );
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success("Пользователь обновлён");
    setEditTarget(null);
    setDraft(null);
    setDetail((d) => (d?.id === editTarget.id ? res.data.item : d));
    await loadUsers();
  };

  const remove = async () => {
    if (!deleteTarget) return;
    const res = await adminJson(`/api/admin/users/${deleteTarget.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success("Пользователь удалён");
    setDeleteTarget(null);
    setDetail((d) => (d?.id === deleteTarget.id ? null : d));
    await loadUsers();
  };

  const empty = useMemo(() => !loading && items.length === 0, [loading, items.length]);

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        Пользователи и профили. Админ может открыть профиль, редактировать
        основные данные и роль, а также удалить пользователя.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="space-y-1.5">
          <span className="text-muted-foreground text-xs">Роль</span>
          <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v ?? "ALL")}>
            <SelectTrigger className="w-full sm:w-56"><SelectValue placeholder="Все" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Все роли</SelectItem>
              {ROLE_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <span className="text-muted-foreground text-xs">Поиск по имени, email или телефону</span>
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Начните вводить..." />
        </div>
      </div>

      <div className="rounded-xl border bg-card">
        {loading ? (
          <div className="space-y-2 p-4">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Имя</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Город</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Регистрация</TableHead>
                <TableHead className="w-[72px] text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="max-w-[140px] truncate font-medium">{row.name}</TableCell>
                  <TableCell className="max-w-[180px] truncate text-xs">{row.email}</TableCell>
                  <TableCell className="font-mono text-xs">{row.phone ?? "-"}</TableCell>
                  <TableCell>{row.city ?? "-"}</TableCell>
                  <TableCell><UserRoleBadge role={row.role} /></TableCell>
                  <TableCell className="text-muted-foreground text-xs whitespace-normal">{formatRuDateTime(row.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Действия" />}>
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setDetail(row)}>Открыть профиль</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEdit(row)}>Редактировать</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          disabled={row.id === meId}
                          onClick={() => setDeleteTarget(row)}
                        >
                          Удалить пользователя
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {empty && <p className="text-muted-foreground p-4 text-sm">Пользователей не найдено.</p>}
      </div>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{detail?.name}</DialogTitle>
            <DialogDescription>{detail?.email}</DialogDescription>
          </DialogHeader>
          {detail && (
            <div className="grid gap-4 text-sm">
              <div className="grid gap-1"><span className="text-muted-foreground text-xs">Телефон</span><span>{detail.phone ?? "-"}</span></div>
              <div className="grid gap-1"><span className="text-muted-foreground text-xs">Город</span><span>{detail.city ?? "-"}</span></div>
              <div className="grid gap-1"><span className="text-muted-foreground text-xs">Дата регистрации</span><span>{formatRuDateTime(detail.createdAt)}</span></div>
              <div className="flex flex-wrap items-center gap-2"><span className="text-muted-foreground">Роль:</span><UserRoleBadge role={detail.role} /></div>
              <Separator />
              <div className="space-y-2">
                <span className="text-muted-foreground text-xs">Профиль</span>
                {detail.profile ? (
                  <div className="grid gap-2 rounded-lg border p-3">
                    <div><span className="text-muted-foreground">О себе: </span>{detail.profile.bio || "-"}</div>
                    <div><span className="text-muted-foreground">Интересы: </span>{detail.profile.interests || "-"}</div>
                    <div><span className="text-muted-foreground">Часы волонтёрства: </span>{detail.profile.volunteerHours}</div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Профиль не заполнен.</p>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            {detail && <Button onClick={() => openEdit(detail)}>Редактировать</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editTarget} onOpenChange={(o) => !o && setEditTarget(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Редактировать пользователя</DialogTitle>
            <DialogDescription>
              Можно изменить имя, email, телефон, город и роль. Свою роль админ изменить не может.
            </DialogDescription>
          </DialogHeader>
          {draft && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="user-name">Имя</Label>
                <Input id="user-name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-email">Email</Label>
                <Input id="user-email" type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-phone">Телефон</Label>
                <Input id="user-phone" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-city">Город</Label>
                <Input id="user-city" value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Роль</Label>
                <Select
                  value={draft.role}
                  disabled={editTarget?.id === meId}
                  onValueChange={(v) => setDraft({ ...draft, role: v as UserRole })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{ROLE_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                </Select>
                {editTarget?.id === meId && (
                  <p className="text-muted-foreground text-xs">Собственную роль нельзя изменить из панели.</p>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTarget(null)}>Отмена</Button>
            <Button onClick={() => void saveEdit()}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Удалить пользователя?</DialogTitle>
            <DialogDescription>
              Будет удалён пользователь «{deleteTarget?.name}» ({deleteTarget?.email}).
              Связанный профиль удалится каскадно.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Отмена</Button>
            <Button variant="destructive" onClick={() => void remove()}>Удалить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
