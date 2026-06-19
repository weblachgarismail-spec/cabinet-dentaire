import { prisma } from "./prisma";

export async function createAppointment(data: {
  date: string;
  patientName: string;
  phone: string;
  email?: string;
  notes?: string;
}) {
  return prisma.appointment.create({
    data: {
      date: new Date(data.date + "T00:00:00.000Z"),
      patientName: data.patientName,
      phone: data.phone,
      email: data.email,
      notes: data.notes,
    },
  });
}
