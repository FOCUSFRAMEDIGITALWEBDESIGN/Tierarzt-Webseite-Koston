import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET availability rules
export async function GET() {
  const rules = await prisma.availabilityRule.findMany({
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });
  const blocked = await prisma.blockedDate.findMany({
    orderBy: { date: "asc" },
  });
  return NextResponse.json({ rules, blocked });
}

// POST create rule or blocked date
export async function POST(req: Request) {
  const body = await req.json();

  if (body.type === "blocked") {
    const bd = await prisma.blockedDate.create({
      data: { date: new Date(body.date), reason: body.reason },
    });
    return NextResponse.json(bd, { status: 201 });
  } else {
    const rule = await prisma.availabilityRule.create({
      data: {
        dayOfWeek: body.dayOfWeek,
        startTime: body.startTime,
        endTime: body.endTime,
      },
    });
    return NextResponse.json(rule, { status: 201 });
  }
}

// DELETE rule or blocked date
export async function DELETE(req: Request) {
  const body = await req.json();
  if (body.type === "blocked") {
    await prisma.blockedDate.delete({ where: { id: body.id } });
  } else {
    await prisma.availabilityRule.delete({ where: { id: body.id } });
  }
  return NextResponse.json({ success: true });
}
