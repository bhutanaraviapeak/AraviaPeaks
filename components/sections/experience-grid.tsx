import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SectionHeader } from "@/components/sections/section-header"

const experiences = [
  {
    title: "Culture & Heritage",
    description: "Sacred monasteries, dzongs, and living traditions.",
    image: "/bhutan-traditional-colorful-dzong-architecture.jpg",
    href: "/packages/cultural",
  },
  {
    title: "Trekking & Adventure",
    description: "Himalayan trails, alpine lakes, and remote valleys.",
    image: "/druk-path-trek-alpine-lakes-mountains-bhutan.jpg",
    href: "/packages/trekking",
  },
  {
    title: "Luxury & Wellness",
    description: "Sanctuary stays, hot-stone baths, and mindful escapes.",
    image: "/luxury-resort-bhutan-mountains-spa-five-star-hotel.jpg",
    href: "/packages/luxury",
  },
  {
    title: "Festivals & Events",
    description: "Vibrant tshechus, mask dances, and sacred rituals.",
    image: "/bhutan-festival-masked-dancers-colorful-costumes-c.jpg",
    href: "/festivals",
  },
  {
    title: "Nature & Wildlife",
    description: "Pristine forests, cranes, and Bhutan's wild heart.",
    image: "/bhutan-himalayan-birds-black-necked-crane-colorful.jpg",
    href: "/travel-guide",
  },
  {
    title: "Community Homestays",
    description: "Authentic village stays hosted by local families.",
    image: "/bhutan-bumthang-farmhouse-countryside.jpg",
    href: "/bhutan/farmhouses-homestays",
  },
]

export function ExperienceGrid() {
  return (
    <section id="experiences" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow="Experience Categories"
          title="Choose the journey that speaks to you"
          description="From culture to high-altitude adventure, each experience is crafted with Bhutanese insight."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative block h-80 overflow-hidden rounded-2xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-2xl font-semibold text-white">{item.title}</h3>
                  <span className="mt-1 inline-flex h-9 w-9 shrink-0 translate-y-1 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/0 transition-all duration-500 group-hover:text-white/80">
                  {item.description}
                </p>
                <span className="mt-4 block h-px w-10 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
