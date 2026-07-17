import Link from "next/link"
import Image from "next/image"
import { Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { packageCategories, type TourPackage } from "@/lib/data/packages"
import { PackageItineraryAccordion } from "@/components/packages/package-itinerary-accordion"
import { PackageGalleryLightbox } from "@/components/packages/package-gallery-lightbox"
import { PackageInquiryCard } from "@/components/packages/package-inquiry-card"

const DEFAULT_HERO = "/images/package-bg.webp"

const DEFAULT_HIGHLIGHTS = [
  "Guided by licensed Bhutanese experts",
  "Handpicked stays and seamless logistics",
  "Flexible pacing tailored to your group",
]

const DEFAULT_INCLUSIONS = [
  "All ground transfers with private vehicle",
  "Licensed guide and daily support",
  "Accommodation in trusted hotels",
  "Breakfasts and selected meals",
]

const DEFAULT_FAQS = [
  {
    question: "When is the best time to visit Bhutan?",
    answer: "Spring (Mar–May) and autumn (Sep–Nov) offer the clearest skies and festival seasons.",
  },
  {
    question: "Do I need a visa to travel to Bhutan?",
    answer: "Yes. We handle the visa process once your itinerary is confirmed and payment is received.",
  },
  {
    question: "Is Bhutan suitable for families?",
    answer: "Absolutely. We tailor pacing, accommodations, and activities for all ages.",
  },
  {
    question: "Can the itinerary be customized?",
    answer: "Yes. Every journey can be adjusted to match your interests and travel style.",
  },
]

const formatCurrency = (value?: number) => {
  if (!value) return null
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

const safeArray = <T,>(value?: T[]) => (Array.isArray(value) ? value.filter(Boolean) : [])

export function PackageDetails({ pkg }: { pkg: TourPackage }) {
  const categoryLabel = packageCategories.find((cat) => cat.slug === pkg.category)?.label ?? pkg.category
  const heroImage = pkg.heroImage || DEFAULT_HERO
  const gallery = safeArray(pkg.gallery)
  const galleryImages = gallery.length ? gallery : [heroImage]
  const itineraryWithImages = safeArray(pkg.itinerary).map((item) => {
    const existingImage = (item as { image?: string }).image
    return {
      ...item,
      // When absent, the itinerary component picks a content-relevant image itself
      // (so each day differs).
      image: existingImage || undefined,
    }
  })

  const itineraryHighlights = safeArray(pkg.itinerary)
    .slice(0, 3)
    .map((item) => item.title)
    .filter(Boolean)

  const highlights = safeArray(pkg.highlights)
  const highlightList = highlights.length ? highlights : itineraryHighlights.length ? itineraryHighlights : DEFAULT_HIGHLIGHTS

  const inclusions = safeArray(pkg.included)
  const exclusions = safeArray(pkg.excluded)
  const faqList = safeArray(pkg.faqs).length ? safeArray(pkg.faqs) : DEFAULT_FAQS

  const quickFacts = [
    { label: "Duration", value: pkg.durationLabel || (pkg.durationDays ? `${pkg.durationDays} days` : null) },
    { label: "Best season", value: pkg.bestTime },
    { label: "From", value: formatCurrency(pkg.startingFrom) },
    { label: "Difficulty", value: pkg.difficulty },
    { label: "Region", value: pkg.region },
    { label: "Group size", value: pkg.groupSize },
  ].filter((fact) => Boolean(fact.value))

  return (
    <div className="flex flex-col bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroImage} alt={pkg.title} fill priority className="scale-105 object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-background" />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative z-10 container px-4 md:px-6 pt-28 pb-16 md:pt-36 md:pb-24 text-white">
          <nav className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/packages" className="transition-colors hover:text-white">Journeys</Link>
              <span>/</span>
              <Link href={`/packages/${pkg.category}`} className="transition-colors hover:text-white">{categoryLabel}</Link>
              <span>/</span>
              <span className="text-white/90">{pkg.title}</span>
            </div>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {categoryLabel}
              </span>
              <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-balance md:text-6xl">{pkg.title}</h1>
              <p className="max-w-xl text-lg text-white/85 text-balance md:text-xl">{pkg.summary || pkg.description}</p>
            </div>
            {quickFacts.length ? (
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">Journey Facts</p>
                <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
                  {quickFacts.map((fact) => (
                    <div key={fact.label} className="bg-primary/40 px-4 py-3 backdrop-blur-sm">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">{fact.label}</p>
                      <p className="mt-1 text-base font-semibold text-white">{fact.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
        <div className="relative container mx-auto max-w-6xl px-4 md:px-6 py-12">
          <div className="grid gap-10 md:grid-cols-[1fr_360px]">
            <div className="space-y-8">
              <Card className="card-premium border border-border/60 bg-card/90">
                <CardContent className="p-6 md:p-8 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="eyebrow">Journey Overview</p>
                      <h2 className="font-serif text-2xl font-semibold">Curated for immersive Bhutan travel</h2>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/inquiry">Request a quote</Link>
                    </Button>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{pkg.description || pkg.summary}</p>
                  {pkg.keywords?.length ? (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {pkg.keywords.slice(0, 8).map((keyword) => (
                        <Badge key={keyword} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>

              {highlightList.length ? (
                <Card className="card-premium border border-border/60 bg-card/90">
                  <CardContent className="p-6 md:p-8 space-y-5">
                    <div>
                      <p className="eyebrow">Signature Moments</p>
                      <h2 className="font-serif text-2xl font-semibold">Highlights tailored to this journey</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {highlightList.map((item, index) => (
                        <div key={`${item}-${index}`} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background p-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 font-serif text-sm font-semibold text-accent">
                            {index + 1}
                          </div>
                          <p className="pt-1.5 text-sm font-medium text-foreground">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              <Card className="card-premium border border-border/60 bg-card/90">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="eyebrow">Day by Day</p>
                      <h2 className="font-serif text-2xl font-semibold">Immersive itinerary flow</h2>
                    </div>
                    {pkg.itinerary?.length ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href="#itinerary">View details</a>
                      </Button>
                    ) : null}
                  </div>
                  <div id="itinerary">
                    <PackageItineraryAccordion
                      itinerary={itineraryWithImages}
                      durationDays={pkg.durationDays}
                      highlights={safeArray(pkg.highlights)}
                      packageTitle={pkg.title}
                      heroImage={heroImage}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-premium border border-border/60 bg-card/90">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div>
                    <div>
                      <p className="eyebrow">What&rsquo;s included</p>
                      <h2 className="font-serif text-2xl font-semibold">Inclusions</h2>
                    </div>
                    <ul className="mt-4 grid gap-2.5 text-sm text-foreground/80 sm:grid-cols-2">
                      {(inclusions.length ? inclusions : DEFAULT_INCLUSIONS).map((item, index) => (
                        <li key={`${item}-${index}`} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {exclusions.length ? (
                    <div className="border-t border-border/70 pt-6">
                      <h3 className="font-semibold text-foreground">Not included</h3>
                      <ul className="mt-3 grid gap-2.5 text-sm text-muted-foreground sm:grid-cols-2">
                        {exclusions.map((item, index) => (
                          <li key={`${item}-${index}`} className="flex items-start gap-2.5">
                            <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </CardContent>
              </Card>

              <Card className="card-premium border border-border/60 bg-card/90">
                <CardContent className="p-6 md:p-8 space-y-5">
                  <div>
                    <p className="eyebrow">Know before you go</p>
                    <h2 className="font-serif text-2xl font-semibold">FAQs</h2>
                  </div>
                  <div className="grid gap-4 text-sm text-muted-foreground">
                    {faqList.map((faq, index) => (
                      <div key={`${faq.question}-${index}`}>
                        <p className="font-semibold text-foreground">{faq.question}</p>
                        <p className="mt-1">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="card-premium border border-border/60 bg-card/90">
                <CardContent className="p-6 md:p-8 space-y-4">
                  <div>
                    <p className="eyebrow">Visual story</p>
                    <h2 className="font-serif text-2xl font-semibold">Gallery</h2>
                  </div>
                  <PackageGalleryLightbox images={galleryImages} title={pkg.title} />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="sticky top-24">
                <PackageInquiryCard packageTitle={pkg.title} priceLabel={formatCurrency(pkg.startingFrom)} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
