import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all appointments (admin) or create
export async function GET() {
  const appointments = await prisma.appointment.findMany({
    include: { appointmentType: true },
    orderBy: { date: "asc" },
  });
  return NextResponse.json(appointments);
}

// POST create appointment (booking)
export async function POST(req: Request) {
  const body = await req.json();

  const { date, time, typeId, ownerName, ownerPhone, ownerEmail, petName, petType, notes } = body;

  if (!date || !time || !typeId || !ownerName || !ownerPhone || !petName || !petType) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Validate time format (e.g. "09:00", "14:30")
  if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
    return NextResponse.json({ error: "Ungültiges Zeitformat" }, { status: 400 });
  }

  const appointmentDate = new Date(`${date}T${time}:00`);

  if (appointmentDate < new Date()) {
    return NextResponse.json({ error: "Termine in der Vergangenheit sind nicht möglich" }, { status: 400 });
  }

  // Check slot is not already taken (Lock standard 30 min window)
  const slotStart = new Date(appointmentDate);
  const slotEnd = new Date(appointmentDate);
  slotEnd.setMinutes(slotEnd.getMinutes() + 29);

  const existing = await prisma.appointment.findFirst({
    where: {
      date: { gte: slotStart, lte: slotEnd },
      status: { not: "cancelled" },
    },
  });

  if (existing) {
    return NextResponse.json({ error: "Dieser Termin ist bereits vergeben" }, { status: 409 });
  }

  const appointment = await prisma.appointment.create({
    data: {
      date: appointmentDate,
      ownerName,
      ownerPhone,
      ownerEmail,
      petName,
      petType,
      notes,
      typeId: Number(typeId),
    },
  });

  return NextResponse.json(appointment, { status: 201 });
}
