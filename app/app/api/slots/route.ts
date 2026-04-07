import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET available slots for a given date
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date");

  if (!dateStr) {
    return NextResponse.json({ error: "Missing date param" }, { status: 400 });
  }

  const date = new Date(dateStr);
  const dayOfWeek = date.getDay();

  // Check if date is blocked
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const blocked = await prisma.blockedDate.findFirst({
    where: { date: { gte: startOfDay, lte: endOfDay } },
  });
  if (blocked) return NextResponse.json([]);

  // Get availability rules for this day
  const rules = await prisma.availabilityRule.findMany({
    where: { dayOfWeek, active: true },
  });
  if (rules.length === 0) return NextResponse.json([]);

  // Get existing appointments for this date
  const existingAppointments = await prisma.appointment.findMany({
    where: {
      date: { gte: startOfDay, lte: endOfDay },
      status: { not: "cancelled" },
    },
  });

  const bookedTimes = existingAppointments.map((a: { date: Date }) =>
    a.date.toISOString().substring(11, 16)
  );

  // Generate 30-minute slots from rules
  const slots: string[] = [];
  for (const rule of rules) {
    const [startH, startM] = rule.startTime.split(":").map(Number);
    const [endH, endM] = rule.endTime.split(":").map(Number);
    let current = startH * 60 + startM;
    const end = endH * 60 + endM;
    while (current + 30 <= end) {
      const h = Math.floor(current / 60).toString().padStart(2, "0");
      const m = (current % 60).toString().padStart(2, "0");
      const timeStr = `${h}:${m}`;
      if (!bookedTimes.includes(timeStr)) {
        slots.push(timeStr);
      }
      current += 30;
    }
  }

  return NextResponse.json(slots);
}
