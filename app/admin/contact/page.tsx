"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ContactMessageStatus } from "@prisma/client";
import { toast } from "sonner";
import { MoreHorizontal, Reply } from "lucide-react";
import { adminJson } from "@/components/admin/admin-api";
import { formatRuDateTime } from "@/components/admin/format";
import { ContactStatusBadge } from "@/components/admin/status-badges";
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
import { ScrollArea } from "@/components/ui/scroll-area";

type MessageRow = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactMessageStatus;
  createdAt: string;
  updatedAt: string;
};

type ListResponse = { success: true; items: MessageRow[] };

const STATUS_OPTIONS: { value: ContactMessageStatus; label: string }[] = [
  { value: "NEW", label: "Новое" },
  { value: "READ", label: "Прочитано" },
  { value: "CLOSED", label: "Закрыто" },
];

function buildQuery(status: string, q: string): string {
  const p = new URLSearchParams();
  if (status && status !== "ALL") p.set("status", status);
  if (q.trim()) p.set("q", q.trim());
  const s = p.toString();
  return s ? `?${s}` : "";
}

function replyHref(row: MessageRow): string {
  const subject = `Re: ${row.subject}`;
  return `mailto:${encodeURIComponent(row.email)}?subject=${encodeURIComponent(subject)}`;
}

export default function AdminContactPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<MessageRow[]>([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [detail, setDetail] = useState<MessageRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MessageRow | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    const qs = buildQuery(statusFilter, debouncedSearch);
    const res = await adminJson<ListResponse>(`/api/admin/contact${qs}`);
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

  const patchStatus = async (id: string, status: ContactMessageStatus) => {
    const res = await adminJson(`/api/admin/contact/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success("Статус обновлён");
    await load();
    setDetail((d) => (d?.id === id ? { ...d, status } : d));
  };

  const remove = async () => {
    if (!deleteTarget) return;
    const res = await adminJson(`/api/admin/contact/${deleteTarget.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success("Сообщение удалено");
    setDeleteTarget(null);
    setDetail((d) => (d?.id === deleteTarget.id ? null : d));
    await load();
  };

  const empty = useMemo(
    () => !loading && items.length === 0,
    [loading, items.length],
  );

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        Сообщения из формы «Остались вопросы?». Кнопка «Ответить» открывает
        почтовый клиент.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="space-y-1.5">
          <span className="text-muted-foreground text-xs">Статус</span>
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v ?? "ALL")}
          >
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
            Поиск по имени, email или теме
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
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Имя</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Тема</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead className="w-[72px] text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="max-w-[120px] truncate font-medium">
                    {row.name}
                  </TableCell>
                  <TableCell className="max-w-[160px] truncate text-xs">
                    {row.email}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {row.subject}
                  </TableCell>
                  <TableCell>
                    <ContactStatusBadge status={row.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs whitespace-normal">
                    {formatRuDateTime(row.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon-sm" aria-label="Действия" />
                        }
                      >
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setDetail(row)}>
                          Открыть детали
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            window.location.href = replyHref(row);
                          }}
                        >
                          <Reply className="size-4" />
                          Ответить
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => patchStatus(row.id, "READ")}
                        >
                          Прочитано
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => patchStatus(row.id, "CLOSED")}
                        >
                          Закрыть обращение
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => setDeleteTarget(row)}
                        >
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
        {empty && (
          <p className="text-muted-foreground p-4 text-sm">
            Сообщений не найдено.
          </p>
        )}
      </div>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-hidden sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{detail?.subject}</DialogTitle>
            <DialogDescription>
              Сообщение от {detail?.name} ({detail?.email})
            </DialogDescription>
          </DialogHeader>
          {detail && (
            <div className="grid gap-3 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground">Статус:</span>
                <ContactStatusBadge status={detail.status} />
              </div>
              <div className="text-muted-foreground text-xs">
                {formatRuDateTime(detail.createdAt)}
              </div>
              <ScrollArea className="max-h-56 rounded-lg border p-3">
                <p className="whitespace-pre-wrap">{detail.message}</p>
              </ScrollArea>
            </div>
          )}
          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
            {detail && (
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  window.location.href = replyHref(detail);
                }}
              >
                <Reply className="size-4" />
                Ответить
              </Button>
            )}
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => detail && patchStatus(detail.id, "READ")}
              >
                Прочитано
              </Button>
              <Button
                size="sm"
                onClick={() => detail && patchStatus(detail.id, "CLOSED")}
              >
                Закрыть
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Удалить сообщение?</DialogTitle>
            <DialogDescription>
              Тема: «{deleteTarget?.subject}». Действие необратимо.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={() => void remove()}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
