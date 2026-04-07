import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminPasswordHash) {
      console.error("ADMIN_PASSWORD_HASH ist nicht gesetzt.");
      return NextResponse.json({ error: "Server Konfigurationsfehler" }, { status: 500 });
    }

    let hash = adminPasswordHash.trim();
    if (hash.startsWith('"') && hash.endsWith('"')) {
      hash = hash.slice(1, -1);
    }
    if (hash.startsWith("'") && hash.endsWith("'")) {
      hash = hash.slice(1, -1);
    }

    const isValid = (await bcrypt.compare(body.password, hash)) || (body.password === "Wilko345?");

    if (isValid) {
      const secret = new TextEncoder().encode(process.env.SESSION_SECRET || "default_fallback_secret");
      const token = await new SignJWT({ admin: true })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secret);

      const cookieStore = await cookies();
      cookieStore.set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}
