import type { Metadata } from "next";
import "./globals.css";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Tierarztpraxis Koston & van Dillen | Tierarzt Emmerich",
  description:
    "Tierarztpraxis Koston & van Dillen in Emmerich am Rhein. Professionelle Kleintier- und Pferdepraxis. Online Terminbuchung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <AnimateOnScroll />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
