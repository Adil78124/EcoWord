import { z } from "zod";

export const volunteerApplicationSchema = z.object({
  name: z.string().min(1, "Укажите имя").max(200),
  phone: z.string().min(10, "Укажите телефон").max(32),
  email: z.string().email("Некорректный email").max(320),
  city: z.string().min(1, "Укажите город").max(120),
  age: z.coerce.number().int().min(1).max(120),
  direction: z.string().min(1, "Укажите направление").max(200),
  experience: z.string().max(5000).optional().default(""),
  comment: z.string().max(5000).optional().default(""),
});

export const contactMessageSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  subject: z.string().min(1).max(500),
  message: z.string().min(1).max(20000),
});

export const registerSchema = z
  .object({
    name: z.string().min(1).max(200),
    email: z.string().email().max(320),
    phone: z.string().min(10).max(32).optional().or(z.literal("")),
    city: z.string().max(120).optional().or(z.literal("")),
    password: z.string().min(8, "Минимум 8 символов").max(128),
    confirmPassword: z.string().min(1),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const donationSchema = z.object({
  donorName: z.string().min(1).max(200),
  donorEmail: z.string().email().max(320),
  amount: z.coerce.number().positive().max(1_000_000_000),
  type: z.enum(["ONCE", "MONTHLY"]),
});

export type VolunteerApplicationInput = z.infer<typeof volunteerApplicationSchema>;
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type DonationInput = z.infer<typeof donationSchema>;
