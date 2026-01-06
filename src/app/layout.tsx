import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DigiMart | Premium Digital Asset Marketplace",
  description: "Temukan dan beli produk digital berkualitas tinggi. Template Notion, preset Lightroom, e-book, ilustrasi, dan banyak lagi.",
  keywords: ["digital assets", "templates", "presets", "ebook", "illustrations", "marketplace"],
  authors: [{ name: "DigiMart" }],
  openGraph: {
    title: "DigiMart | Premium Digital Asset Marketplace",
    description: "Temukan dan beli produk digital berkualitas tinggi",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
