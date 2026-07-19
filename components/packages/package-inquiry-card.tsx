import Link from "next/link"
import { Check, MessageCircle, Mail, ArrowRight, ShieldCheck } from "lucide-react"

const WHATSAPP_NUMBER = "+97517565604"
const EMAIL_ADDRESS = "info@bhutanaraviapeaks.com"

const trustPoints = ["Licensed local guides", "Flexible dates & custom routes", "24-hour response guarantee"]

export function PackageInquiryCard({
  packageSlug,
  packageTitle,
  packageCategory,
  durationLabel,
  priceLabel,
}: {
  packageSlug: string
  packageTitle: string
  packageCategory: string
  durationLabel?: string
  priceLabel?: string | null
}) {
  const inquiryParams = new URLSearchParams({
    package: packageSlug,
    name: packageTitle,
    category: packageCategory,
    ...(durationLabel ? { duration: durationLabel } : {}),
  })
  const inquiryHref = `/inquiry?${inquiryParams.toString()}`

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hi! I would like to know more about ${packageTitle || "a Bhutan package"}.`,
  )}`
  const emailLink = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(`Inquiry: ${packageTitle || "Bhutan Tour"}`)}`

  return (
    <div className="card-premium overflow-hidden">
      {/* Price / heading band */}
      <div className="border-b border-border/70 bg-muted/40 p-6">
        {priceLabel ? (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Starting from</p>
            <p className="mt-1 font-serif text-3xl font-semibold text-primary">
              {priceLabel}
              <span className="ml-1 text-sm font-normal text-muted-foreground">/ person</span>
            </p>
          </>
        ) : (
          <p className="font-serif text-2xl font-semibold text-primary">Plan this journey</p>
        )}
        <p className="mt-2 text-sm text-muted-foreground">
          Talk to a Bhutan expert for pricing, the best travel dates, and full customization.
        </p>
      </div>

      <div className="space-y-6 p-6">
        <div className="grid gap-3">
          <Link
            href={inquiryHref}
            className="btn-premium hover-glow group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide"
          >
            Customize &amp; request a quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground/80 transition-colors hover:border-accent hover:text-accent"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp our team
          </a>
          <a
            href={emailLink}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground/80 transition-colors hover:border-accent hover:text-accent"
          >
            <Mail className="h-4 w-4" aria-hidden="true" /> Email for a quote
          </a>
        </div>

        <div className="grid gap-2.5 border-t border-border/70 pt-5">
          {trustPoints.map((point) => (
            <div key={point} className="flex items-center gap-2.5 text-sm text-foreground/75">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              {point}
            </div>
          ))}
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> Secure inquiry — your details stay
            private.
          </div>
        </div>
      </div>
    </div>
  )
}
