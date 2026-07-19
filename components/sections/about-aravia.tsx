import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Users, Clock } from "lucide-react"

const credentials = [
  { icon: Award, value: "Licensed", label: "Bhutan tour operator" },
  { icon: Users, value: "100%", label: "Bhutanese-owned team" },
  { icon: Clock, value: "24h", label: "Response guarantee" },
]

export function AboutAravia() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Imagery */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="/bhutan-traditional-colorful-dzong-architecture.jpg"
                alt="A Bhutanese dzong set against the Himalayas"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating credential card */}
            <div className="absolute -bottom-6 -right-2 hidden max-w-[15rem] rounded-2xl border border-border/70 bg-card/95 p-5 shadow-[0_24px_50px_-24px_rgba(18,37,54,0.5)] backdrop-blur sm:block">
              <p className="font-serif text-2xl font-semibold text-primary">Founder-led</p>
              <p className="mt-1 text-sm text-muted-foreground">
                You work directly with the people who plan every journey — not a call center.
              </p>
            </div>
          </div>

          {/* Copy */}
          <div>
            <span className="eyebrow">About Aravia Peaks</span>
            <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
              Bhutanese expertise, global service standards
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Aravia Peaks is a Bhutan-based travel house dedicated to crafting meaningful journeys across the Kingdom
                of Bhutan. We were born from a simple belief — that the most extraordinary travel comes from the people
                who call a place home.
              </p>
              <p>
                Combining deep local knowledge with global service standards, we curate personalized experiences that
                reveal Bhutan far beyond the ordinary — private festival access, remote Himalayan trails, and quiet
                sanctuary stays, all handled end to end.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-y border-border/70 py-6">
              {credentials.map(({ icon: Icon, value, label }) => (
                <div key={label}>
                  <Icon className="mb-2 h-5 w-5 text-accent" />
                  <p className="font-serif text-xl font-semibold text-primary">{value}</p>
                  <p className="text-xs leading-snug text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
            >
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
