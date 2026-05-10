"use client";

import { useCallback, useState, type FormEvent } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import {
  submitVolunteerApplication,
  VolunteerSubmitError,
  type VolunteerFormPayload,
} from "@/lib/api/submitVolunteerApplication";

const initial: VolunteerFormPayload = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  age: "",
  direction: "",
  experience: "",
  comment: "",
};

function validateEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function validatePhone(v: string): boolean {
  const d = v.replace(/\D/g, "");
  return d.length >= 10 && d.length <= 15;
}

export function VolunteerApplicationForm() {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<VolunteerFormPayload>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof VolunteerFormPayload, string>>>(
    {},
  );
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const update = useCallback(
    <K extends keyof VolunteerFormPayload>(key: K, value: VolunteerFormPayload[K]) => {
      setData((d) => ({ ...d, [key]: value }));
      setErrors((e) => ({ ...e, [key]: undefined }));
      setStatus("idle");
    },
    [],
  );

  const validateStep = (s: number): boolean => {
    const e: Partial<Record<keyof VolunteerFormPayload, string>> = {};
    if (s === 0) {
      if (!data.fullName.trim()) e.fullName = t("vol.err.name");
      if (!validatePhone(data.phone)) e.phone = t("vol.err.phone");
      if (!validateEmail(data.email)) e.email = t("vol.err.email");
    } else if (s === 1) {
      if (!data.direction.trim()) e.direction = t("vol.err.direction");
    } else if (s === 2) {
      if (!data.city.trim()) e.city = t("vol.err.city");
      const ageNum = Number(data.age);
      if (!data.age.trim() || Number.isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        e.age = t("vol.err.age");
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((x) => Math.min(x + 1, 2));
  };

  const back = () => {
    setStatus("idle");
    setStep((x) => Math.max(x - 1, 0));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    setSubmitting(true);
    setStatus("idle");
    try {
      await submitVolunteerApplication(data);
      setStatus("success");
      setData(initial);
      setStep(0);
    } catch (err) {
      setStatus("error");
      if (err instanceof VolunteerSubmitError && err.errors) {
        const apiErr: Partial<Record<keyof VolunteerFormPayload, string>> = {};
        const pick = (k: keyof VolunteerFormPayload, api: string) => {
          const v = err.errors?.[api]?.[0];
          if (v) apiErr[k] = v;
        };
        pick("fullName", "name");
        pick("phone", "phone");
        pick("email", "email");
        pick("city", "city");
        pick("age", "age");
        pick("direction", "direction");
        pick("experience", "experience");
        pick("comment", "comment");
        if (Object.keys(apiErr).length) setErrors((prev) => ({ ...prev, ...apiErr }));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border-0 bg-surface-container-low p-3 font-body-md focus:ring-2 focus:ring-secondary/20";
  const labelClass = "ml-1 font-label-md text-label-md text-on-surface-variant";

  const stepLabels = [t("vol.step.info"), t("vol.step.skills"), t("vol.step.city")] as const;

  return (
    <div className="min-w-0 p-4 sm:p-unit-xl">
      <div className="mb-unit-lg grid grid-cols-3 gap-2">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center">
            <div
              className={
                i <= step
                  ? "flex h-8 w-8 items-center justify-center rounded-full eco-gradient font-bold text-white"
                  : "flex h-8 w-8 items-center justify-center rounded-full bg-secondary-container font-bold text-on-secondary-container"
              }
            >
              {i + 1}
            </div>
            <span
              className={
                i === step
                  ? "font-label-sm text-label-sm text-primary"
                  : "font-label-sm text-label-sm text-on-surface-variant"
              }
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {status === "success" && (
        <p className="mb-unit-md rounded-xl bg-secondary-container/30 p-4 font-body-md text-on-secondary-container">
          {t("vol.form.success")}
        </p>
      )}
      {status === "error" && (
        <p className="mb-unit-md rounded-xl bg-error-container/50 p-4 font-body-md text-on-error-container">
          {t("vol.form.error")}
        </p>
      )}

      <form className="space-y-unit-md" onSubmit={onSubmit}>
        {step === 0 && (
          <>
            <div className="space-y-2">
              <label className={labelClass} htmlFor="vf-name">
                {t("vol.label.name")} <span className="text-error">*</span>
              </label>
              <input
                id="vf-name"
                className={inputClass}
                value={data.fullName}
                onChange={(ev) => update("fullName", ev.target.value)}
                placeholder={t("vol.ph.name")}
                type="text"
                autoComplete="name"
              />
              {errors.fullName && (
                <p className="text-sm text-error">{errors.fullName}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className={labelClass} htmlFor="vf-phone">
                {t("vol.label.phone")} <span className="text-error">*</span>
              </label>
              <input
                id="vf-phone"
                className={inputClass}
                value={data.phone}
                onChange={(ev) => update("phone", ev.target.value)}
                placeholder="+7 (___) ___-__-__"
                type="tel"
                autoComplete="tel"
              />
              {errors.phone && <p className="text-sm text-error">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <label className={labelClass} htmlFor="vf-email">
                {t("vol.label.email")} <span className="text-error">*</span>
              </label>
              <input
                id="vf-email"
                className={inputClass}
                value={data.email}
                onChange={(ev) => update("email", ev.target.value)}
                placeholder="example@eco.kz"
                type="email"
                autoComplete="email"
              />
              {errors.email && <p className="text-sm text-error">{errors.email}</p>}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="space-y-2">
              <label className={labelClass} htmlFor="vf-direction">
                {t("vol.label.direction")} <span className="text-error">*</span>
              </label>
              <select
                id="vf-direction"
                className={inputClass}
                value={data.direction}
                onChange={(ev) => update("direction", ev.target.value)}
              >
                <option value="">{t("vol.opt.selectDir")}</option>
                <option value="Леса и озеленение">{t("vol.opt.forest")}</option>
                <option value="Субботники и уборка">{t("vol.opt.cleanup")}</option>
                <option value="Образование и просвещение">{t("vol.opt.edu")}</option>
                <option value="Мониторинг и данные">{t("vol.opt.monitor")}</option>
                <option value="Другое">{t("vol.opt.other")}</option>
              </select>
              {errors.direction && (
                <p className="text-sm text-error">{errors.direction}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className={labelClass} htmlFor="vf-exp">
                {t("vol.label.experience")}
              </label>
              <textarea
                id="vf-exp"
                className={`${inputClass} min-h-[100px]`}
                value={data.experience}
                onChange={(ev) => update("experience", ev.target.value)}
                placeholder={t("vol.ph.exp")}
                rows={4}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="space-y-2">
              <label className={labelClass} htmlFor="vf-city">
                {t("vol.label.city")} <span className="text-error">*</span>
              </label>
              <input
                id="vf-city"
                className={inputClass}
                value={data.city}
                onChange={(ev) => update("city", ev.target.value)}
                placeholder={t("vol.ph.city")}
                type="text"
                autoComplete="address-level2"
              />
              {errors.city && <p className="text-sm text-error">{errors.city}</p>}
            </div>
            <div className="space-y-2">
              <label className={labelClass} htmlFor="vf-age">
                {t("vol.label.age")} <span className="text-error">*</span>
              </label>
              <input
                id="vf-age"
                className={inputClass}
                value={data.age}
                onChange={(ev) => update("age", ev.target.value)}
                placeholder={t("vol.ph.age")}
                type="number"
                min={1}
                max={120}
              />
              {errors.age && <p className="text-sm text-error">{errors.age}</p>}
            </div>
            <div className="space-y-2">
              <label className={labelClass} htmlFor="vf-comment">
                {t("vol.label.comment")}
              </label>
              <textarea
                id="vf-comment"
                className={`${inputClass} min-h-[100px]`}
                value={data.comment}
                onChange={(ev) => update("comment", ev.target.value)}
                placeholder={t("vol.ph.comment")}
                rows={4}
              />
            </div>
          </>
        )}

        <div className="flex flex-col gap-unit-md pt-unit-md sm:flex-row sm:justify-end">
          {step > 0 && (
            <button
              type="button"
              className="w-full rounded-xl border border-secondary/30 py-unit-md font-title-lg text-title-lg text-secondary transition-all hover:bg-secondary/5 sm:w-auto sm:px-8"
              onClick={back}
              disabled={submitting}
            >
              {t("form.back")}
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              className="eco-gradient w-full rounded-xl py-unit-md font-title-lg text-title-lg text-on-primary shadow-lg shadow-secondary/20 transition-all hover:opacity-90 sm:w-auto sm:px-8"
              onClick={next}
              disabled={submitting}
            >
              {t("form.next")}
            </button>
          ) : (
            <button
              type="submit"
              className="eco-gradient w-full rounded-xl py-unit-md font-title-lg text-title-lg text-on-primary shadow-lg shadow-secondary/20 transition-all hover:opacity-90 disabled:opacity-60 sm:w-auto sm:px-8"
              disabled={submitting}
            >
              {submitting ? t("form.sending") : t("form.submit")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
