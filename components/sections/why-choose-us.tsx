"use client"

import { MessageCircle, ShieldCheck, Compass } from "lucide-react"
import { SectionHeader } from "@/components/sections/section-header"

const promises = [
  {
    icon: MessageCircle,
    title: "Direct access to your trip planner",
    description:
      "No call centers or ticket queues. You message directly with the person designing your itinerary, from your first inquiry to your last day in Bhutan.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & locally owned",
    description:
      "A registered Bhutanese tour operator, run by people who live here — every journey is handled in-house, not resold through a third party.",
  },
  {
    icon: Compass,
    title: "Itineraries built around you",
    description:
      "No fixed templates. Every route, pace, and stay is designed around your dates, interests, and travel style.",
  },
]

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 md:py-28 section-tint">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow="Our Promise"
          title="A new operator, built the right way"
          description="We're a young Bhutanese travel house — here's exactly what that means for you."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {promises.map((item) => (
            <div key={item.title} className="card-premium flex h-full flex-col p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
