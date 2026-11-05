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
  title: "Yen Tran — Finance & Analytics",
  description: "UVA '27 Commerce & Statistics. PE and equity research experience in Vietnam, plus AI tools for investment reporting and data storytelling.",
  openGraph: {
    title: "Yen Tran — Finance & Analytics",
    description: "UVA '27 Commerce & Statistics. PE and equity research experience in Vietnam, plus AI tools for investment reporting and data storytelling.",
    images: [{ url: "/portrait.png", width: 800, height: 1200, alt: "Yen Tran" }],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${accent.variable} ${mono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=amulya@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
