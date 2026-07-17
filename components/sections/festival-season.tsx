import Link from "next/link"
import { ArrowRight, Flower2, Sun, Leaf, Snowflake } from "lucide-react"
import { SectionHeader } from "@/components/sections/section-header"

const seasons = [
  { season: "Spring", months: "Mar–May", note: "Clear skies & vibrant festivals", icon: Flower2 },
  { season: "Summer", months: "Jun–Aug", note: "Lush valleys & wellness retreats", icon: Sun },
  { season: "Autumn", months: "Sep–Nov", note: "Peak trekking & sacred tshechus", icon: Leaf },
  { season: "Winter", months: "Dec–Feb", note: "Quiet luxury & black-necked cranes", icon: Snowflake },
]

export function FestivalSeason() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow="Festival & Seasonal Travel"
          title="Plan your journey around Bhutan's calendar"
          description="Festivals follow the lunar calendar and sit at the heart of Bhutanese culture. We help you choose the perfect season."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {seasons.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.season} className="group card-premium p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-xl font-semibold">{item.season}</h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{item.months}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/festivals"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
          >
            View festival calendar <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
