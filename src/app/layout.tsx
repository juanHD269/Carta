import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script } from "next/font/google";

export const metadata: Metadata = {
  title: "Carta 💌",
  description: "Una carta especial",
};

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${dancing.variable} font-[var(--font-playfair)]`}>
        {children}
      </body>
    </html>
  );
}
