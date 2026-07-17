"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import Image from "next/image"
import { Home, Sparkles, Target, ShieldCheck, ArrowRight, Quote } from "lucide-react"

const pillars = [
  { icon: Home, titleKey: "locally_owned", descKey: "locally_owned_text" },
  { icon: Sparkles, titleKey: "authentic_experiences", descKey: "about_authentic_text" },
  { icon: Target, titleKey: "personalized_journeys", descKey: "personalized_journeys_text" },
  { icon: ShieldCheck, titleKey: "licensed_trusted", descKey: "about_trusted_text" },
] as const

const stats = [
  { value: "15+", label: "Years guiding Bhutan" },
  { value: "1,200+", label: "Journeys crafted" },
  { value: "100%", label: "Bhutanese-owned team" },
  { value: "4.9/5", label: "Traveler rating" },
]

export default function AboutPage() {
  const { t } = useLanguage()
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Bhutan Aravia Peaks",
    url: "https://aravia-peaks.vercel.app/about",
    description: t("about_intro"),
    areaServed: "Bhutan",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pb-10 pt-24 md:pb-14 md:pt-32">
          <div className="absolute inset-0">
            <Image
              src="/bhutan-traditional-colorful-dzong-fortress-archite.jpg"
              alt="Tashichho Dzong, Thimphu"
              fill
              priority
              className="scale-105 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
            <div className="absolute inset-0 hero-gradient" />
          </div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Our Story
              </span>
              <h1 className="mb-5 font-serif text-3xl font-semibold leading-[1.15] tracking-tight text-balance text-white sm:text-4xl md:text-5xl">
                {t("about_welcome")}
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/85 text-balance md:text-lg">
                {t("about_intro")}
              </p>
            </div>

            {/* Trust stats */}
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/15 pt-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-serif text-xl font-semibold text-white sm:text-2xl">{s.value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/55 sm:text-[11px]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* A story from home — genuine, first-person narrative */}
        <section className="relative overflow-hidden py-20 md:py-28 section-tint">
          <div className="container relative px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <div className="mx-auto mb-8 h-px w-16 rule-gold" />
              <p className="text-center font-serif text-2xl italic leading-snug text-balance text-primary md:text-3xl">
                &ldquo;Bhutan is not a place you visit. It&rsquo;s a place that visits you.&rdquo;
              </p>

              <div className="mx-auto mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  When we were children, our grandmothers woke before sunrise to spin prayer wheels and murmur
                  mantras into the cold mountain air. We didn&rsquo;t understand it then — we were too busy racing
                  down terraced fields to catch the first school bus, breath fogging, boots crunching frost.
                </p>
                <p>
                  It was only years later, watching a traveler stand in silence before Tiger&rsquo;s Nest, eyes
                  wet, that we understood what our grandmothers already knew: this land holds something most of
                  the world has forgotten how to feel.
                </p>
                <p>
                  We started Aravia Peaks not to sell tours, but to share what we were lucky enough to be born
                  into. Every itinerary we build carries a piece of that same morning air — the cold, the quiet,
                  the reverence. We don&rsquo;t rush you past our home. We walk you through it, the way our
                  grandmothers once walked us.
                </p>
              </div>

              <p className="mt-10 text-center font-serif text-lg italic text-accent">
                — The Aravia Peaks family, Thimphu, Bhutan
              </p>
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="relative order-2 lg:order-1">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                  <Image
                    src="/young-monks-bumthang-bhutan.jpg"
                    alt="Young monks in Bumthang, Bhutan"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 -right-2 hidden max-w-[15rem] rounded-2xl border border-border/70 bg-card/95 p-5 shadow-[0_24px_50px_-24px_rgba(18,37,54,0.5)] backdrop-blur sm:block">
                  <Quote className="h-6 w-6 text-accent/40" />
                  <p className="mt-2 font-serif text-base italic leading-snug text-foreground/90">
                    {t("who_we_are_tagline")}
                  </p>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <span className="eyebrow">{t("who_we_are")}</span>
                <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
                  Born and raised in the Land of the Thunder Dragon
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t("who_we_are_text")}</p>
                <p className="mt-6 font-serif text-xl font-semibold text-foreground sm:hidden">
                  {t("who_we_are_tagline")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12% 20%, #b08733 0%, transparent 42%), radial-gradient(circle at 88% 85%, #1d5238 0%, transparent 46%)",
            }}
          />
          <div className="container relative mx-auto px-4 text-center md:px-6">
            <span className="eyebrow justify-center">{t("our_mission")}</span>
            <h2 className="mx-auto mt-5 max-w-2xl font-serif text-3xl font-semibold leading-tight text-balance text-white sm:text-4xl">
              {t("our_mission_text")}
            </h2>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center">What Sets Us Apart</span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
                {t("what_makes_different")}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("what_makes_different_subtitle")}</p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {pillars.map(({ icon: Icon, titleKey, descKey }) => (
                <div key={titleKey} className="group card-premium p-7">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold">{t(titleKey)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Discover Bhutan With Heart */}
        <section className="py-20 md:py-28 section-tint">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow justify-center">Our Philosophy</span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
                {t("discover_with_heart")}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t("discover_with_heart_text")}</p>
              <div className="mx-auto mt-10 max-w-xl rule-gold" />
              <p className="mt-8 font-serif text-2xl font-semibold text-primary">{t("discover_tagline")}</p>
              <p className="mt-2 text-lg italic text-muted-foreground">{t("discover_subtitle")}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12% 20%, #b08733 0%, transparent 42%), radial-gradient(circle at 88% 85%, #1d5238 0%, transparent 46%)",
            }}
          />
          <div className="container relative mx-auto px-4 text-center md:px-6">
            <span className="eyebrow justify-center">Start Planning</span>
            <h2 className="mx-auto mt-5 max-w-2xl font-serif text-3xl font-semibold leading-tight text-balance text-white sm:text-4xl">
              {t("ready_adventure")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-balance text-white/70">
              {t("ready_adventure_description")}
            </p>
            <div className="mt-9 flex justify-center">
              <Link
                href="/inquiry"
                className="btn-premium group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-wide"
              >
                {t("plan_journey")}
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
