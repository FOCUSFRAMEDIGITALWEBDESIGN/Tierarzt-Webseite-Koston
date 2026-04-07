import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { items } = await req.json(); // Expecting { items: [{ id: 1, sortOrder: 0 }, { id: 2, sortOrder: 1 }] }
    
    // Process reordering within an interactive transaction to prevent race conditions
    await prisma.$transaction(
      items.map((item: { id: number; sortOrder: number }) =>
        prisma.education.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering:", error);
    return NextResponse.json({ error: "Fehler beim Speichern der Reihenfolge" }, { status: 500 });
  }
}
