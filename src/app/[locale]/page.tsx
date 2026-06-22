import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import BookingModal from "@/components/BookingModal";
import { RealisationsGallery } from "@/components/RealisationsGallery";

type Props = { params: Promise<{ locale: string }> };

type ServiceItem = { title: string; desc: string; slug: string; img: string };
type FeatureItem = { title: string; desc: string; img: string };
type FaqItem = { question: string; answer: string };
type TestimonialItem = { name: string; text: string; rating: number };
type RealisationItem = { title: string; desc: string; badge: string; imgBefore: string; imgAfter: string };
type WhyUsItem = { title: string; desc: string; icon: string };

const iconMap: Record<string, React.ReactNode> = {
  graduation: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  ),
  family: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  tech: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  speed: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tServices = await getTranslations({ locale, namespace: "services" });
  const tAbout = await getTranslations({ locale, namespace: "about" });
  const rtl = locale === "ar";

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[85vh] overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(95% 0.02 190) 0%, #fff 50%, oklch(97% 0.015 190) 100%)" }}>
        <div className="anim-float absolute -right-20 -top-20 opacity-[0.03]">
          <svg viewBox="0 0 24 24" className="h-[260px] w-[260px]" fill="var(--color-primary)" stroke="none"><path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/></svg>
        </div>
        <div className="anim-float absolute -bottom-24 -left-24 opacity-[0.02]" style={{ animationDelay: "2s" }}>
          <svg viewBox="0 0 24 24" className="h-[300px] w-[300px]" fill="var(--color-primary-dark)" stroke="none"><path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/></svg>
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-20 md:flex-row md:py-28">
          <div className={`flex-1 text-center ${rtl ? "md:text-right" : "md:text-left"} ${rtl ? "md:order-2" : ""}`}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase shadow-sm" style={{ backgroundColor: "oklch(60% 0.12 190 / 0.1)", color: "var(--color-primary)" }}>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/></svg>
              Cabinet Dentaire
            </div>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl" style={{ color: "var(--color-primary-dark)" }}>
              {t("title")}
            </h1>

            <p className="mx-auto mb-3 max-w-lg text-lg font-medium md:text-xl" style={{ color: "var(--color-primary)" }}>
              {t("subtitle")}
            </p>
            <p className="mx-auto mb-8 max-w-xl leading-relaxed opacity-70">
              {t("description")}
            </p>

            <div className="mb-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <BookingModal label={t("cta_booking")} className="btn-primary text-base" />
              <a href={`https://wa.me/212661250137?text=${encodeURIComponent("Bonjour, je souhaite prendre rendez-vous à la Clinique Dentaire.")}`} target="_blank" rel="noopener noreferrer"
                className="btn-outline text-base">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Direct
              </a>
            </div>

            <div className={`flex flex-wrap items-center gap-6 text-sm ${rtl ? "md:justify-end" : ""} justify-center md:justify-start`}>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className="h-4 w-4" viewBox="0 0 20 20" fill="oklch(70% 0.2 80)"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <span className="font-semibold opacity-80">4.9/5</span>
              </div>
              <span className="opacity-50">•</span>
              <span className="opacity-70">15+ {locale === "fr" ? "ans d'expérience" : "سنوات من الخبرة"}</span>
              <span className="opacity-50">•</span>
              <span className="opacity-70">5000+ {locale === "fr" ? "patients" : "مريض"}</span>
            </div>
          </div>

          <div className={`flex-1 ${rtl ? "md:order-1" : ""}`}>
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] opacity-30 blur-xl" style={{ background: "var(--color-primary)" }} />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=85"
                  alt="Cabinet Dentaire"
                  className="h-full w-full object-cover"
                  style={{ aspectRatio: "4/5", minHeight: "400px" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, oklch(0% 0 0 / 0.4) 0%, transparent 50%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-lg font-bold">Dr. [Nom]</p>
                  <p className="text-sm text-white/80">{locale === "fr" ? "Chirurgien-Dentiste" : "طبيب أسنان"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative overflow-hidden px-4 py-16" style={{ background: "linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))" }}>
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {(t.raw("stats") as Array<{ value: string; label: string }>).map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-extrabold text-white md:text-5xl">{s.value}</div>
                <div className="mt-2 text-sm font-medium text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RÉALISATIONS ─── */}
      <section className="px-4 py-24" style={{ backgroundColor: "oklch(97% 0.015 190 / 0.5)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <span className="mb-2 inline-block text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--color-primary)" }}>
              {locale === "fr" ? "Réalisations" : "إنجازاتنا"}
            </span>
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: "var(--color-primary-dark)" }}>
              {locale === "fr" ? "Nos Réalisations" : "إنجازاتنا"}
            </h2>
            <p className="mx-auto mt-2 max-w-2xl leading-relaxed opacity-70">
              {locale === "fr"
                ? "Transformations Réelles, Résultats Exceptionnels — Découvrez les sourires que nous avons eu le privilège de restaurer."
                : "تحولات حقيقية، نتائج استثنائية — اكتشف الابتسامات التي كان لنا شرف استعادتها."}
            </p>
          </div>
          <RealisationsGallery items={t.raw("realisations") as RealisationItem[]} locale={locale} />
        </div>
      </section>

      {/* ─── POURQUOI NOUS CHOISIR ─── */}
      <section className="px-4 py-24" style={{ backgroundColor: "#fff" }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <span className="mb-2 inline-block text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--color-primary)" }}>
              {locale === "fr" ? "Pourquoi Nous ?" : "لماذا نحن؟"}
            </span>
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: "var(--color-primary-dark)" }}>
              {(t.raw("whyus") as { title: string }).title}
            </h2>
            {locale === "fr" ? (
              <p className="mx-auto mt-2 max-w-2xl leading-relaxed opacity-70">
                L&apos;Excellence Qui Fait la Différence
              </p>
            ) : (
              <p className="mx-auto mt-2 max-w-2xl leading-relaxed opacity-70">
                التميز الذي يصنع الفرق
              </p>
            )}
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {((t.raw("whyus") as { items: WhyUsItem[] }).items).map((item, i) => (
              <div key={i} className="card-hover rounded-2xl p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: "#fff", border: "1px solid oklch(93% 0.01 190)" }}>
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: "oklch(60% 0.12 190 / 0.1)", color: "var(--color-primary)" }}>
                  {iconMap[item.icon]}
                </div>
                <h3 className="mb-3 text-lg font-bold" style={{ color: "var(--color-primary-dark)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed opacity-70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DOCTOR ─── */}
      <section className="px-4 py-24" style={{ backgroundColor: "oklch(97% 0.015 190 / 0.5)" }}>
        <div className="mx-auto max-w-6xl">
          <div className={`flex flex-col items-center gap-12 md:flex-row ${rtl ? "md:flex-row-reverse" : ""}`}>
            <div className="flex-1">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-2 rounded-2xl opacity-20" style={{ background: "var(--color-primary)" }} />
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=85"
                    alt={tAbout("photo_alt")}
                    className="w-full object-cover"
                    style={{ aspectRatio: "3/4" }}
                  />
                </div>
              </div>
            </div>
            <div className={`flex-1 text-center ${rtl ? "md:text-right" : "md:text-left"}`}>
              <span className="mb-2 inline-block text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--color-primary)" }}>
                {locale === "fr" ? "Votre Chirurgien-Dentiste" : "طبيب أسنانك"}
              </span>
              <h2 className="mb-2 text-3xl font-bold md:text-4xl" style={{ color: "var(--color-primary-dark)" }}>
                {tAbout("title")}
              </h2>
              <p className="mb-6 text-lg" style={{ color: "var(--color-primary)" }}>
                {tAbout("subtitle")}
              </p>
              <div className="space-y-3 text-sm leading-relaxed opacity-75">
                {(tAbout.raw("paragraphs") as string[]).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--color-primary-dark)" }}>
                  {tAbout("diplomas_title")}
                </h3>
                <ul className={`space-y-1.5 ${rtl ? "md:text-right" : ""}`}>
                  {(tAbout.raw("diplomas") as string[]).map((d, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="var(--color-primary)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <BookingModal label={t("cta_booking")} className="btn-primary text-base" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="mx-auto max-w-6xl px-4 py-24" style={{ backgroundColor: "#fff" }}>
        <div className="mb-14 text-center">
          <span className="mb-2 inline-block text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--color-primary)" }}>Nos services</span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: "var(--color-primary-dark)" }}>
            {t("services_title")}
          </h2>
          <p className="mx-auto max-w-xl leading-relaxed opacity-70">{t("services_desc")}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {(tServices.raw("items") as ServiceItem[]).slice(0, 6).map((item, i) => (
            <Link key={item.slug} href={`/${locale}/services/${item.slug}`} className="card-hover group overflow-hidden rounded-2xl shadow-sm" style={{ backgroundColor: "#fff", border: "1px solid oklch(93% 0.01 190)" }}>
              <div className="relative h-44 overflow-hidden">
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, oklch(0% 0 0 / 0.3))", zIndex: 1 }} />
                <img src={item.img} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="mb-2 font-semibold" style={{ color: "var(--color-primary)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed opacity-70">{item.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--color-primary)" }}>
                  {locale === "fr" ? "En savoir plus" : "اقرأ المزيد"} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href={`/${locale}/services`} className="btn-outline">
            {locale === "fr" ? "Voir tous nos services" : "عرض جميع الخدمات"}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={rtl ? "M7 16l-4-4m0 0l4-4m-4 4h18" : "M17 8l4 4m0 0l-4 4m4-4H3"} /></svg>
          </Link>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="px-4 py-24" style={{ backgroundColor: "oklch(97% 0.015 190 / 0.3)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <span className="mb-2 inline-block text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--color-primary)" }}>
              {locale === "fr" ? "Témoignages" : "شهادات"}
            </span>
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: "var(--color-primary-dark)" }}>
              {locale === "fr" ? "Ce Que Disent Nos Patients" : "ماذا يقول مرضانا"}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {(t.raw("testimonials") as TestimonialItem[]).map((item, i) => (
              <div key={i} className="card-hover flex flex-col rounded-2xl p-6 shadow-sm" style={{ backgroundColor: "#fff", border: "1px solid oklch(90% 0.01 190)" }}>
                <div className="mb-3 flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className="h-4 w-4" viewBox="0 0 20 20" fill={s <= item.rating ? "oklch(70% 0.2 80)" : "oklch(90% 0 0 / 0.3)"}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed opacity-80">"{item.text}"</p>
                <div className="mt-auto flex items-center gap-3 pt-3" style={{ borderTop: "1px solid oklch(90% 0.01 190)" }}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
                    {item.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium" style={{ color: "var(--color-primary-dark)" }}>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      {(t.raw("faq") as FaqItem[] | undefined) && (
        <section className="px-4 py-24" style={{ backgroundColor: "#fff" }}>
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <span className="mb-2 inline-block text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--color-primary)" }}>
                FAQ
              </span>
              <h2 className="text-3xl font-bold md:text-4xl" style={{ color: "var(--color-primary-dark)" }}>
                {locale === "fr" ? "Questions Fréquentes" : "الأسئلة الشائعة"}
              </h2>
            </div>
            <FAQ items={t.raw("faq") as FaqItem[]} />
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden px-4 py-24 text-center" style={{ background: "linear-gradient(135deg, oklch(92% 0.02 190), #fff)" }}>
        <div className="anim-blob absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]" style={{ background: "var(--color-primary-dark)" }} />
        <div className="relative mx-auto max-w-xl">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: "var(--color-primary-dark)" }}>{t("cta_section_title")}</h2>
          <p className="mb-8 text-lg opacity-70">{t("cta_section_desc")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <BookingModal label={t("cta_booking")} className="btn-primary text-lg" />
            <Link href={locale === "fr" ? "/contact" : `/${locale}/contact`} className="btn-outline text-lg">
              {locale === "fr" ? "Nous contacter" : "اتصل بنا"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
