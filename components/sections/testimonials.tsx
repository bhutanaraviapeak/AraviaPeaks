"use client"

import { Quote, Star } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { SectionHeader } from "@/components/sections/section-header"

const testimonials = [
  {
    name: "Emma R.",
    country: "United Kingdom",
    rating: 5,
    quote: "Flawless organization and deeply authentic experiences. The guides were outstanding — every day felt effortless and meaningful.",
  },
  {
    name: "Michael T.",
    country: "United States",
    rating: 5,
    quote: "Every detail was handled with care. We felt safe, inspired, and truly welcomed into Bhutanese life.",
  },
  {
    name: "Sofia M.",
    country: "Spain",
    rating: 5,
    quote: "A perfect blend of culture and luxury. Aravia Peaks is genuinely world-class — I'd travel with them again tomorrow.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 section-tint">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow="Traveler Stories"
          title="Trusted by travelers worldwide"
          description="Real reviews from guests who explored Bhutan with us."
        />

        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="flex text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="text-sm font-medium text-muted-foreground">4.9 / 5 from 300+ verified reviews</span>
        </div>

        <div className="relative mt-12">
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {testimonials.map((item) => (
                <CarouselItem key={item.name} className="md:basis-1/2 lg:basis-1/3">
                  <div className="card-premium flex h-full flex-col p-8">
                    <Quote className="h-8 w-8 text-accent/30" />
                    <div className="mt-4 flex text-accent">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 font-serif text-lg leading-relaxed text-foreground/90">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-border/70 pt-5">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary font-serif text-sm font-semibold text-white">
                        {item.name.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.country}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 border-border/70" />
            <CarouselNext className="-right-4 border-border/70" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
