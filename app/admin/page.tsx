"use client";

import { useEffect, useState } from "react";
import type {
  ContactMessageStatus,
  DonationStatus,
  VolunteerApplicationStatus,
} from "@prisma/client";
import {
  BadgeCheck,
  ClipboardList,
  Mail,
  Sparkles,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { adminJson } from "@/components/admin/admin-api";
import { formatRuDateTime } from "@/components/admin/format";
import {
  ContactStatusBadge,
  DonationStatusBadge,
  VolunteerStatusBadge,
} from "@/components/admin/status-badges";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

type RecentVolunteer = {
  id: string;
  name: string;
  city: string;
  status: VolunteerApplicationStatus;
  createdAt: string;
};

type RecentContact = {
  id: string;
  name: string;
  subject: string;
  status: ContactMessageStatus;
  createdAt: string;
};

type RecentDonation = {
  id: string;
  invoiceNumber: string;
  amount: string;
  status: DonationStatus;
  createdAt: string;
};

type DashboardPayload = {
  success: true;
  stats: {
    volunteerTotal: number;
    volunteerNew: number;
    contactTotal: number;
    donationsTotal: number;
    donationsTestPaid: number;
    usersTotal: number;
  };
  recent: {
    volunteers: RecentVolunteer[];
    contacts: RecentContact[];
    donations: RecentDonation[];
  };
};

function StatCard({
  title,
  value,
  loading,
  icon: Icon,
}: {
  title: string;
  value: number;
  loading: boolean;
  icon: LucideIcon;
}) {
  return (
    <Card
      size="sm"
      className="border-border bg-card shadow-sm ring-1 ring-border/80"
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-muted-foreground max-w-[70%] text-xs font-medium leading-snug">
          {title}
        </CardTitle>
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon className="size-4 shrink-0" aria-hidden />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <Skeleton className="h-9 w-20" />
        ) : (
          <p className="font-heading text-foreground text-3xl font-semibold tracking-tight tabular-nums">
            {value}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardPayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await adminJson<DashboardPayload>("/api/admin/dashboard");
      if (cancelled) return;
      if (!res.ok) {
        toast.error(res.message);
        setLoading(false);
        return;
      }
      setData(res.data);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = data?.stats;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-muted-foreground text-sm">
          Краткая сводка по заявкам, сообщениям и пользователям.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Всего заявок волонтёров"
          value={stats?.volunteerTotal ?? 0}
          loading={loading}
          icon={ClipboardList}
        />
        <StatCard
          title="Новые заявки"
          value={stats?.volunteerNew ?? 0}
          loading={loading}
          icon={Sparkles}
        />
        <StatCard
          title="Вопросы от пользователей"
          value={stats?.contactTotal ?? 0}
          loading={loading}
          icon={Mail}
        />
        <StatCard
          title="Финансовая помощь (записей)"
          value={stats?.donationsTotal ?? 0}
          loading={loading}
          icon={Wallet}
        />
        <StatCard
          title="Тестово оплачено"
          value={stats?.donationsTestPaid ?? 0}
          loading={loading}
          icon={BadgeCheck}
        />
        <StatCard
          title="Зарегистрированные пользователи"
          value={stats?.usersTotal ?? 0}
          loading={loading}
          icon={Users}
        />
      </div>

      <div className="space-y-3">
        <h2 className="font-heading text-base font-semibold">
          Последние записи
        </h2>
        <Tabs defaultValue="volunteers">
          <TabsList className="grid h-auto w-full grid-cols-3 gap-1 sm:inline-flex sm:h-8 sm:w-auto sm:max-w-xl">
            <TabsTrigger value="volunteers">Волонтёры</TabsTrigger>
            <TabsTrigger value="contact">Вопросы</TabsTrigger>
            <TabsTrigger value="donations">Платежи</TabsTrigger>
          </TabsList>
          <TabsContent value="volunteers" className="mt-4">
            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-sm">
                  Последние 5 заявок волонтёров
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Имя</TableHead>
                        <TableHead>Город</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Дата</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(data?.recent.volunteers ?? []).map((v) => (
                        <TableRow key={v.id}>
                          <TableCell className="max-w-[140px] truncate font-medium">
                            {v.name}
                          </TableCell>
                          <TableCell>{v.city}</TableCell>
                          <TableCell>
                            <VolunteerStatusBadge status={v.status} />
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatRuDateTime(v.createdAt)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                {!loading && (data?.recent.volunteers.length ?? 0) === 0 && (
                  <p className="text-muted-foreground text-sm">Нет данных.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="contact" className="mt-4">
            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-sm">
                  Последние 5 сообщений
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-24 w-full" />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Имя</TableHead>
                        <TableHead>Тема</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Дата</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(data?.recent.contacts ?? []).map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="max-w-[120px] truncate">
                            {c.name}
                          </TableCell>
                          <TableCell className="max-w-[180px] truncate">
                            {c.subject}
                          </TableCell>
                          <TableCell>
                            <ContactStatusBadge status={c.status} />
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatRuDateTime(c.createdAt)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                {!loading && (data?.recent.contacts.length ?? 0) === 0 && (
                  <p className="text-muted-foreground text-sm">Нет данных.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="donations" className="mt-4">
            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-sm">
                  Последние 5 финансовых заявок
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-24 w-full" />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Счёт</TableHead>
                        <TableHead>Сумма</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Дата</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(data?.recent.donations ?? []).map((d) => (
                        <TableRow key={d.id}>
                          <TableCell className="font-mono text-xs">
                            {d.invoiceNumber}
                          </TableCell>
                          <TableCell>{d.amount} ₸</TableCell>
                          <TableCell>
                            <DonationStatusBadge status={d.status} />
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatRuDateTime(d.createdAt)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                {!loading && (data?.recent.donations.length ?? 0) === 0 && (
                  <p className="text-muted-foreground text-sm">Нет данных.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Separator />
      <p className="text-muted-foreground text-xs">
        Платёжные интеграции отключены: статусы финансовой помощи выставляются
        вручную (тестовая логика).
      </p>
    </div>
  );
}
