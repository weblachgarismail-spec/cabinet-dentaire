"use client";

import { useLocale } from "next-intl";

type Props = {
  slots: string[];
  selected: string | null;
  onSelect: (time: string) => void;
  loading: boolean;
  selectedDate?: string | null;
};

function isToday(dateStr: string): boolean {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return dateStr === `${y}-${m}-${d}`;
}

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function TimeSlotPicker({ slots, selected, onSelect, loading, selectedDate }: Props) {
  const locale = useLocale();

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const visibleSlots = selectedDate && isToday(selectedDate)
    ? slots.filter((t) => timeToMinutes(t) > nowMinutes)
    : slots;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: "var(--color-primary)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (visibleSlots.length === 0) {
    return <p className="py-8 text-center opacity-60">{locale === "ar" ? "لا توجد أوقات متاحة" : "Aucun créneau disponible"}</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {visibleSlots.map((time) => (
        <button
          key={time}
          onClick={() => onSelect(time)}
          className="rounded-lg px-3 py-2 text-sm font-medium transition-all"
          style={{
            backgroundColor: selected === time ? "var(--color-primary)" : "#f3f4f6",
            color: selected === time ? "#fff" : "var(--color-text)",
          }}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
