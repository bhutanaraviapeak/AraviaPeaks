import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/language-context"
import { ScrollToTop } from "@/components/scroll-to-top"
import { StickyCTA } from "@/components/sticky-cta"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Bhutan Aravia Peaks Tours and Travels | Authentic Bhutan Experiences",
  description:
    "Discover the magic of Bhutan with Bhutan Aravia Peaks Tours and Travels, your locally-owned gateway to authentic cultural festivals, Himalayan treks, and transformative journeys in the Land of the Thunder Dragon.",
  keywords:
    "Bhutan tours, Bhutan travel, cultural festivals, Paro Tshechu, Thimphu festival, Bhutan packages, trekking Bhutan, authentic Bhutan, luxury Bhutan, Bhutan Aravia Peaks",
  metadataBase: new URL("https://www.bhutanaraviapeaks.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    title: "Bhutan Aravia Peaks Tours and Travels | Authentic Bhutan Experiences",
    description:
      "Discover the magic of Bhutan with Bhutan Aravia Peaks Tours and Travels, your locally-owned gateway to authentic cultural festivals, Himalayan treks, and transformative journeys in the Land of the Thunder Dragon.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhutan Aravia Peaks Tours and Travels | Authentic Bhutan Experiences",
    description:
      "Discover the magic of Bhutan with Bhutan Aravia Peaks Tours and Travels, your locally-owned gateway to authentic cultural festivals, Himalayan treks, and transformative journeys in the Land of the Thunder Dragon.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <ScrollToTop />
          <div id="main-content">{children}</div>
          <StickyCTA />
          <WhatsAppFloat />
        </LanguageProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )

}
