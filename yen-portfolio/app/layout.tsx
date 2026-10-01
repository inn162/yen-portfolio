import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yen Tran — Finance, Investing & Analytics",
  description:
    "Yen Tran is a finance and data science student at the University of Virginia, specializing in investing, private equity, and AI-driven analytics.",
  keywords: ["Yen Tran", "UVA", "Finance", "Private Equity", "Data Science", "McIntire"],
  openGraph: {
    title: "Yen Tran — Finance, Investing & Analytics",
    description:
      "Finance student at UVA McIntire. Experience in private equity, investment analysis, and AI-driven analytics.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
