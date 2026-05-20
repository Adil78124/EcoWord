import { z } from "zod";
import {
  contactMessageSchema,
  donationSchema,
  volunteerApplicationSchema,
} from "@/lib/validations/schemas";

export const volunteerStatusSchema = z.object({
  status: z.enum(["NEW", "IN_REVIEW", "APPROVED", "REJECTED"]),
});

export const contactStatusSchema = z.object({
  status: z.enum(["NEW", "READ", "CLOSED"]),
});

export const donationStatusSchema = z.object({
  status: z.enum(["CREATED", "TEST_PAID", "CANCELLED"]),
});

export const userRoleSchema = z.object({
  role: z.enum(["USER", "VOLUNTEER", "ADMIN"]),
});

export const adminVolunteerUpdateSchema = volunteerApplicationSchema
  .partial()
  .extend({
    status: z.enum(["NEW", "IN_REVIEW", "APPROVED", "REJECTED"]).optional(),
  });

export const adminContactUpdateSchema = contactMessageSchema.partial().extend({
  status: z.enum(["NEW", "READ", "CLOSED"]).optional(),
});

export const adminDonationUpdateSchema = donationSchema.partial().extend({
  status: z.enum(["CREATED", "TEST_PAID", "CANCELLED"]).optional(),
});

export const adminUserUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  email: z.string().email().max(320).optional(),
  phone: z.string().min(10).max(32).optional().or(z.literal("")),
  city: z.string().max(120).optional().or(z.literal("")),
  role: z.enum(["USER", "VOLUNTEER", "ADMIN"]).optional(),
});

export const adminProfileUpdateSchema = z
  .object({
    name: z.string().min(1).max(200),
    email: z.string().email().max(320),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8).max(128).optional().or(z.literal("")),
  })
  .refine((d) => !d.newPassword || Boolean(d.currentPassword?.trim()), {
    message: "Укажите текущий пароль",
    path: ["currentPassword"],
  });

export const listQuerySchema = z.object({
  status: z.string().optional(),
  q: z.string().optional(),
});
