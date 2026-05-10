"use client";

import type { ComponentProps } from "react";
import type {
  ContactMessageStatus,
  DonationStatus,
  UserRole,
  VolunteerApplicationStatus,
} from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const VOLUNTEER_LABELS: Record<VolunteerApplicationStatus, string> = {
  NEW: "Новый",
  IN_REVIEW: "На рассмотрении",
  APPROVED: "Принят",
  REJECTED: "Отказ",
};

const CONTACT_LABELS: Record<ContactMessageStatus, string> = {
  NEW: "Новое",
  READ: "Прочитано",
  CLOSED: "Закрыто",
};

const DONATION_LABELS: Record<DonationStatus, string> = {
  CREATED: "Создан счёт",
  TEST_PAID: "Тестово оплачено",
  CANCELLED: "Отменено",
};

const ROLE_LABELS: Record<UserRole, string> = {
  USER: "Пользователь",
  VOLUNTEER: "Волонтёр",
  ADMIN: "Администратор",
};

function volunteerVariant(
  s: VolunteerApplicationStatus,
): ComponentProps<typeof Badge>["variant"] {
  switch (s) {
    case "NEW":
      return "default";
    case "IN_REVIEW":
      return "secondary";
    case "APPROVED":
      return "outline";
    case "REJECTED":
      return "destructive";
    default:
      return "outline";
  }
}

export function VolunteerStatusBadge({
  status,
  className,
}: {
  status: VolunteerApplicationStatus;
  className?: string;
}) {
  return (
    <Badge
      variant={volunteerVariant(status)}
      className={cn(
        status === "APPROVED" &&
          "border-primary/45 bg-transparent text-primary",
        className,
      )}
    >
      {VOLUNTEER_LABELS[status]}
    </Badge>
  );
}

export function ContactStatusBadge({
  status,
  className,
}: {
  status: ContactMessageStatus;
  className?: string;
}) {
  const variant =
    status === "NEW"
      ? "default"
      : status === "READ"
        ? "secondary"
        : "outline";
  return (
    <Badge variant={variant} className={className}>
      {CONTACT_LABELS[status]}
    </Badge>
  );
}

export function DonationStatusBadge({
  status,
  className,
}: {
  status: DonationStatus;
  className?: string;
}) {
  const variant =
    status === "CREATED"
      ? "secondary"
      : status === "TEST_PAID"
        ? "default"
        : "destructive";
  return (
    <Badge variant={variant} className={className}>
      {DONATION_LABELS[status]}
    </Badge>
  );
}

export function UserRoleBadge({
  role,
  className,
}: {
  role: UserRole;
  className?: string;
}) {
  const variant =
    role === "ADMIN"
      ? "default"
      : role === "VOLUNTEER"
        ? "secondary"
        : "outline";
  return (
    <Badge variant={variant} className={className}>
      {ROLE_LABELS[role]}
    </Badge>
  );
}
