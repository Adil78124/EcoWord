export type ContactFormPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function submitContactForm(data: ContactFormPayload): Promise<{ id: string }> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json: unknown = await res.json().catch(() => ({}));
  const obj = json as { success?: boolean; id?: string; message?: string };
  if (!res.ok || !obj.success || !obj.id) {
    throw new Error(obj.message ?? "Ошибка отправки сообщения");
  }
  return { id: obj.id };
}
