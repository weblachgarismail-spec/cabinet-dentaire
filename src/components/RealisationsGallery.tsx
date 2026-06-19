"use client";

import { useState } from "react";
import Link from "next/link";

type RealisationItem = { title: string; desc: string; badge: string };

export function RealisationsGallery({ items, locale }: { items: RealisationItem[]; locale: string }) {
  const [filter, setFilter] = useState("Tous");
  const rtl = locale === "ar";
  const categories = ["Tous", ...Array.from(new Set(items.map((i) => i.badge)))];

  const filtered = filter === "Tous" ? items : items.filter((i) => i.badge === filter);

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
              <div className="flex aspect-[4/3] items-center justify-center" style={{ background: "linear-gradient(135deg, oklch(95% 0.02 190), oklch(92% 0.02 190))" }}>
                <div className="flex gap-3 opacity-20">
                  <svg className="h-14 w-14" viewBox="0 0 24 24" fill="var(--color-primary)"><path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/></svg>
                  <svg className="h-14 w-14 opacity-50" viewBox="0 0 24 24" fill="var(--color-primary-dark)"><path d="M12 3C8.5 3 6 5.5 6 9c0 1.5.5 3 1 4.5L8.5 20c.3.9 1 1.5 1.8 1.5h3.4c.8 0 1.5-.6 1.8-1.5l1.5-6.5c.5-1.5 1-3 1-4.5 0-3.5-2.5-6-6-6z"/></svg>
                </div>
                <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
                  {item.badge}
                </span>
                <div className={`absolute inset-x-0 bottom-0 flex justify-center gap-4 pb-3 ${rtl ? "flex-row-reverse" : ""}`}>
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

      <div className="mt-10 text-center">
        <Link href={`/${locale}/galerie`} className="btn-outline">
          {locale === "ar" ? "عرض المعرض كاملاً" : "Voir la Galerie Complète"}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={rtl ? "M7 16l-4-4m0 0l4-4m-4 4h18" : "M17 8l4 4m0 0l-4 4m4-4H3"} /></svg>
        </Link>
      </div>
    </div>
  );
}
