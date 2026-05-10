export type AdminFetchResult<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; message: string };

export async function adminJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<AdminFetchResult<T>> {
  const headers = new Headers(init?.headers);
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const res = await fetch(input, {
    credentials: "include",
    ...init,
    headers,
  });
  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  const obj =
    body && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {};
  if (!res.ok) {
    const message =
      typeof obj.message === "string" ? obj.message : `Ошибка ${res.status}`;
    return { ok: false, status: res.status, message };
  }
  return { ok: true, status: res.status, data: body as T };
}
