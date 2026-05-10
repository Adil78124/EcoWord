"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";

type DonationKind = "ONCE" | "MONTHLY";

type InvoiceState = {
  donationId: string;
  invoiceNumber: string;
  status: string;
  amount: string;
  type: DonationKind;
};

export function DonationTypePicker() {
  const { t } = useI18n();
  const [kind, setKind] = useState<DonationKind>("ONCE");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [amount, setAmount] = useState("5000");
  const [loading, setLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invoice, setInvoice] = useState<InvoiceState | null>(null);

  const base =
    "rounded-xl px-8 py-4 font-label-md text-label-md transition-all";
  const activeOnce = `${base} bg-nature-gradient text-white shadow-lg shadow-primary/20 hover:opacity-90`;
  const inactiveOnce = `${base} border border-secondary/20 bg-secondary/10 text-secondary hover:bg-secondary/20`;
  const activeMonthly = `${base} bg-secondary text-on-secondary shadow-lg hover:opacity-90`;
  const inactiveMonthly = `${base} border border-secondary/20 bg-secondary/10 text-secondary hover:bg-secondary/20`;

  const statusLabel = (s: string) => {
    if (s === "CREATED") return t("donation.statusCREATED");
    if (s === "TEST_PAID") return t("donation.statusTEST_PAID");
    if (s === "CANCELLED") return t("donation.statusCANCELLED");
    return s;
  };

  const typeLabel = (ty: DonationKind) =>
    ty === "ONCE" ? t("donation.once") : t("donation.monthly");

  const createInvoice = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: donorName.trim(),
          donorEmail: donorEmail.trim(),
          amount: Number(amount),
          type: kind,
        }),
      });
      const json: {
        success?: boolean;
        message?: string;
        donationId?: string;
        invoiceNumber?: string;
        status?: string;
        amount?: string;
        type?: DonationKind;
      } = await res.json().catch(() => ({}));
      if (!res.ok || !json.success || !json.donationId || !json.invoiceNumber) {
        setError(json.message ?? t("donation.createError"));
        return;
      }
      setInvoice({
        donationId: json.donationId,
        invoiceNumber: json.invoiceNumber,
        status: json.status ?? "CREATED",
        amount: json.amount ?? String(amount),
        type: json.type ?? kind,
      });
    } catch {
      setError(t("donation.createError"));
    } finally {
      setLoading(false);
    }
  };

  const testPay = async () => {
    if (!invoice) return;
    setPayLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/donations/${invoice.donationId}/test-pay`, {
        method: "POST",
      });
      const json: { success?: boolean; status?: string; message?: string } =
        await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        setError(json.message ?? t("donation.payError"));
        return;
      }
      setInvoice((prev) =>
        prev && json.status ? { ...prev, status: json.status } : prev,
      );
    } catch {
      setError(t("donation.payError"));
    } finally {
      setPayLoading(false);
    }
  };

  const field =
    "w-full rounded-xl border border-secondary/20 bg-surface-container-low px-4 py-3 font-body-md outline-none focus:ring-2 focus:ring-secondary/20";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          className={kind === "ONCE" ? activeOnce : inactiveOnce}
          onClick={() => setKind("ONCE")}
        >
          {t("donation.once")}
        </button>
        <button
          type="button"
          className={kind === "MONTHLY" ? activeMonthly : inactiveMonthly}
          onClick={() => setKind("MONTHLY")}
        >
          {t("donation.monthly")}
        </button>
      </div>

      <div className="space-y-2">
        <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="don-name">
          {t("donation.name")} <span className="text-error">*</span>
        </label>
        <input
          id="don-name"
          className={field}
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          autoComplete="name"
        />
      </div>
      <div className="space-y-2">
        <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="don-email">
          {t("donation.email")} <span className="text-error">*</span>
        </label>
        <input
          id="don-email"
          type="email"
          className={field}
          value={donorEmail}
          onChange={(e) => setDonorEmail(e.target.value)}
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="don-amt">
          {t("donation.amount")} <span className="text-error">*</span>
        </label>
        <input
          id="don-amt"
          type="number"
          min={1}
          step={1}
          className={field}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <p className="text-label-sm text-on-surface-variant">{t("donation.amountHint")}</p>
      </div>

      {error && (
        <p className="rounded-xl bg-error-container/50 p-3 font-body-md text-on-error-container">
          {error}
        </p>
      )}

      <button
        type="button"
        disabled={loading}
        className="w-full rounded-xl border border-secondary/30 px-6 py-3 font-label-md text-label-md text-secondary transition-colors hover:bg-secondary/10 disabled:opacity-60 md:w-auto"
        onClick={() => void createInvoice()}
      >
        {loading ? t("form.sending") : t("donation.createInvoice")}
      </button>

      {invoice && (
        <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-4 font-body-md text-on-surface">
          <p className="mb-2 font-title-lg text-title-lg text-primary">{t("donation.invoice")}</p>
          <ul className="space-y-1 text-on-surface-variant">
            <li>
              <span className="font-semibold text-on-surface">{invoice.invoiceNumber}</span>
            </li>
            <li>
              {t("donation.amount")}: {invoice.amount} ₸
            </li>
            <li>
              {t("donation.type")}: {typeLabel(invoice.type)}
            </li>
            <li>
              {t("donation.status")}: {statusLabel(invoice.status)}
            </li>
          </ul>
          {invoice.status === "CREATED" && (
            <button
              type="button"
              disabled={payLoading}
              className="mt-4 w-full rounded-xl bg-secondary px-6 py-3 font-label-md text-label-md text-on-secondary transition-opacity hover:opacity-90 disabled:opacity-60 md:w-auto"
              onClick={() => void testPay()}
            >
              {payLoading ? t("form.sending") : t("donation.testPay")}
            </button>
          )}
          {invoice.status === "TEST_PAID" && (
            <p className="mt-4 font-semibold text-secondary">{t("donation.paid")}</p>
          )}
        </div>
      )}
    </div>
  );
}
