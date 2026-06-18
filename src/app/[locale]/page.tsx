import { getTranslations } from "next-intl/server";
import Link from "next/link";

type Props = { params: Promise<{ locale: string }> };

type ServiceItem = { title: string; desc: string; slug: string; img: string };
type FeatureItem = { title: string; desc: string; img: string };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tServices = await getTranslations({ locale, namespace: "services" });

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden dental-pattern">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--color-primary-light) 0%, oklch(95% 0.02 190) 50%, #fff 100%)" }} />
        <div className="anim-blob absolute -left-32 -top-32 h-96 w-96 opacity-20" style={{ background: "var(--color-primary)" }} />
        <div className="anim-blob absolute -bottom-32 -right-32 h-96 w-96 opacity-15" style={{ background: "var(--color-primary-dark)", animationDelay: "-4s" }} />
        <div className="anim-blob absolute left-1/3 top-1/3 h-64 w-64 opacity-10" style={{ background: "var(--color-accent)", animationDelay: "-2s" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 80% 20%, oklch(60% 0.12 190 / 0.06) 0%, transparent 50%)" }} />
        <div className="anim-float absolute -right-10 top-20 opacity-[0.04]" style={{ animationDelay: "0.5s" }}>
          <svg viewBox="0 0 24 24" className="h-[180px] w-[180px] anim-tooth-rotate" fill="none" stroke="var(--color-primary)" strokeWidth="1.5">
            <path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/>
          </svg>
        </div>
        <div className="anim-float absolute -left-10 bottom-20 opacity-[0.04]" style={{ animationDelay: "2.5s" }}>
          <svg viewBox="0 0 24 24" className="h-[220px] w-[220px]" fill="none" stroke="var(--color-primary-dark)" strokeWidth="1.5">
            <path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/>
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <div className="anim-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold tracking-wide uppercase shadow-sm" style={{ backgroundColor: "oklch(60% 0.12 190 / 0.1)", color: "var(--color-primary)" }}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/></svg>
            Cabinet Dentaire {locale === "fr" ? "[ville]" : "[مدينة]"}
          </div>
          <h1 className="anim-fade-in-up anim-delay-1 mb-6 text-4xl font-extrabold leading-tight md:text-6xl" style={{ color: "var(--color-primary-dark)" }}>
            {t("title")}
          </h1>
          <p className="anim-fade-in-up anim-delay-2 mx-auto mb-4 max-w-xl text-lg leading-relaxed md:text-xl" style={{ color: "oklch(40% 0.02 190 / 0.8)" }}>
            {t("subtitle")}
          </p>
          <p className="anim-fade-in-up anim-delay-2 mx-auto mb-10 max-w-2xl leading-relaxed opacity-70">
            {t("description")}
          </p>
          <div className="anim-fade-in-up anim-delay-3 flex flex-wrap justify-center gap-4">
            <Link href={locale === "fr" ? "/booking" : `/${locale}/booking`} className="btn-primary text-base">
              {t("cta_booking")}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href={locale === "fr" ? "/contact" : `/${locale}/contact`} className="btn-outline text-base">
              {t("cta_contact")}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="anim-fade-in-up mb-14 text-center">
          <span className="mb-2 inline-block text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--color-primary)" }}>Pourquoi nous choisir</span>
          <h2 className="text-3xl font-bold md:text-4xl" style={{ color: "var(--color-primary-dark)" }}>
            {t("features_title")}
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {(t.raw("features") as FeatureItem[]).map((f, i) => (
            <div key={i} className={`anim-fade-in-up anim-delay-${i + 1} card-hover group overflow-hidden rounded-2xl`} style={{ backgroundColor: "#fff" }}>
              <div className="relative h-52 overflow-hidden">
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, oklch(0% 0 0 / 0.3))", zIndex: 1 }} />
                <img src={f.img} alt={f.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
                  {i + 1}
                </div>
                <h3 className="mb-3 text-xl font-semibold" style={{ color: "var(--color-primary-dark)" }}>{f.title}</h3>
                <p className="leading-relaxed opacity-75">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative overflow-hidden px-4 py-20" style={{ background: "linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))" }}>
        <div className="anim-float absolute -right-16 -top-16 opacity-[0.04]">
          <svg viewBox="0 0 24 24" className="h-[200px] w-[200px]" fill="currentColor" style={{ color: "#fff" }}><path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/></svg>
        </div>
        <div className="anim-float absolute -bottom-20 -left-20 opacity-[0.04]" style={{ animationDelay: "2s" }}>
          <svg viewBox="0 0 24 24" className="h-[250px] w-[250px]" fill="currentColor" style={{ color: "#fff" }}><path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/></svg>
        </div>
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {(t.raw("stats") as Array<{ value: string; label: string }>).map((s, i) => (
              <div key={i} className={`anim-fade-in-up text-center`} style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="text-4xl font-extrabold text-white md:text-5xl">{s.value}</div>
                <div className="mt-2 text-sm font-medium text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="anim-fade-in-up mb-14 text-center">
          <span className="mb-2 inline-block text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--color-primary)" }}>Nos services</span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: "var(--color-primary-dark)" }}>
            {t("services_title")}
          </h2>
          <p className="mx-auto max-w-xl leading-relaxed opacity-70">{t("services_desc")}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {(tServices.raw("items") as ServiceItem[]).slice(0, 3).map((item, i) => (
            <Link key={item.slug} href={`/${locale}/services/${item.slug}`} className={`anim-fade-in-up anim-delay-${i + 1} card-hover group overflow-hidden rounded-2xl`} style={{ backgroundColor: "#fff" }}>
              <div className="relative h-44 overflow-hidden">
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, oklch(0% 0 0 / 0.3))", zIndex: 1 }} />
                <img src={item.img} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="mb-2 font-semibold" style={{ color: "var(--color-primary)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed opacity-70">{item.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--color-primary)" }}>
                  En savoir plus <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="anim-fade-in-up mt-10 text-center">
          <Link href={`/${locale}/services`} className="btn-outline">
            {locale === "fr" ? "Voir tous nos services" : "عرض جميع الخدمات"}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden px-4 py-24 text-center" style={{ background: "linear-gradient(135deg, oklch(92% 0.02 190), #fff)" }}>
        <div className="anim-float absolute -right-10 -top-10 opacity-[0.04]">
          <svg viewBox="0 0 24 24" className="h-[150px] w-[150px]" fill="none" stroke="var(--color-primary)" strokeWidth="1.5"><path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/></svg>
        </div>
        <div className="anim-float absolute -bottom-10 -left-10 opacity-[0.04]" style={{ animationDelay: "2.5s" }}>
          <svg viewBox="0 0 24 24" className="h-[180px] w-[180px]" fill="none" stroke="var(--color-primary-dark)" strokeWidth="1.5"><path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/></svg>
        </div>
        <div className="anim-blob absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]" style={{ background: "var(--color-primary-dark)" }} />
        <div className="relative mx-auto max-w-xl">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: "var(--color-primary-dark)" }}>{t("cta_section_title")}</h2>
          <p className="mb-8 text-lg opacity-70">{t("cta_section_desc")}</p>
          <Link
            href={locale === "fr" ? "/booking" : `/${locale}/booking`}
            className="btn-primary text-lg"
          >
            {t("cta_booking")}
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
