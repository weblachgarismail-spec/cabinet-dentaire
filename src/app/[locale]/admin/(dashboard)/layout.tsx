import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ToastProvider } from "@/components/ui/Toast";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function AdminLayout({ children, params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(locale === "fr" ? "/gestion" : `/${locale}/gestion`);
  }

  const toothSvg = (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--color-primary)" }}>
      <path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/>
    </svg>
  );

  return (
    <ToastProvider>
    <div className="flex min-h-screen">
      <AdminSidebar clinicName="Cabinet Dentaire" logoSvg={toothSvg} />
      <main className="flex-1 overflow-x-auto px-4 py-8 md:px-8">{children}</main>
    </div>
    </ToastProvider>
  );
}
