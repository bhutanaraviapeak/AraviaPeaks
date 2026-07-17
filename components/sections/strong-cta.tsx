import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"

export function StrongCTA() {
  return (
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
        <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl font-semibold leading-tight text-balance text-white sm:text-4xl lg:text-[2.75rem]">
          Begin your Bhutan journey with Aravia Peaks
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-balance text-white/70">
          Speak with Bhutanese experts to design a journey that feels personal, immersive, and unforgettable — with no
          obligation.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/inquiry"
            className="btn-premium group inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-wide sm:w-auto"
          >
            Request a private quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="https://wa.me/97517565604"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-8 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-white/80 hover:bg-white/10 sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
