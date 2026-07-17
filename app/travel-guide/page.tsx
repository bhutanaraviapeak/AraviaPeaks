"use client"

import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import {
  FileText,
  Coins,
  CalendarDays,
  Plane,
  Briefcase,
  Mountain,
  Flower2,
  Sun,
  Leaf,
  Snowflake,
  Banknote,
  Check,
  X,
  ArrowRight,
  MapPin,
  ShieldCheck,
  IdCard,
  Umbrella,
  Camera,
  CreditCard,
  Send,
  Mail,
  Stamp,
  Landmark,
  Globe,
} from "lucide-react"

const quickFacts = [
  { icon: FileText, titleKey: "guide_visa_title", descKey: "guide_visa_description", labelKey: "guide_visa_processing", valueKey: "guide_visa_time" },
  { icon: Coins, titleKey: "guide_sdf_title", descKey: "guide_sdf_description", labelKey: "guide_sdf_amount_label", valueKey: "guide_sdf_amount" },
  { icon: CalendarDays, titleKey: "guide_best_time_title", descKey: "guide_best_time_description", labelKey: "guide_peak_season", valueKey: "guide_peak_months" },
  { icon: Plane, titleKey: "guide_getting_there_title", descKey: "guide_getting_there_description", labelKey: "guide_getting_there_land_label", valueKey: "guide_getting_there_land" },
  { icon: Briefcase, titleKey: "guide_included_title", descKey: "guide_included_description", labelKey: "guide_tour_operator_required", valueKey: "guide_tour_operator_mandatory" },
  { icon: Mountain, titleKey: "guide_altitude_climate_title", descKey: "guide_altitude_climate_description", labelKey: "guide_pack", valueKey: "guide_layers" },
] as const

const visaFacts = ["guide_visa_fact_indian", "guide_visa_fact_fee", "guide_visa_fact_validity"] as const

const visaRequirements = ["guide_visa_req_1", "guide_visa_req_2", "guide_visa_req_3"] as const
const visaRequirementIcons = [IdCard, Umbrella, Camera]

const visaSteps = [
  { icon: CreditCard, titleKey: "guide_visa_step_1_title", descKey: "guide_visa_step_1_desc" },
  { icon: Send, titleKey: "guide_visa_step_2_title", descKey: "guide_visa_step_2_desc" },
  { icon: Mail, titleKey: "guide_visa_step_3_title", descKey: "guide_visa_step_3_desc" },
  { icon: Stamp, titleKey: "guide_visa_step_4_title", descKey: "guide_visa_step_4_desc" },
] as const

const currencyFacts = [
  { icon: Coins, labelKey: "guide_currency_rate_label", valueKey: "guide_currency_rate" },
  { icon: Banknote, labelKey: "guide_currency_notes_title", valueKey: "guide_currency_notes_desc" },
  { icon: Landmark, labelKey: "guide_currency_exchange_title", valueKey: "guide_currency_exchange_desc" },
  { icon: CreditCard, labelKey: "guide_currency_cards_title", valueKey: "guide_currency_cards_desc" },
  { icon: Globe, labelKey: "guide_currency_accepted_title", valueKey: "guide_currency_accepted_desc" },
] as const

const seasons = [
  { icon: Flower2, titleKey: "guide_season_spring_title", monthsKey: "guide_season_spring_months", descKey: "guide_season_spring_desc" },
  { icon: Sun, titleKey: "guide_season_summer_title", monthsKey: "guide_season_summer_months", descKey: "guide_season_summer_desc" },
  { icon: Leaf, titleKey: "guide_season_autumn_title", monthsKey: "guide_season_autumn_months", descKey: "guide_season_autumn_desc" },
  { icon: Snowflake, titleKey: "guide_season_winter_title", monthsKey: "guide_season_winter_months", descKey: "guide_season_winter_desc" },
] as const

