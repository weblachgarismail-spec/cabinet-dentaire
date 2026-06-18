import { getTranslations } from "next-intl/server";
import Link from "next/link";

type Props = { locale: string };

export async function Footer({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <footer className="relative overflow-hidden py-12 text-center text-sm" style={{ backgroundColor: "oklch(18% 0.02 190)", color: "#fff" }}>
      <div className="anim-float absolute -right-20 -top-20 opacity-[0.03]">
        <svg viewBox="0 0 24 24" className="h-[200px] w-[200px]" fill="currentColor"><path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/></svg>
      </div>
      <div className="anim-float absolute -bottom-20 -left-20 opacity-[0.03]" style={{ animationDelay: "2s" }}>
        <svg viewBox="0 0 24 24" className="h-[200px] w-[200px]" fill="currentColor"><path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/></svg>
      </div>
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mb-6 flex flex-wrap justify-center gap-x-8 gap-y-2">
          <Link href="/about" className="opacity-70 transition-opacity hover:opacity-100">À propos</Link>
          <Link href="/services" className="opacity-70 transition-opacity hover:opacity-100">Services</Link>
          <Link href="/booking" className="opacity-70 transition-opacity hover:opacity-100">Rendez-vous</Link>
          <Link href="/contact" className="opacity-70 transition-opacity hover:opacity-100">Contact</Link>
        </div>
        <div className="mb-6 flex justify-center gap-6">
          <Link href="/legal" className="opacity-60 underline transition-opacity hover:opacity-100">{t("legal")}</Link>
          <Link href="/privacy" className="opacity-60 underline transition-opacity hover:opacity-100">{t("privacy")}</Link>
          <Link href="/gestion" className="opacity-40 underline transition-opacity hover:opacity-80 text-xs">Gestion</Link>
        </div>
        <p className="opacity-60">{t("rights")}</p>
        <p className="mt-2 font-semibold opacity-80">{t("emergency")}</p>
      </div>
    </footer>
  );
}
