import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET educations grouped by doctor
export async function GET() {
  const educations = await prisma.education.findMany({
    where: { active: true },
    orderBy: [{ doctor: "asc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(educations);
}

// POST add education
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("POST /api/educations - Body:", body);
    
    const edu = await prisma.education.create({
      data: {
        title: body.title,
        date: body.date,
        doctor: body.doctor,
        category: body.category || "Allgemein",
      },
    });
    return NextResponse.json(edu, { status: 201 });
  } catch (error: any) {
    console.error("Error creating education:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
