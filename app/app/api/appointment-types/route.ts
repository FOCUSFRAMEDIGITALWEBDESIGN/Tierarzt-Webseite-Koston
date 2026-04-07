import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all appointment types
export async function GET() {
  const types = await prisma.appointmentType.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(types);
}

// POST create appointment type (admin only)
export async function POST(req: Request) {
  const body = await req.json();
  const type = await prisma.appointmentType.create({
    data: {
      name: body.name,
      durationMin: body.durationMin || 30,
    },
  });
  return NextResponse.json(type, { status: 201 });
}
