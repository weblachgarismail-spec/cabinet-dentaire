"use client";

import { useState, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CalendarPicker } from "@/components/booking/CalendarPicker";

export function WhatsAppButton() {
  const locale = useLocale();
  const t = useTranslations("booking");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const reset = useCallback(() => {
    setDate(null);
    setName("");
    setPhone("");
    setConsent(false);
    setErrors({});
    setDone(false);
    setSubmitting(false);
  }, []);

  const submit = async () => {
    const errs: Record<string, string> = {};
    if (!date) errs.date = t("error_date");
    if (!name.trim()) errs.name = t("error_name");
    if (!phone.trim()) errs.phone = t("error_phone");
    if (!consent) errs.consent = t("error_consent");
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, patientName: name.trim(), phone: phone.trim() }),
      });
      if (!res.ok) throw new Error("Booking failed");
      setDone(true);
    } catch {
      setErrors({ submit: t("error_submit") });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
        style={{ backgroundColor: "var(--color-primary)" }}
        aria-label={locale === "ar" ? "احجز موعدًا" : "Prendre rendez-vous"}
      >
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40" onClick={() => { setOpen(false); reset(); }}>
          <div className="mx-4 w-full max-w-md rounded-xl p-6 shadow-xl" style={{ backgroundColor: "#fff" }} onClick={(e) => e.stopPropagation()}>
            {done ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: "oklch(90% 0.1 145)" }}>
                  <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--color-primary-dark)" }}>{t("success_title")}</h3>
                <p className="mt-2 text-sm opacity-70">{t("callback_notice")}</p>
                <button onClick={() => { setOpen(false); reset(); }} className="btn-primary mt-6">{t("close")}</button>
              </div>
            ) : (
              <>
                <h3 className="mb-4 text-lg font-semibold" style={{ color: "var(--color-primary-dark)" }}>
                  {locale === "ar" ? "طلب موعد" : "Demande de rendez-vous"}
                </h3>

                <div className="mb-1">
                  <label className="mb-1 block text-xs font-medium opacity-70">{t("date")}</label>
                  <CalendarPicker selected={date} onSelect={(d) => { setDate(d); setErrors((e) => ({ ...e, date: "" })); }} />
                  {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
                </div>

                <div className="mt-4">
                  <label className="mb-1 block text-xs font-medium opacity-70">{t("name")}</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("name_placeholder")} className="w-full rounded-lg border p-2 text-sm outline-none" style={{ borderColor: errors.name ? "#ef4444" : "#d1d5db" }} />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div className="mt-4">
                  <label className="mb-1 block text-xs font-medium opacity-70">{t("phone")}</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("phone_placeholder")} type="tel" className="w-full rounded-lg border p-2 text-sm outline-none" style={{ borderColor: errors.phone ? "#ef4444" : "#d1d5db" }} />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div className="mt-4 flex items-start gap-2">
                  <input id="fb-consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
                  <label htmlFor="fb-consent" className="text-xs opacity-70">{t("consent")}</label>
                </div>
                {errors.consent && <p className="mt-1 text-xs text-red-500">{errors.consent}</p>}

                {errors.submit && <p className="mt-2 text-sm text-red-500">{errors.submit}</p>}

                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={() => { setOpen(false); reset(); }} className="rounded-lg px-4 py-2 text-sm font-medium opacity-60 hover:opacity-100">{t("cancel")}</button>
                  <button onClick={submit} disabled={submitting} className="btn-primary" style={{ opacity: submitting ? 0.6 : 1 }}>
                    {submitting ? (locale === "ar" ? "جاري الإرسال..." : "Envoi...") : (locale === "ar" ? "إرسال" : "Envoyer")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
