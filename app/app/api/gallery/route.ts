import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all gallery images
export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(images);
  } catch (error: any) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

// POST new gallery image
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.url) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    const image = await prisma.galleryImage.create({
      data: {
        url: body.url,
        description: body.description || "",
      },
    });
    return NextResponse.json(image, { status: 201 });
  } catch (error: any) {
    console.error("Error creating gallery image:", error);
    return NextResponse.json({ error: "Failed to create gallery image" }, { status: 500 });
  }
}
