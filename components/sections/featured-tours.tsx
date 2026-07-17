import Link from "next/link"
import { ArrowRight, Clock, MapPin, Gauge } from "lucide-react"
import { SectionHeader } from "@/components/sections/section-header"
import SmartImage from "@/components/SmartImage"
import { getPackageBySlug, getPackagePath, type TourPackage } from "@/lib/data/packages"

const featuredTours = [
  getPackageBySlug("paro-tshechu"),
  getPackageBySlug("druk-path-trek"),
  getPackageBySlug("luxury-bhutan"),
].filter((tour): tour is TourPackage => Boolean(tour))

export function FeaturedTours() {
  return (
    <section className="py-20 md:py-28 section-tint">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            align="left"
            eyebrow="Featured Journeys"
            title="Handpicked journeys designed for depth"
            description="Immersive itineraries that reveal Bhutan far beyond the expected."
          />
          <Link
            href="/packages"
            className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent md:inline-flex"
          >
            View all journeys <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featuredTours.map((tour) => (
            <Link
              key={tour.slug}
              href={getPackagePath(tour)}
              className="group card-premium flex flex-col overflow-hidden"
            >
              <div className="relative h-60 overflow-hidden">
                <SmartImage
                  src={tour.heroImage}
                  alt={tour.title}
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary backdrop-blur-sm">
                  {tour.comfortLevel}
                </span>
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  <Clock className="h-3.5 w-3.5" /> {tour.durationLabel}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-4 text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-accent" /> {tour.region}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Gauge className="h-3.5 w-3.5 text-accent" /> {tour.difficulty}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-semibold leading-snug transition-colors group-hover:text-accent">
                  {tour.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{tour.summary}</p>

                <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-5">
                  <div>
                    {tour.startingFrom ? (
                      <>
                        <span className="block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">From</span>
                        <span className="font-serif text-lg font-semibold text-primary">
                          ${tour.startingFrom.toLocaleString()}
                          <span className="ml-1 text-xs font-normal text-muted-foreground">/ person</span>
                        </span>
                      </>
                    ) : (
                      <span className="text-sm font-medium text-muted-foreground">Bespoke pricing</span>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5 group-hover:text-accent">
                    View journey <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
          >
            View all journeys <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
