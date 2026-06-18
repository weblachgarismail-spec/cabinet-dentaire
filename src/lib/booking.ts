import { prisma } from "./prisma";

const DEFAULT_WORK_START_AM = 9;
const DEFAULT_WORK_END_AM = 13;
const DEFAULT_WORK_START_PM = 15;
const DEFAULT_WORK_END_PM = 19;
const DEFAULT_SLOT_DURATION = 30;

async function getConfig() {
  const cfg = await prisma.clinicConfig.findUnique({ where: { id: "default" } });
  return {
    workStartAM: cfg?.workStartAM ?? DEFAULT_WORK_START_AM,
    workEndAM: cfg?.workEndAM ?? DEFAULT_WORK_END_AM,
    workStartPM: cfg?.workStartPM ?? DEFAULT_WORK_START_PM,
    workEndPM: cfg?.workEndPM ?? DEFAULT_WORK_END_PM,
    slotDuration: cfg?.slotDuration ?? DEFAULT_SLOT_DURATION,
  };
}

function generateTimeSlots(cfg: {
  workStartAM: number; workEndAM: number;
  workStartPM: number; workEndPM: number;
  slotDuration: number;
}): string[] {
  const slots: string[] = [];
  const pad = (n: number) => n.toString().padStart(2, "0");

  const addSlots = (start: number, end: number) => {
    let totalMin = start * 60;
    const endMin = end * 60;
    while (totalMin + cfg.slotDuration <= endMin) {
      slots.push(`${pad(Math.floor(totalMin / 60))}:${pad(totalMin % 60)}`);
      totalMin += cfg.slotDuration;
    }
  };

  addSlots(cfg.workStartAM, cfg.workEndAM);
  addSlots(cfg.workStartPM, cfg.workEndPM);
  return slots;
}

function getMoroccoNow(): { hours: number; minutes: number } {
  const now = new Date();
  const utcMin = now.getUTCHours() * 60 + now.getUTCMinutes();
  const localMin = (utcMin + 60) % 1440; // Morocco is UTC+1 year-round
  return { hours: Math.floor(localMin / 60), minutes: localMin % 60 };
}

function isToday(dateStr: string): boolean {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  return dateStr === `${y}-${m}-${d}`;
}

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export async function getAvailableSlots(date: string) {
  const startOfDay = new Date(date + "T00:00:00.000Z");
  const endOfDay = new Date(date + "T23:59:59.999Z");

  const [appointments, holidays] = await Promise.all([
    prisma.appointment.findMany({
      where: { date: { gte: startOfDay, lte: endOfDay }, status: { not: "CANCELLED" } },
      select: { time: true },
    }),
    prisma.holiday.findMany({ where: { date: { gte: startOfDay, lte: endOfDay } } }),
  ]);

  if (holidays.length > 0) return [];

  const cfg = await getConfig();
  const bookedTimes = new Set(appointments.map((a) => a.time));
  const now = getMoroccoNow();
  const nowMinutes = now.hours * 60 + now.minutes;

  return generateTimeSlots(cfg).filter((t) => {
    if (bookedTimes.has(t)) return false;
    if (isToday(date) && timeToMinutes(t) <= nowMinutes) return false;
    return true;
  });
}

export async function createAppointment(data: {
  date: string;
  time: string;
  patientName: string;
  phone: string;
  email?: string;
  city?: string;
  notes?: string;
}) {
  const existing = await prisma.appointment.findFirst({
    where: { date: new Date(data.date + "T00:00:00.000Z"), time: data.time, status: { not: "CANCELLED" } },
  });

  if (existing) {
    throw new Error("SLOT_UNAVAILABLE");
  }

  return prisma.appointment.create({
    data: {
      date: new Date(data.date + "T00:00:00.000Z"),
      time: data.time,
      patientName: data.patientName,
      phone: data.phone,
      email: data.email,
      city: data.city,
      notes: data.notes,
    },
  });
}
