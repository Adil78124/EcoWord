"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { VolunteerApplicationStatus } from "@prisma/client";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
import { adminJson } from "@/components/admin/admin-api";
import { formatRuDateTime } from "@/components/admin/format";
import { VolunteerStatusBadge } from "@/components/admin/status-badges";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

type VolunteerRow = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  age: number;
  direction: string;
  experience: string;
  comment: string;
  status: VolunteerApplicationStatus;
  createdAt: string;
  updatedAt: string;
};

type VolunteerDraft = Omit<VolunteerRow, "id" | "createdAt" | "updatedAt" | "age"> & {
  age: number | string;
};

type ListResponse = { success: true; items: VolunteerRow[] };

const STATUS_OPTIONS: { value: VolunteerApplicationStatus; label: string }[] = [
  { value: "NEW", label: "Новый" },
  { value: "IN_REVIEW", label: "На рассмотрении" },
  { value: "APPROVED", label: "Принят" },
  { value: "REJECTED", label: "Отказ" },
];

function buildQuery(status: string, q: string): string {
  const p = new URLSearchParams();
  if (status && status !== "ALL") p.set("status", status);
  if (q.trim()) p.set("q", q.trim());
  const s = p.toString();
  return s ? `?${s}` : "";
}

function toDraft(row: VolunteerRow): VolunteerDraft {
  return {
    name: row.name,
    phone: row.phone,
    email: row.email,
    city: row.city,
    age: row.age,
    direction: row.direction,
    experience: row.experience,
    comment: row.comment,
    status: row.status,
  };
}