const dos = ["guide_do_1", "guide_do_2", "guide_do_3", "guide_do_4", "guide_do_5", "guide_do_6"] as const
const donts = ["guide_dont_1", "guide_dont_2", "guide_dont_3", "guide_dont_4", "guide_dont_5", "guide_dont_6"] as const

const attractions = [
  {
    name: "Tiger's Nest Monastery",
    location: "Paro",
    description: "Iconic cliffside monastery and Bhutan's most famous landmark",
    image: "/tigers-nest-monastery-bhutan-cliff-mountain.jpg",
  },
  {
    name: "Punakha Dzong",
    location: "Punakha",
    description: "Majestic fortress at the confluence of two rivers",
    image: "/bhutan-punakha-dzong-fortress-rivers-mountains.jpg",
  },
  {
    name: "Buddha Dordenma",
    location: "Thimphu",
    description: "Giant golden Buddha statue overlooking Thimphu valley",
    image: "/bhutan-buddha-dordenma-giant-golden-statue-thimphu.jpg",
  },
  {
    name: "Dochula Pass",
    location: "Thimphu-Punakha",
    description: "Mountain pass with 108 chortens and panoramic Himalayan views",
    image: "/bhutan-dochula-pass-108-chortens-himalayan-mountain.jpg",
  },
  {
    name: "Phobjikha Valley",
    location: "Wangdue",
    description: "Glacial valley and winter home to black-necked cranes",
    image: "/phobjikha-valley-glacial-bhutan-black-necked-crane.jpg",
  },
  {
    name: "Bumthang Valley",
    location: "Central Bhutan",
    description: "Spiritual heartland with ancient temples and monasteries",
    image: "/bhutan-bumthang-valley-ancient-temples-monasteries.jpg",
  },
]

