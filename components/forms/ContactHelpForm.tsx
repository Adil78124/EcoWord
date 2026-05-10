"use client";

import { useState, type FormEvent } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { submitContactForm } from "@/lib/api/submitContactForm";

export function ContactHelpForm() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = t("contact.errName");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = t("contact.errEmail");
    if (!subject.trim()) e.subject = t("contact.errSubject");
    if (!message.trim()) e.message = t("contact.errMessage");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setStatus("idle");
    try {
      await submitContactForm({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const field =
    "w-full rounded-xl border border-outline-variant/30 bg-background px-4 py-3 outline-none transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/20";
  const label = "font-label-md text-label-md text-on-surface-variant";

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {status === "success" && (
        <p className="rounded-xl bg-secondary-container/30 p-4 font-body-md text-on-secondary-container">
          {t("contact.success")}
        </p>
      )}
      {status === "error" && (
        <p className="rounded-xl bg-error-container/50 p-4 font-body-md text-on-error-container">
          {t("contact.error")}
        </p>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className={label} htmlFor="ch-name">
            {t("contact.name")} <span className="text-error">*</span>
          </label>
          <input
            id="ch-name"
            className={field}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((x) => ({ ...x, name: undefined }));
            }}
            placeholder={t("contact.phName")}
            type="text"
            autoComplete="name"
          />
          {errors.name && <p className="text-sm text-error">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <label className={label} htmlFor="ch-email">
            {t("contact.email")} <span className="text-error">*</span>
          </label>
          <input
            id="ch-email"
            className={field}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((x) => ({ ...x, email: undefined }));
            }}
            placeholder="name@company.kz"
            type="email"
            autoComplete="email"
          />
          {errors.email && <p className="text-sm text-error">{errors.email}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <label className={label} htmlFor="ch-subject">
          {t("contact.subject")} <span className="text-error">*</span>
        </label>
        <input
          id="ch-subject"
          className={field}
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            setErrors((x) => ({ ...x, subject: undefined }));
          }}
          placeholder={t("contact.phSubject")}
          type="text"
        />
        {errors.subject && <p className="text-sm text-error">{errors.subject}</p>}
      </div>
      <div className="space-y-2">
        <label className={label} htmlFor="ch-msg">
          {t("contact.message")} <span className="text-error">*</span>
        </label>
        <textarea
          id="ch-msg"
          className={field}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setErrors((x) => ({ ...x, message: undefined }));
          }}
          placeholder={t("contact.phMessage")}
          rows={4}
        />
        {errors.message && <p className="text-sm text-error">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="bg-nature-gradient w-full rounded-xl px-10 py-4 font-label-md text-label-md text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 md:w-fit"
      >
        {submitting ? t("form.sending") : t("contact.send")}
      </button>
    </form>
  );
}
