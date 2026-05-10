import { ZodError } from "zod";

export type ApiErrorBody = {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
};

export type ApiSuccess<T> = { success: true } & T;

export function jsonError(
  message: string,
  status: number,
  errors?: Record<string, string[]>,
): Response {
  const body: ApiErrorBody = { success: false, message, errors };
  return Response.json(body, { status });
}

export function zodToFieldErrors(err: ZodError): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const i of err.issues) {
    const path = i.path.join(".") || "_root";
    if (!out[path]) out[path] = [];
    out[path].push(i.message);
  }
  return out;
}