export default function AdminVolunteersPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<VolunteerRow[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [detail, setDetail] = useState<VolunteerRow | null>(null);
  const [editTarget, setEditTarget] = useState<VolunteerRow | null>(null);
  const [draft, setDraft] = useState<VolunteerDraft | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<VolunteerRow | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    const qs = buildQuery(statusFilter, debouncedSearch);
    const res = await adminJson<ListResponse>(`/api/admin/volunteers${qs}`);
    setLoading(false);
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    setItems(res.data.items);
  }, [statusFilter, debouncedSearch]);

  useEffect(() => {
    void load();
  }, [load]);

  const patchStatus = async (id: string, status: VolunteerApplicationStatus) => {
    const res = await adminJson<{ success: true; item: VolunteerRow }>(
      `/api/admin/volunteers/${id}`,
      { method: "PATCH", body: JSON.stringify({ status }) },
    );
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success("Статус обновлён");
    await load();
    setDetail((d) => (d?.id === id ? res.data.item : d));
  };

  const openEdit = (row: VolunteerRow) => {
    setEditTarget(row);
    setDraft(toDraft(row));
  };

  const saveEdit = async () => {
    if (!editTarget || !draft) return;
    const res = await adminJson<{ success: true; item: VolunteerRow }>(
      `/api/admin/volunteers/${editTarget.id}`,
      { method: "PATCH", body: JSON.stringify({ ...draft, age: Number(draft.age) }) },
    );
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success("Заявка обновлена");
    setEditTarget(null);
    setDraft(null);
    await load();
  };

  const remove = async () => {
    if (!deleteTarget) return;
    const res = await adminJson(`/api/admin/volunteers/${deleteTarget.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success("Заявка удалена");
    setDeleteTarget(null);
    await load();
  };

  const empty = useMemo(
    () => !loading && items.length === 0,
    [loading, items.length],
  );

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        Заявки волонтёров. Через меню действий можно открыть, редактировать,
        изменить статус или удалить запись.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="space-y-1.5">
          <span className="text-muted-foreground text-xs">Статус</span>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "ALL")}>
            <SelectTrigger className="w-full sm:w-56">
              <SelectValue placeholder="Все" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Все статусы</SelectItem>
              {STATUS_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <span className="text-muted-foreground text-xs">
            Поиск по имени, email или телефону
          </span>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Начните вводить..."
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card">
        {loading ? (
          <div className="space-y-2 p-4">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Имя</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Город</TableHead>
                <TableHead>Направление</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead className="w-[72px] text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="max-w-[140px] truncate font-medium">
                    {row.name}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{row.phone}</TableCell>
                  <TableCell className="max-w-[160px] truncate text-xs">
                    {row.email}
                  </TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell className="max-w-[140px] truncate">
                    {row.direction}
                  </TableCell>
                  <TableCell>
                    <VolunteerStatusBadge status={row.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs whitespace-normal">
                    {formatRuDateTime(row.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={<Button variant="ghost" size="icon-sm" aria-label="Действия" />}
                      >
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setDetail(row)}>
                          Открыть детали
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEdit(row)}>
                          Редактировать
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => patchStatus(row.id, "IN_REVIEW")}>
                          На рассмотрении
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => patchStatus(row.id, "APPROVED")}>
                          Принять
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => patchStatus(row.id, "REJECTED")}>
                          Отказать
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onClick={() => setDeleteTarget(row)}>
                          Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {empty && <p className="text-muted-foreground p-4 text-sm">Заявок не найдено.</p>}
      </div>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{detail?.name}</DialogTitle>
            <DialogDescription>Полная информация по заявке волонтёра.</DialogDescription>
          </DialogHeader>
          {detail && (
            <div className="grid gap-2 text-sm">
              <div><span className="text-muted-foreground">Телефон: </span>{detail.phone}</div>
              <div><span className="text-muted-foreground">Email: </span>{detail.email}</div>
              <div><span className="text-muted-foreground">Город: </span>{detail.city}</div>
              <div><span className="text-muted-foreground">Возраст: </span>{detail.age}</div>
              <div><span className="text-muted-foreground">Направление: </span>{detail.direction}</div>
              <div><span className="text-muted-foreground">Опыт: </span>{detail.experience || "-"}</div>
              <div><span className="text-muted-foreground">Комментарий: </span>{detail.comment || "-"}</div>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-muted-foreground">Статус:</span>
                <VolunteerStatusBadge status={detail.status} />
              </div>
              <div className="text-muted-foreground text-xs">
                Создано: {formatRuDateTime(detail.createdAt)}
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" onClick={() => detail && patchStatus(detail.id, "IN_REVIEW")}>
                На рассмотрении
              </Button>
              <Button size="sm" onClick={() => detail && patchStatus(detail.id, "APPROVED")}>
                Принять
              </Button>
              <Button size="sm" variant="destructive" onClick={() => detail && patchStatus(detail.id, "REJECTED")}>
                Отказать
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editTarget} onOpenChange={(o) => !o && setEditTarget(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать заявку</DialogTitle>
            <DialogDescription>Изменения сохраняются в PostgreSQL.</DialogDescription>
          </DialogHeader>
          {draft && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vol-name">Имя</Label>
                <Input id="vol-name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vol-phone">Телефон</Label>
                <Input id="vol-phone" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vol-email">Email</Label>
                <Input id="vol-email" type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vol-city">Город</Label>
                <Input id="vol-city" value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vol-age">Возраст</Label>
                <Input id="vol-age" type="number" min={1} max={120} value={draft.age} onChange={(e) => setDraft({ ...draft, age: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Статус</Label>
                <Select value={draft.status} onValueChange={(v) => setDraft({ ...draft, status: v as VolunteerApplicationStatus })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="vol-direction">Направление</Label>
                <Input id="vol-direction" value={draft.direction} onChange={(e) => setDraft({ ...draft, direction: e.target.value })} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="vol-experience">Опыт</Label>
                <Textarea id="vol-experience" value={draft.experience} onChange={(e) => setDraft({ ...draft, experience: e.target.value })} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="vol-comment">Комментарий</Label>
                <Textarea id="vol-comment" value={draft.comment} onChange={(e) => setDraft({ ...draft, comment: e.target.value })} />
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
            <DialogTitle>Удалить заявку?</DialogTitle>
            <DialogDescription>
              Будет удалена заявка «{deleteTarget?.name}». Это действие нельзя отменить.
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
