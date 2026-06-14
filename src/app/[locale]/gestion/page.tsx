"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function GestionLoginPage() {
  const locale = useLocale();
  const t = useTranslations("admin");
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error === "INACTIVE_ACCOUNT") {
      setError("Compte désactivé. Contactez l'administrateur.");
    } else if (result?.error === "RATE_LIMITED") {
      setError("Trop de tentatives. Réessayez dans 15 minutes.");
    } else if (result?.error) {
      setError("Identifiants incorrects");
    } else {
      router.push(`${locale === "fr" ? "" : `/${locale}`}/admin/appointments`);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="anim-fade-in-up w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-lg" style={{ backgroundColor: "var(--color-primary)" }}>
            ✚
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary-dark)" }}>
            {t("login_title")}
          </h1>
          <p className="mt-1 text-sm opacity-50">Accès réservé au personnel</p>
        </div>

        <form onSubmit={handleSubmit} className="card-modern p-8">
          {error && (
            <div className="anim-scale-in mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nom d'utilisateur"
              className="input-modern"
              autoComplete="username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="input-modern"
              autoComplete="current-password"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center text-base disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Connexion...
                </span>
              ) : t("login_button")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
