import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH update appointment status
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const appointment = await prisma.appointment.update({
    where: { id: Number(id) },
    data: { status: body.status },
  });
  return NextResponse.json(appointment);
}

// DELETE cancel appointment
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.appointment.update({
    where: { id: Number(id) },
    data: { status: "cancelled" },
  });
  return NextResponse.json({ success: true });
}
