import { SectionHeader } from "@/components/sections/section-header"
import { MapPin, Compass, Landmark, Leaf, Sparkles, LifeBuoy } from "lucide-react"

const trustItems = [
  {
    icon: MapPin,
    title: "Local Bhutanese expertise",
    description: "Guided by locals who live the culture, landscapes, and traditions every day.",
  },
  {
    icon: Compass,
    title: "Personalized itineraries",
    description: "Each journey is tailored to your pace, interests, and travel style.",
  },
  {
    icon: Landmark,
    title: "Authentic cultural immersion",
    description: "Meaningful encounters with Bhutan's people and its most sacred places.",
  },
  {
    icon: Leaf,
    title: "Responsible tourism",
    description: "Sustainable practices that protect Bhutan's environment and heritage.",
  },
  {
    icon: Sparkles,
    title: "Seamless travel planning",
    description: "Every detail coordinated with care, from arrival to departure.",
  },
  {
    icon: LifeBuoy,
    title: "24/7 traveler support",
    description: "Reliable assistance before, during, and after your journey.",
  },
]

export function WhyUs() {
  return (
    <section className="py-20 md:py-28 section-tint">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow="Why Aravia Peaks"
          title="Crafted by Bhutanese experts"
          description="Premium service, local insight, and authentic experiences built for discerning travelers."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="group card-premium p-8"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-serif text-xl font-semibold">{item.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
