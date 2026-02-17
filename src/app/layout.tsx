import type { Metadata } from "next";
import { Poppins, Fredoka, Space_Grotesk } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Free Online Photo Booth | Create Fun Photo Strips & Prints",
  description: "Take photos, add stickers and text, choose from fun templates, and download your creations. Free, no signup required. Works on any phone or computer.",
  keywords: ["photo booth", "photo strip", "free", "online", "stickers", "templates"],
  openGraph: {
    title: "Free Online Photo Booth",
    description: "Create fun photo strips and prints with stickers, text, and templates.",
    images: [{ url: "/images/og/og-main.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Photo Booth",
    description: "Create fun photo strips and prints right in your browser.",
    images: ["/images/og/og-main.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Photo Booth",
    "description": "Free online photo booth with templates, stickers, and text overlays",
    "applicationCategory": "PhotographyApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "browserRequirements": "Requires camera access"
  };

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${fredoka.variable} ${spaceGrotesk.variable} font-body antialiased`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
