import { z } from "zod";

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

export const listQuerySchema = z.object({
  status: z.string().optional(),
  q: z.string().optional(),
});
