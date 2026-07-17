import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HomeHero } from "@/components/sections/home-hero"
import { FeaturedTours } from "@/components/sections/featured-tours"
import { ExperienceGrid } from "@/components/sections/experience-grid"
import { WhyUs } from "@/components/sections/why-us"
import { AboutAravia } from "@/components/sections/about-aravia"
import { BhutanMap } from "@/components/sections/bhutan-map"
import { FestivalSeason } from "@/components/sections/festival-season"
import { Testimonials } from "@/components/sections/testimonials"
import { StrongCTA } from "@/components/sections/strong-cta"

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Bhutan Aravia Peaks",
    url: "https://aravia-peaks.vercel.app",
    description:
      "Locally owned Bhutan travel specialists offering custom cultural tours, treks, and festival journeys.",
    areaServed: "Bhutan",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "bhutanaraviapeak@gmail.com",
      telephone: "+975 17565604",
    },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1">
        <HomeHero />
        {/* Lead with the product — real journeys — then build trust and context */}
        <FeaturedTours />
        <ExperienceGrid />
        <WhyUs />
        <AboutAravia />
        <BhutanMap />
        <FestivalSeason />
        <Testimonials />
        <StrongCTA />
      </main>

      <Footer />
    </div>
  )
}
