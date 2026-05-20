"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { DonationStatus, DonationType } from "@prisma/client";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
import { adminJson } from "@/components/admin/admin-api";
import { formatRuDateTime } from "@/components/admin/format";
import { DonationStatusBadge } from "@/components/admin/status-badges";
import { Badge } from "@/components/ui/badge";
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

type DonationRow = {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: string;
  type: DonationType;
  status: DonationStatus;
  invoiceNumber: string;
  createdAt: string;
  updatedAt: string;
};

type DonationDraft = Pick<DonationRow, "donorName" | "donorEmail" | "type" | "status"> & {
  amount: string;
};

type ListResponse = { success: true; items: DonationRow[] };

const TYPE_LABEL: Record<DonationType, string> = {
  ONCE: "Разово",
  MONTHLY: "Ежемесячно",
};

const STATUS_OPTIONS: { value: DonationStatus; label: string }[] = [
  { value: "CREATED", label: "Создан счёт" },
  { value: "TEST_PAID", label: "Тестово оплачено" },
  { value: "CANCELLED", label: "Отменено" },
];

const TYPE_OPTIONS: { value: DonationType; label: string }[] = [
  { value: "ONCE", label: "Разово" },
  { value: "MONTHLY", label: "Ежемесячно" },
];

function TypeBadge({ type }: { type: DonationType }) {
  return (
    <Badge variant="outline" className="font-normal">
      {TYPE_LABEL[type]}
    </Badge>
  );
}

function buildQuery(status: string, q: string): string {
  const p = new URLSearchParams();
  if (status && status !== "ALL") p.set("status", status);
  if (q.trim()) p.set("q", q.trim());
  const s = p.toString();
  return s ? `?${s}` : "";
}

function toDraft(row: DonationRow): DonationDraft {
  return {
    donorName: row.donorName,
    donorEmail: row.donorEmail,
    amount: row.amount,
    type: row.type,
    status: row.status,
  };
}

export default function AdminDonationsPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<DonationRow[]>([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [detail, setDetail] = useState<DonationRow | null>(null);
  const [editTarget, setEditTarget] = useState<DonationRow | null>(null);
  const [draft, setDraft] = useState<DonationDraft | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DonationRow | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    const qs = buildQuery(statusFilter, debouncedSearch);
    const res = await adminJson<ListResponse>(`/api/admin/donations${qs}`);
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

  const patchStatus = async (id: string, status: DonationStatus) => {
    const res = await adminJson<{ success: true; item: DonationRow }>(
      `/api/admin/donations/${id}`,
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

  const openEdit = (row: DonationRow) => {
    setEditTarget(row);
    setDraft(toDraft(row));
  };

  const saveEdit = async () => {
    if (!editTarget || !draft) return;
    const res = await adminJson<{ success: true; item: DonationRow }>(
      `/api/admin/donations/${editTarget.id}`,
      { method: "PATCH", body: JSON.stringify({ ...draft, amount: Number(draft.amount) }) },
    );
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success("Финансовая запись обновлена");
    setEditTarget(null);
    setDraft(null);
    await load();
  };

  const remove = async () => {
    if (!deleteTarget) return;
    const res = await adminJson(`/api/admin/donations/${deleteTarget.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success("Запись удалена");
    setDeleteTarget(null);
    setDetail((d) => (d?.id === deleteTarget.id ? null : d));
    await load();
  };

  const empty = useMemo(() => !loading && items.length === 0, [loading, items.length]);

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        Тестовая финансовая помощь. Админ может редактировать данные донора,
        сумму, тип, статус или удалить запись.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="space-y-1.5">
          <span className="text-muted-foreground text-xs">Статус</span>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "ALL")}>
            <SelectTrigger className="w-full sm:w-56"><SelectValue placeholder="Все" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Все статусы</SelectItem>
              {STATUS_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <span className="text-muted-foreground text-xs">Поиск по имени, email или номеру счёта</span>
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
                <TableHead>Счёт</TableHead>
                <TableHead>Имя</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead className="w-[72px] text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-mono text-xs">{row.invoiceNumber}</TableCell>
                  <TableCell className="max-w-[120px] truncate font-medium">{row.donorName}</TableCell>
                  <TableCell className="max-w-[160px] truncate text-xs">{row.donorEmail}</TableCell>
                  <TableCell className="tabular-nums">{row.amount} ₸</TableCell>
                  <TableCell><TypeBadge type={row.type} /></TableCell>
                  <TableCell><DonationStatusBadge status={row.status} /></TableCell>
                  <TableCell className="text-muted-foreground text-xs whitespace-normal">{formatRuDateTime(row.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Действия" />}>
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setDetail(row)}>Детали</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEdit(row)}>Редактировать</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => patchStatus(row.id, "TEST_PAID")}>Тестово оплачено</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => patchStatus(row.id, "CANCELLED")}>Отменить счёт</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onClick={() => setDeleteTarget(row)}>Удалить запись</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {empty && <p className="text-muted-foreground p-4 text-sm">Записей нет.</p>}
      </div>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Счёт {detail?.invoiceNumber}</DialogTitle>
            <DialogDescription>{detail?.donorName} · {detail?.donorEmail}</DialogDescription>
          </DialogHeader>
          {detail && (
            <div className="grid gap-2 text-sm">
              <div><span className="text-muted-foreground">Сумма: </span><span className="tabular-nums font-medium">{detail.amount} ₸</span></div>
              <div className="flex flex-wrap items-center gap-2"><span className="text-muted-foreground">Тип:</span><TypeBadge type={detail.type} /></div>
              <div className="flex flex-wrap items-center gap-2"><span className="text-muted-foreground">Статус:</span><DonationStatusBadge status={detail.status} /></div>
              <div className="text-muted-foreground text-xs">Создано: {formatRuDateTime(detail.createdAt)}</div>
            </div>
          )}
          <DialogFooter className="flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={() => detail && patchStatus(detail.id, "TEST_PAID")}>Тестово оплачено</Button>
            <Button size="sm" variant="outline" onClick={() => detail && patchStatus(detail.id, "CANCELLED")}>Отменить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editTarget} onOpenChange={(o) => !o && setEditTarget(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Редактировать финансовую помощь</DialogTitle>
            <DialogDescription>Номер счёта не меняется, остальные данные можно исправить.</DialogDescription>
          </DialogHeader>
          {draft && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="donor-name">Имя донора</Label>
                <Input id="donor-name" value={draft.donorName} onChange={(e) => setDraft({ ...draft, donorName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donor-email">Email</Label>
                <Input id="donor-email" type="email" value={draft.donorEmail} onChange={(e) => setDraft({ ...draft, donorEmail: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donor-amount">Сумма</Label>
                <Input id="donor-amount" type="number" min={1} value={draft.amount} onChange={(e) => setDraft({ ...draft, amount: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Тип</Label>
                <Select value={draft.type} onValueChange={(v) => setDraft({ ...draft, type: v as DonationType })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{TYPE_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Статус</Label>
                <Select value={draft.status} onValueChange={(v) => setDraft({ ...draft, status: v as DonationStatus })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{STATUS_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                </Select>
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
            <DialogTitle>Удалить запись?</DialogTitle>
            <DialogDescription>Счёт {deleteTarget?.invoiceNumber} будет удалён из базы.</DialogDescription>
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
