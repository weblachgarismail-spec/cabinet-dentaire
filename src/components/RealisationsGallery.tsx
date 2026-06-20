"use client";

import { useState } from "react";
import Link from "next/link";

type RealisationItem = { title: string; desc: string; badge: string; img: string };

export function RealisationsGallery({ items, locale, showViewAll = true }: { items: RealisationItem[]; locale: string; showViewAll?: boolean }) {
  const [filter, setFilter] = useState(locale === "ar" ? "الكل" : "Tous");
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
              <div className="flex aspect-[4/3] overflow-hidden">
                <div className="relative w-1/2 overflow-hidden">
                  <img src={item.img} alt={`${item.title} - Avant`} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, oklch(0% 0 0 / 0.4) 0%, transparent 40%)" }} />
                </div>
                <div className="relative w-1/2 overflow-hidden">
                  <div className="absolute left-0 top-0 z-10 h-full w-0.5 shadow-lg" style={{ background: "var(--color-primary)", boxShadow: "0 0 8px 2px oklch(60% 0.12 190 / 0.6)" }} />
                  <img src={item.img} alt={`${item.title} - Après`} className="h-full w-full object-cover brightness-110 saturate-105" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, oklch(0% 0 0 / 0.4) 0%, transparent 40%)" }} />
                </div>
                <span className="absolute left-3 top-3 z-20 rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
                  {item.badge}
                </span>
                <div className={`absolute inset-x-0 bottom-0 z-20 flex justify-center gap-4 pb-3 ${rtl ? "flex-row-reverse" : ""}`}>
                  <span className="rounded-lg px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm" style={{ backgroundColor: "oklch(0% 0 0 / 0.5)" }}>
                    {locale === "ar" ? "قبل" : "Avant"}
                  </span>
                  <span className="rounded-lg px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm" style={{ backgroundColor: "oklch(60% 0.12 190 / 0.8)" }}>
                    {locale === "ar" ? "بعد" : "Après"}
                  </span>
                </div>
              </div>
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
    </div>
  );
}
