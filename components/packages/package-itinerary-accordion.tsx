"use client"

import Image from "next/image"
import { useMemo } from "react"
import { Utensils, BedDouble, MapPin, Plus } from "lucide-react"
import type { PackageItineraryItem } from "@/lib/data/packages"
import { cn } from "@/lib/utils"

type PackageItineraryAccordionProps = {
  itinerary: PackageItineraryItem[]
  durationDays?: number
  highlights?: string[]
  packageTitle?: string
  heroImage?: string
}

type TimelineItem = PackageItineraryItem & {
  dayNumber: number
  image?: string
}

const FALLBACK_DAY_THEMES = [
  "Arrival & welcome",
  "Cultural immersion",
  "Nature and landscapes",
  "Local experiences",
  "Leisure and departure",
]

const P = "/images/packages/"
const I = "/images/itinerary/"

// Ordered keyword → image rules. First match wins; arrays rotate by day index for variety.
const IMAGE_RULES: { re: RegExp; img: string | string[] }[] = [
  { re: /tiger|taktsang|nest/, img: `${P}cultural-heritage.jpg` },
  { re: /arriv|welcome|reception|pick.?up/, img: `${I}paro-arrival.jpg` },
  { re: /depart|farewell|leisure|checkout|check-out|conclude|final|fly out|home/, img: `${P}custom-journey.jpg` },
  { re: /festival|tshechu|drubchen|cham|mask/, img: `${P}paro-tshechu.jpg` },
  { re: /punakha/, img: `${P}punakha-drubchen.jpg` },
  { re: /dochula|dochu la/, img: `${P}western-highlights.jpg` },
  { re: /thimphu/, img: `${I}market.jpg` },
  { re: /market|handicraft|craft|shop|weav|artisan|bazaar/, img: `${I}market.jpg` },
  { re: /wellness|spa|hot.?stone|rejuven/, img: `${P}luxury-wellness.jpg` },
  { re: /meditat|spiritual|prayer|blessing|retreat|mindful/, img: `${P}spiritual-journey.jpg` },
  { re: /monk|study|lhakhang|temple|shrine|chapel/, img: `${I}monks.jpg` },
  { re: /crane|bird|wildlife|phobjikha/, img: `${P}birdwatching.jpg` },
  { re: /lake|glacial/, img: `${P}dagala-thousand-lakes.jpg` },
  { re: /bridge/, img: `${P}photography-tour.jpg` },
  { re: /trashigang|eastern|mongar/, img: `${P}eastern-bhutan.jpg` },
  { re: /bumthang|jakar/, img: `${P}snowman-trek.jpg` },
  { re: /trek|hike|summit|camp|trail|acclimat|expedition|briefing|ascent|pass/, img: [`${P}jomolhari-trek.jpg`, `${P}snowman-trek.jpg`, `${P}druk-path-trek.jpg`] },
  { re: /dzong|fortress|heritage|museum|monument|cultur/, img: `${P}jambay-lhakhang.jpg` },
  { re: /valley|nature|landscape|countryside|scenic|drive|village|farm|rural|hot.?spring/, img: [`${P}luxury-wellness.jpg`, `${P}luxury-bhutan.jpg`, `${P}custom-journey.jpg`] },
  { re: /paro/, img: `${I}paro-arrival.jpg` },
]

// Diverse fallback rotation pool.
const POOL = [
  `${I}paro-arrival.jpg`,
  `${P}paro-tshechu.jpg`,
  `${P}jambay-lhakhang.jpg`,
  `${I}market.jpg`,
  `${P}punakha-drubchen.jpg`,
  `${P}spiritual-journey.jpg`,
  `${P}western-highlights.jpg`,
  `${P}jomolhari-trek.jpg`,
  `${P}dagala-thousand-lakes.jpg`,
  `${P}luxury-wellness.jpg`,
  `${I}monks.jpg`,
  `${P}custom-journey.jpg`,
]

