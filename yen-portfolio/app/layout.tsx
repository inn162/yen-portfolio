import type { Metadata } from "next";
import { Syne, Inter, DM_Serif_Display, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const accent = DM_Serif_Display({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yen Tran",
  description: "Portfolio — Commerce × Applied Statistics, UVA 2027",
  openGraph: {
    title: "Yen Tran",
    description: "Finance, investing, analytics, and AI. University of Virginia, Class of 2027.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${accent.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