export default function TravelGuidePage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
          <div className="absolute inset-0">
            <Image
              src="/bhutan-himalayan-mountains-prayer-flags-temple-scenic.jpg"
              alt="Bhutan travel guide"
              fill
              priority
              className="scale-105 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-background" />
            <div className="absolute inset-0 hero-gradient" />
          </div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {t("guide_badge")}
              </span>
              <h1 className="mb-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-white sm:text-5xl md:text-6xl">
                {t("guide_title")}
              </h1>
              <p className="text-lg text-white/85 text-balance">{t("guide_subtitle")}</p>
            </div>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">Essentials</span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
                Everything you need before you go
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quickFacts.map(({ icon: Icon, titleKey, descKey, labelKey, valueKey }) => (
                <div key={titleKey} className="card-premium p-7">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold">{t(titleKey)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(descKey)}</p>
                  <div className="mt-4 border-t border-border/70 pt-4 text-sm">
                    <span className="font-semibold text-foreground">{t(labelKey)}</span>{" "}
                    <span className="text-muted-foreground">{t(valueKey)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visa & Permits */}
        <section className="py-20 md:py-28 section-tint">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">Entry Requirements</span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
                Visa & Permits
              </h2>
            </div>

            {/* Guarantee banner */}
            <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-accent/30 bg-accent/10 px-6 py-6 text-center sm:flex-row sm:text-left">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <ShieldCheck className="h-7 w-7" />
              </span>
              <div>
                <h3 className="font-serif text-xl font-semibold text-primary">{t("guide_visa_guarantee")}</h3>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">{t("guide_visa_guarantee_desc")}</p>
              </div>
            </div>

            {/* Key facts */}
            <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {visaFacts.map((key) => (
                <div key={key} className="rounded-xl border border-border/70 bg-card px-4 py-4 text-sm leading-relaxed text-foreground/80">
                  {t(key)}
                </div>
              ))}
            </div>

            {/* Requirements + process */}
            <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-2">
              <div>
                <h3 className="font-serif text-xl font-semibold">{t("guide_visa_requirements_title")}</h3>
                <ul className="mt-6 space-y-5">
                  {visaRequirements.map((key, i) => {
                    const Icon = visaRequirementIcons[i]
                    return (
                      <li key={key} className="flex items-start gap-4">
                        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="pt-1.5 text-sm leading-relaxed text-foreground/80">{t(key)}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div>
                <h3 className="font-serif text-xl font-semibold">{t("guide_visa_process_title")}</h3>
                <div className="relative mt-6">
                  <div className="pointer-events-none absolute bottom-4 left-5 top-4 w-px bg-gradient-to-b from-accent/50 via-border to-transparent" />
                  <ol className="space-y-6">
                    {visaSteps.map(({ icon: Icon, titleKey, descKey }, i) => (
                      <li key={titleKey} className="relative flex items-start gap-4 pl-0">
                        <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-card text-accent">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="pt-1.5">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                            Step {i + 1}
                          </span>
                          <h4 className="font-serif text-base font-semibold leading-snug">{t(titleKey)}</h4>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(descKey)}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Time to Visit — seasonal breakdown */}
        <section className="py-20 md:py-28 section-tint">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">{t("guide_best_time_title")}</span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
                Bhutan offers something unique every season
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("guide_best_time_description")}</p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {seasons.map(({ icon: Icon, titleKey, monthsKey, descKey }) => (
                <div key={titleKey} className="group card-premium p-7">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-xl font-semibold">{t(titleKey)}</h3>
                  </div>
                  <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    {t(monthsKey)}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Currency & Money */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">Practical Info</span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
                {t("guide_currency_title")}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("guide_currency_description")}</p>
            </div>

            <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currencyFacts.map(({ icon: Icon, labelKey, valueKey }) => (
                <div key={labelKey} className="card-premium p-7">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold">{t(labelKey)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(valueKey)}</p>
                </div>
              ))}

              <div className="card-premium p-7 bg-primary text-primary-foreground md:col-span-2 lg:col-span-1">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white">
                  <Banknote className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{t("guide_currency_tip_title")}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{t("guide_currency_tip")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dos and Don'ts */}
        <section className="py-20 md:py-28 section-tint">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">Etiquette</span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
                {t("guide_dos_donts")}
              </h2>
            </div>

            <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
              <div className="card-premium p-7 md:p-8">
                <h3 className="font-serif text-xl font-semibold text-secondary">{t("guide_dos")}</h3>
                <ul className="mt-5 space-y-4">
                  {dos.map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm leading-relaxed text-foreground/80">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-premium p-7 md:p-8">
                <h3 className="font-serif text-xl font-semibold text-destructive">{t("guide_donts")}</h3>
                <ul className="mt-5 space-y-4">
                  {donts.map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                        <X className="h-3 w-3" />
                      </span>
                      <span className="text-sm leading-relaxed text-foreground/80">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Top Attractions */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">Icons of the Kingdom</span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
                {t("guide_attractions_title")}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("guide_attractions_subtitle")}</p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {attractions.map((attraction) => (
                <div key={attraction.name} className="group card-premium overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={attraction.image}
                      alt={attraction.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                      <MapPin className="h-3.5 w-3.5" /> {attraction.location}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-semibold transition-colors group-hover:text-accent">{attraction.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{attraction.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12% 20%, #b08733 0%, transparent 42%), radial-gradient(circle at 88% 85%, #1d5238 0%, transparent 46%)",
            }}
          />
          <div className="container relative mx-auto px-4 text-center md:px-6">
            <span className="eyebrow justify-center">Plan With Confidence</span>
            <h2 className="mx-auto mt-5 max-w-2xl font-serif text-3xl font-semibold leading-tight text-balance text-white sm:text-4xl">
              Still have questions about visiting Bhutan?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-balance text-white/70">
              Our Bhutan-based specialists handle every detail — visas, permits, and logistics — so you can simply arrive and explore.
            </p>
            <div className="mt-9 flex justify-center">
              <Link
                href="/inquiry"
                className="btn-premium group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-wide"
              >
                Talk to a specialist
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
