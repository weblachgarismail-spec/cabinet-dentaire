"use client";

import { useState } from "react";
import Link from "next/link";

type RealisationItem = { title: string; desc: string; badge: string; imgBefore: string; imgAfter: string };

export function RealisationsGallery({ items, locale, showViewAll = true }: { items: RealisationItem[]; locale: string; showViewAll?: boolean }) {
  const [filter, setFilter] = useState(locale === "ar" ? "الكل" : "Tous");
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);
  const [toggled, setToggled] = useState<Record<number, boolean>>({});
  const rtl = locale === "ar";
  const allLabel = locale === "ar" ? "الكل" : "Tous";
  const categories = [allLabel, ...Array.from(new Set(items.map((i) => i.badge)))];

  const filtered = filter === allLabel ? items : items.filter((i) => i.badge === filter);

  return (
    <div>
      <div className={`mb-10 flex flex-wrap justify-center gap-2 ${rtl ? "flex-row-reverse" : ""}`}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="rounded-full px-5 py-2 text-sm font-medium transition-all"
            style={{
              backgroundColor: filter === cat ? "var(--color-primary)" : "#f3f4f6",
              color: filter === cat ? "#fff" : "#374151",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => (
          <div key={i} className="card-hover group overflow-hidden rounded-2xl shadow-sm transition-all" style={{ backgroundColor: "#fff" }}>
            <div className="relative">
              {item.imgBefore === item.imgAfter ? (
                <div className="relative aspect-[3/2] overflow-hidden cursor-pointer" onClick={() => setLightbox({ src: item.imgBefore, label: item.title })}>
                  <img src={item.imgBefore} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100" style={{ backgroundColor: "oklch(0% 0 0 / 0.3)" }}>
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative aspect-[3/2] overflow-hidden cursor-pointer" onClick={() => setLightbox({ src: toggled[i] ? item.imgBefore : item.imgAfter, label: toggled[i] ? (locale === "ar" ? "قبل" : "Avant") : (locale === "ar" ? "بعد" : "Après") })}>
                    <img src={item.imgAfter} alt={`${item.title} - Après`} className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${toggled[i] ? "opacity-0 scale-110" : "opacity-100 scale-100"}`} loading="lazy" />
                    <img src={item.imgBefore} alt={`${item.title} - Avant`} className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${toggled[i] ? "opacity-100 scale-100" : "opacity-0 scale-110"}`} loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100" style={{ backgroundColor: "oklch(0% 0 0 / 0.3)" }}>
                      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    </div>
                  </div>
                  <div className={`absolute inset-x-0 bottom-0 z-10 flex justify-center gap-4 pb-3 ${rtl ? "flex-row-reverse" : ""}`}>
                    <button
                      className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-semibold transition-all hover:scale-105 ${toggled[i] ? "shadow-md" : "text-white/70 backdrop-blur-sm"}`}
                      style={{ backgroundColor: toggled[i] ? "var(--color-primary)" : "oklch(0% 0 0 / 0.5)" }}
                      onClick={() => setToggled(prev => ({ ...prev, [i]: true }))}
                    >
                      {locale === "ar" ? "قبل" : "Avant"}
                    </button>
                    <button
                      className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-semibold transition-all hover:scale-105 ${!toggled[i] ? "shadow-md" : "text-white/70 backdrop-blur-sm"}`}
                      style={{ backgroundColor: !toggled[i] ? "var(--color-primary)" : "oklch(0% 0 0 / 0.5)" }}
                      onClick={() => setToggled(prev => ({ ...prev, [i]: false }))}
                    >
                      {locale === "ar" ? "بعد" : "Après"}
                    </button>
                  </div>
                </>
              )}
              <span className="absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
                {item.badge}
              </span>
            </div>
            <div className="p-5">
              <h3 className="mb-1 font-semibold" style={{ color: "var(--color-primary-dark)" }}>{item.title}</h3>
              <p className="text-sm leading-relaxed opacity-70">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {showViewAll && (
        <div className="mt-10 text-center">
          <Link href={`/${locale}/galerie`} className="btn-outline">
            {locale === "ar" ? "عرض المعرض كاملاً" : "Voir la Galerie Complète"}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={rtl ? "M7 16l-4-4m0 0l4-4m-4 4h18" : "M17 8l4 4m0 0l-4 4m4-4H3"} /></svg>
          </Link>
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -right-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold shadow-lg transition-transform hover:scale-110"
              style={{ color: "var(--color-primary-dark)" }}
            >
              &times;
            </button>
            <span
              className="absolute -top-8 left-0 rounded-lg px-3 py-1 text-sm font-semibold text-white"
              style={{ backgroundColor: lightbox.label === "Avant" || lightbox.label === "قبل" ? "oklch(0% 0 0 / 0.6)" : "var(--color-primary)" }}
            >
              {lightbox.label}
            </span>
            <img src={lightbox.src} alt={lightbox.label} className="max-h-[85vh] rounded-xl object-contain shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}
