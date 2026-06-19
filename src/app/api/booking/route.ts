import { NextRequest, NextResponse } from "next/server";
import { createAppointment } from "@/lib/booking";
import { sendConfirmationEmail } from "@/lib/email";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, patientName, phone, email, notes } = body;

    if (!date || !patientName || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const appointment = await createAppointment({ date, patientName, phone, email, notes });
    logger.info("Appointment created", { id: appointment.id, date });

    if (email) {
      sendConfirmationEmail({ to: email, patientName, date }).catch((err) =>
        logger.error("Failed to send confirmation email", { error: err, appointmentId: appointment.id })
      );
    }

    return NextResponse.json({ success: true, id: appointment.id }, { status: 201 });
  } catch (error) {
    logger.error("Failed to create appointment", { error });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
