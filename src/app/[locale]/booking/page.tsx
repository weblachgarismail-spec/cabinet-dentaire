"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { CalendarPicker } from "@/components/booking/CalendarPicker";
import { TimeSlotPicker } from "@/components/booking/TimeSlotPicker";

export default function BookingPage() {
  const locale = useLocale();
  const t = useTranslations("booking");
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const rtl = locale === "ar";

  const handleDateSelect = useCallback(async (d: string) => {
    setDate(d);
    setTime(null);
    setSlotsLoading(true);
    setSubmitError("");
    try {
      const res = await fetch(`/api/slots?date=${d}`);
      if (!res.ok) throw new Error("Failed to load slots");
      const data = await res.json();
      setSlots(data.slots);
      setStep(2);
    } catch {
      setSubmitError(t("slot_unavailable"));
    } finally {
      setSlotsLoading(false);
    }
  }, [t]);

  const handleSubmit = useCallback(async () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = t("form_name_error");
    if (!phone.trim() || phone.trim().length < 7) errs.phone = t("form_phone_error");
    if (!city.trim()) errs.city = t("form_city_error");
    if (!consent) errs.consent = t("form_consent_error");
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, patientName: name.trim(), phone: phone.trim(), email: email.trim() || undefined, city: city.trim() || undefined, notes: notes.trim() || undefined }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error === "SLOT_UNAVAILABLE" ? "conflict" : "generic");
      }

      const params = new URLSearchParams({ date: date!, time: time! });
      router.push(`${locale === "fr" ? "" : `/${locale}`}/booking/confirm?${params}`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      setSubmitError(msg === "conflict" ? t("conflict_error") : t("slot_unavailable"));
    } finally {
      setSubmitting(false);
    }
  }, [name, phone, email, city, notes, consent, date, time, t, router, locale]);

  return (
    <div className="relative min-h-screen" style={{ background: "linear-gradient(180deg, oklch(95% 0.02 190) 0%, #fff 100%)" }}>
      {/* Hero */}
      <div className="relative overflow-hidden px-4 py-16 text-center">
        <div className="anim-float absolute -right-10 -top-10 opacity-[0.03]">
          <svg viewBox="0 0 24 24" className="h-[120px] w-[120px]" fill="var(--color-primary)" stroke="none"><path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/></svg>
        </div>
        <div className="relative mx-auto max-w-xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase shadow-sm" style={{ backgroundColor: "oklch(60% 0.12 190 / 0.1)", color: "var(--color-primary)" }}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/></svg>
            {t("title")}
          </div>
          <h1 className="mb-2 text-3xl font-bold md:text-4xl" style={{ color: "var(--color-primary-dark)" }}>
            {t("title")}
          </h1>
          <p className="text-sm opacity-60">
            {step === 1 ? "Choisissez une date disponible" : step === 2 ? "Sélectionnez un créneau" : "Complétez vos informations"}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-4 pb-20">
        {submitError && (
          <div className="mb-6 anim-scale-in rounded-xl border border-red-200 p-4 text-center text-sm text-red-700" style={{ backgroundColor: "#fef2f2" }}>
            {submitError}
          </div>
        )}

        {/* Progress */}
        <div className="mb-10 flex items-center justify-center gap-3">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${step === s ? "scale-110 shadow-lg" : step > s ? "scale-100" : "opacity-30"}`}
                style={{
                  backgroundColor: step >= s ? "var(--color-primary)" : "oklch(88% 0.01 190)",
                  color: step >= s ? "#fff" : "oklch(60% 0.02 190)",
                }}
              >
                {step > s ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                ) : s}
              </div>
              {s < 3 && (
                <div className="h-0.5 w-10 rounded transition-all duration-500" style={{ backgroundColor: step > s ? "var(--color-primary)" : "oklch(88% 0.01 190)" }} />
              )}
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border p-6 shadow-sm md:p-8" style={{ backgroundColor: "#fff", borderColor: "oklch(90% 0.01 190)" }}>
          <div key={step} className={`${step === 1 ? "" : step === 2 ? "anim-slide-in-right" : "anim-slide-in-left"}`}>
            {step >= 1 && (
              <div>
                <h2 className="mb-6 text-center text-xl font-semibold" style={{ color: "var(--color-primary-dark)" }}>{t("step1_title")}</h2>
                <CalendarPicker selected={date} onSelect={handleDateSelect} />
              </div>
            )}

            {step >= 2 && (
              <div>
                <h2 className="mb-6 text-center text-xl font-semibold" style={{ color: "var(--color-primary-dark)" }}>{t("step2_title")}</h2>
                <TimeSlotPicker slots={slots} selected={time} selectedDate={date} onSelect={(t) => { setTime(t); setStep(3); }} loading={slotsLoading} />
              </div>
            )}
          </div>

          {step >= 3 && time && (
            <div>
              <h2 className="mb-2 text-center text-xl font-semibold" style={{ color: "var(--color-primary-dark)" }}>{t("step3_title")}</h2>
              <div className="mb-6 rounded-xl p-4 text-center" style={{ backgroundColor: "oklch(55% 0.12 190 / 0.08)" }}>
                <p className="text-sm opacity-70">{t("slot_selected")}</p>
                <p className="mt-1 text-lg font-bold" style={{ color: "var(--color-primary)" }}>{date} — {time}</p>
              </div>

              <div className="space-y-4">
                {(["name", "phone", "email", "city"] as const).map((field) => (
                  <div key={field}>
                    {field === "name" && (
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("form_name")} className="input-modern" style={{ borderColor: errors.name ? "#ef4444" : undefined }} />
                    )}
                    {field === "phone" && (
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("form_phone")} className="input-modern" style={{ borderColor: errors.phone ? "#ef4444" : undefined }} />
                    )}
                    {field === "email" && (
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("form_email")} className="input-modern" />
                    )}
                    {field === "city" && (
                      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder={t("form_city")} className="input-modern" style={{ borderColor: errors.city ? "#ef4444" : undefined }} />
                    )}
                    {errors[field] && <p className="mt-1 text-xs text-red-500">{errors[field]}</p>}
                  </div>
                ))}

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t("form_notes")}
                  rows={3}
                  className="input-modern resize-none"
                />

                <label className="flex cursor-pointer items-start gap-2.5 text-xs opacity-70 hover:opacity-100">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 rounded" style={{ accentColor: "var(--color-primary)" }} />
                  <span>{t("form_consent")} <Link href="/privacy" className="font-medium underline">{t("form_consent_link")}</Link></span>
                </label>
                {errors.consent && <p className="text-xs text-red-500">{errors.consent}</p>}

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-primary w-full justify-center text-base"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      {t("form_submit")}...
                    </span>
                  ) : t("form_submit")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
