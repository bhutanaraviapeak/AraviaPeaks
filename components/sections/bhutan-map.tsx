"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { SectionHeader } from "@/components/sections/section-header"
import type { MapRegion } from "@/components/sections/client-bhutan-map"

const ClientMap = dynamic(() => import("./client-bhutan-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted/40 text-sm text-muted-foreground">
      Loading interactive map…
    </div>
  ),
})

const regions: MapRegion[] = [
  { name: "Paro", description: "Tiger's Nest & heritage", region: "western", lat: 27.4287, lng: 89.4166 },
  { name: "Thimphu", description: "Capital culture & arts", region: "western", lat: 27.4728, lng: 89.639 },
  { name: "Punakha", description: "Dzongs & rivers", region: "western", lat: 27.5916, lng: 89.8775 },
  { name: "Bumthang", description: "Spiritual heartland", region: "central", lat: 27.6412, lng: 90.7136 },
  { name: "Haa Valley", description: "Alpine scenery", region: "western", lat: 27.3846, lng: 89.2806 },
  { name: "Phobjikha", description: "Black-necked cranes", region: "central", lat: 27.4452, lng: 90.2146 },
]

export function BhutanMap() {
  const [selectedRegion, setSelectedRegion] = useState("Paro")

  return (
    <section className="py-20 md:py-28 section-tint">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow="Explore the Kingdom"
          title="Where your Bhutan journey unfolds"
          description="Select a valley to fly there on the map and see the experiences each region reveals — from sacred western dzongs to the crane-filled central highlands."
        />

        <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-2">
          {/* Live interactive map */}
          <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-border/70 shadow-[0_24px_60px_-30px_rgba(18,37,54,0.4)] lg:min-h-full">
            <ClientMap regions={regions} selectedRegion={selectedRegion} onSelect={setSelectedRegion} />
          </div>

          {/* Region selector */}
          <div className="grid content-center gap-4 sm:grid-cols-2">
            {regions.map((region) => {
              const active = selectedRegion === region.name
              return (
                <button
                  key={region.name}
                  type="button"
                  onClick={() => setSelectedRegion(region.name)}
                  className={`group cursor-pointer rounded-2xl border p-5 text-left transition-all duration-300 ${
                    active
                      ? "border-accent bg-card shadow-[0_18px_40px_-24px_rgba(18,37,54,0.5)] -translate-y-0.5"
                      : "border-border/70 bg-card/60 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-card"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg font-semibold">{region.name}</h3>
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full transition-colors ${active ? "bg-accent" : "bg-border group-hover:bg-accent/50"}`}
                    />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{region.description}</p>
                  <span
                    className={`mt-3 inline-block text-[11px] font-semibold uppercase tracking-[0.16em] ${active ? "text-accent" : "text-transparent"}`}
                  >
                    {region.region} bhutan
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
