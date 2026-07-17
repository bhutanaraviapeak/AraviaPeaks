"use client"

import heroImage from "@/public/images/hero-poster.jpg"
import Link from "next/link"
import { ShieldCheck, Clock, Sparkles, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const trustChips = [
  { icon: ShieldCheck, label: "Licensed Bhutanese operator" },
  { icon: Clock, label: "24-hour response" },
  { icon: Sparkles, label: "Private festival access" },
]

const stats = [
  { value: "15+", label: "Years guiding Bhutan" },
  { value: "1,200+", label: "Journeys crafted" },
  { value: "4.9/5", label: "Traveler rating" },
]

export function HomeHero() {
  const { t } = useLanguage()

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          style={{ filter: "saturate(1.08) contrast(1.05) brightness(1.02)" }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroImage.src}
          aria-hidden="true"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
        {/* Cinematic scrim: soft edge vignette + top/bottom darkening that anchors the
            text while keeping the footage vivid through the middle. Near-black (not navy)
            so it reads as natural shadow rather than a colour layer sitting on top. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 48%, transparent 46%, rgba(6,12,20,0.42) 100%), linear-gradient(180deg, rgba(6,12,20,0.62) 0%, rgba(6,12,20,0.16) 30%, rgba(6,12,20,0.16) 54%, rgba(6,12,20,0.52) 80%, rgba(6,12,20,0.82) 100%)",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-28 pb-16 text-center md:px-6">
        <div className="animate-fade-in-up mx-auto max-w-4xl">
          <span className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t("licensed_tour_operator")}
          </span>

          <h1
            className="font-serif text-[2.6rem] font-semibold leading-[1.05] text-balance text-white sm:text-6xl lg:text-7xl"
            style={{ filter: "drop-shadow(0 2px 22px rgba(0,0,0,0.45))" }}
          >
            Bhutan, curated by the
            <span className="italic text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#e9cd86,#c79a3f)" }}>
              {" "}locals who live here
            </span>
          </h1>

          <p
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-balance text-white/90 md:text-xl"
            style={{ textShadow: "0 2px 18px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.35)" }}
          >
            Private cultural journeys, Himalayan treks, and mindful retreats — designed one traveler at a time, with permits,
            logistics, and expert guides handled end to end.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/inquiry"
              className="btn-premium group inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-wide sm:w-auto"
            >
              Request a private quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/packages"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-8 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-white/80 hover:bg-white/10 sm:w-auto"
            >
              Explore journeys
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {trustChips.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-white/70">
                <Icon className="h-4 w-4 text-accent" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Trust stats bar */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4 border-t border-white/15 pt-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-2xl font-semibold text-white sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/55 sm:text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 md:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-9 w-[1.5px] overflow-hidden rounded-full bg-white/25">
          <div className="h-3 w-full animate-floaty bg-accent" />
        </div>
      </div>
    </section>
  )
}
