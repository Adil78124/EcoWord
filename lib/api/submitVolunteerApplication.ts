import type { VolunteerFormPayload } from "./types";

export type { VolunteerFormPayload };

export type VolunteerSubmitErrorBody = {
  message?: string;
  errors?: Record<string, string[]>;
};

export class VolunteerSubmitError extends Error {
  readonly errors?: Record<string, string[]>;

  constructor(message: string, errors?: Record<string, string[]>) {
    super(message);
    this.name = "VolunteerSubmitError";
    this.errors = errors;
  }
}

export async function submitVolunteerApplication(
  data: VolunteerFormPayload,
): Promise<{ id: string }> {
  const res = await fetch("/api/volunteers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.fullName.trim(),
      phone: data.phone.trim(),
      email: data.email.trim(),
      city: data.city.trim(),
      age: data.age,
      direction: data.direction,
      experience: data.experience ?? "",
      comment: data.comment ?? "",
    }),
  });
  const json: unknown = await res.json().catch(() => ({}));
  const obj = json as { success?: boolean; id?: string; message?: string; errors?: Record<string, string[]> };
  if (!res.ok || !obj.success || !obj.id) {
    throw new VolunteerSubmitError(obj.message ?? "Ошибка отправки заявки", obj.errors);
  }
  return { id: obj.id };
}
