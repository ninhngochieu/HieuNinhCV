import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Editorial display serif — gives the hero/headings a typographic POV
// that breaks the default "dark dev portfolio" template.
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Hieu Ninh | .NET Developer Portfolio",
  description: "Portfolio of Hieu Ninh — .NET Developer. Built with Next.js, content served from local structured JSON (no backend).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