function resolveImage(text: string, index: number): string {
  for (const rule of IMAGE_RULES) {
    if (rule.re.test(text)) {
      return Array.isArray(rule.img) ? rule.img[index % rule.img.length] : rule.img
    }
  }
  return POOL[index % POOL.length]
}

// Assign a relevant image to each day, guaranteeing no two consecutive days repeat.
function assignImages(items: TimelineItem[]): string[] {
  const out: string[] = []
  for (let i = 0; i < items.length; i++) {
    const text = `${items[i].title || ""} ${items[i].description || ""}`.toLowerCase()
    let img = items[i].image || resolveImage(text, i)
    if (i > 0 && img === out[i - 1]) {
      // pick the next pool image that differs from the previous day
      const alt = POOL.find((p, k) => p !== out[i - 1] && (k + i) % POOL.length !== 0) || POOL[(i + 1) % POOL.length]
      // prefer a stable rotation offset so it still feels intentional
      img = POOL[(i * 5 + 3) % POOL.length]
      if (img === out[i - 1]) img = alt
    }
    out.push(img)
  }
  return out
}

const safeArray = <T,>(value?: T[]) => (Array.isArray(value) ? value.filter(Boolean) : [])

export function PackageItineraryAccordion({
  itinerary,
  durationDays,
  highlights,
  packageTitle,
}: PackageItineraryAccordionProps) {
  const safeItinerary = useMemo(() => (Array.isArray(itinerary) ? itinerary : []), [itinerary])
  const safeHighlights = useMemo(() => (Array.isArray(highlights) ? highlights.filter(Boolean) : []), [highlights])

  const fallbackDays = useMemo(() => {
    if (durationDays && durationDays > 0) return durationDays
    if (safeHighlights.length >= 5) return 5
    return 3
  }, [durationDays, safeHighlights.length])

  const normalizedItems = useMemo<TimelineItem[]>(() => {
    if (safeItinerary.length) {
      return safeItinerary.map((item, index) => ({
        ...item,
        dayNumber: item.day || index + 1,
        image: (item as TimelineItem).image,
      }))
    }
    return Array.from({ length: fallbackDays }, (_, index) => {
      const theme = FALLBACK_DAY_THEMES[index % FALLBACK_DAY_THEMES.length]
      const highlight = safeHighlights[index] || safeHighlights[index % safeHighlights.length]
      return {
        day: index + 1,
        dayNumber: index + 1,
        title: theme,
        description:
          highlight || `A curated day in Bhutan with experiences tailored to ${packageTitle || "your interests"}.`,
      }
    })
  }, [safeItinerary, fallbackDays, safeHighlights, packageTitle])

  const items = useMemo<TimelineItem[]>(() => {
    if (!safeItinerary.length || !durationDays || durationDays <= normalizedItems.length) {
      return normalizedItems
    }
    const remaining = durationDays - normalizedItems.length
    const appended = Array.from({ length: remaining }, (_, index) => ({
      day: normalizedItems.length + index + 1,
      dayNumber: normalizedItems.length + index + 1,
      title: FALLBACK_DAY_THEMES[(normalizedItems.length + index) % FALLBACK_DAY_THEMES.length],
      description: safeHighlights[index] || `Additional exploration day tailored to ${packageTitle || "your travel style"}.`,
    }))
    return [...normalizedItems, ...appended]
  }, [safeItinerary.length, durationDays, normalizedItems, safeHighlights, packageTitle])

  const dayImages = useMemo(() => assignImages(items), [items])

  if (!items.length) {
    return (
      <p className="text-sm text-muted-foreground">
        This journey is fully customized — we&rsquo;ll share a detailed day-by-day plan after your inquiry.
      </p>
    )
  }

  const phaseLabel = (n: number) => (n <= 1 ? "Arrival" : n >= items.length ? "Departure" : "Exploration")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{items.length} days</span> of curated experiences
        </p>
        <p className="hidden text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground sm:block">
          Hover a day to explore
        </p>
      </div>

      <div className="relative">
        {/* timeline spine */}
        <div className="pointer-events-none absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-accent/50 via-border to-transparent" />

        <div className="space-y-4">
          {items.map((item, index) => {
            const bannerImage = dayImages[index]
            const imageRight = index % 2 === 1 // alternate layout per day

            return (
              // Hover (or keyboard-focus) reveals the day detail. Touch devices, which
              // can't hover, get the detail expanded by default via [@media(hover:none)].
              <div
                key={`day-${item.dayNumber}`}
                tabIndex={0}
                aria-label={`Day ${item.dayNumber}: ${item.title || "experience"}`}
                className="group/day relative pl-16 outline-none"
              >
                {/* day marker on the spine */}
                <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-card font-serif text-sm font-semibold text-primary transition-all duration-300 group-hover/day:border-accent group-hover/day:bg-accent group-hover/day:text-white group-focus-within/day:border-accent group-focus-within/day:bg-accent group-focus-within/day:text-white">
                  {item.dayNumber}
                </div>

                <div className="overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 group-hover/day:border-accent/40 group-hover/day:shadow-[0_20px_44px_-26px_rgba(18,37,54,0.4)] group-focus-within/day:border-accent/40">
                  {/* Always-visible header */}
                  <div className="flex items-center gap-4 px-5 py-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                          Day {item.dayNumber}
                        </span>
                        <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                          {phaseLabel(item.dayNumber)}
                        </span>
                      </div>
                      <h3 className="mt-1 truncate font-serif text-lg font-semibold text-foreground transition-colors group-hover/day:text-accent">
                        {item.title || `Day ${item.dayNumber} experience`}
                      </h3>
                    </div>
                    <Plus className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover/day:rotate-45 group-hover/day:text-accent group-focus-within/day:rotate-45 group-focus-within/day:text-accent" />
                  </div>

                  {/* Hover-reveal content (smooth height via grid-rows 0fr→1fr) */}
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover/day:grid-rows-[1fr] group-focus-within/day:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <div className="px-5 pb-6">
                        {/* Alternating zig-zag layout so each day reads differently */}
                        <div className={cn("grid gap-5 md:grid-cols-2 md:items-stretch", imageRight && "md:[&>*:first-child]:order-2")}>
                          <div className="relative min-h-48 overflow-hidden rounded-xl md:min-h-full">
                            <Image
                              src={bannerImage}
                              alt={item.title || packageTitle || "Itinerary highlight"}
                              fill
                              className="object-cover transition-transform duration-700 ease-out group-hover/day:scale-105"
                              sizes="(max-width: 768px) 100vw, 360px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                            <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                              Day {item.dayNumber}
                            </span>
                          </div>

                          <div className="flex flex-col justify-center py-1">
                            <p className="leading-relaxed text-muted-foreground">
                              {item.description || "Detailed itinerary coming soon."}
                            </p>

                            {(item.stay || item.meals) && (
                              <div className="mt-5 grid gap-2.5 border-t border-border/70 pt-4 text-sm">
                                {item.stay ? (
                                  <span className="inline-flex items-center gap-2 text-foreground/80">
                                    <BedDouble className="h-4 w-4 shrink-0 text-accent" />
                                    <span className="text-muted-foreground">Stay:</span> {item.stay}
                                  </span>
                                ) : null}
                                {item.meals ? (
                                  <span className="inline-flex items-center gap-2 text-foreground/80">
                                    <Utensils className="h-4 w-4 shrink-0 text-accent" />
                                    <span className="text-muted-foreground">Meals:</span> {item.meals}
                                  </span>
                                ) : null}
                                <span className="inline-flex items-center gap-2 text-foreground/80">
                                  <MapPin className="h-4 w-4 shrink-0 text-accent" />
                                  <span className="text-muted-foreground">Guide:</span> Private, licensed
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
