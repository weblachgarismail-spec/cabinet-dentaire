import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ToastProvider } from "@/components/ui/Toast";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function AdminLayout({ children, params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(locale === "fr" ? "/gestion" : `/${locale}/gestion`);
  }

  const t = await getTranslations({ locale, namespace: "admin" });
  const role = (session?.user as { role?: string })?.role || "";
  const themeColor = (session?.user as { themeColor?: string })?.themeColor || "#8B5CF6";
  const displayName = (session?.user as { displayName?: string })?.displayName || session.user?.name || "";

  return (
    <ToastProvider>
    <div className="mx-auto max-w-7xl px-4 py-8" style={{ "--theme-color": themeColor } as React.CSSProperties}>
      {session && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b pb-4 text-xs" style={{ borderColor: "oklch(88% 0.01 340)" }}>
          <div className="flex items-center gap-2">
            <span className="rounded-full px-2.5 py-0.5 font-medium text-white" style={{ backgroundColor: role === "SUPER_ADMIN" ? "#8b5cf6" : role === "SECRETARY" ? "#3b82f6" : "#10b981" }}>
              {role === "SUPER_ADMIN" ? t("role_super_admin") : role === "SECRETARY" ? t("role_secretary") : t("role_doctor")}
            </span>
            <span className="opacity-60">{displayName}</span>
          </div>
          <a href={`/${locale}/admin/profile`} className="font-medium underline transition-opacity hover:opacity-70" style={{ color: "var(--color-primary)" }}>
            {t("profile_nav")}
          </a>
        </div>
      )}
      {children}
    </div>
    </ToastProvider>
  );
}
