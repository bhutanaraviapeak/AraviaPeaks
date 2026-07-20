import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative bg-primary text-white">
      <div className="rule-gold" />
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-2xl font-semibold">Bhutan Aravia Peaks</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              A locally owned Bhutan tour operator delivering authentic cultural journeys, festival experiences, and
              Himalayan adventures with care and expertise.
            </p>
            {/* Facebook/Instagram icons removed until real profiles exist — dead "#" links
                hurt trust. Re-add here with the real profile URLs once the accounts are live. */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/97517565604"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/60 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">About Bhutan</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/travel-guide" className="text-white/80 hover:text-white transition-colors">
                  Visa & Travel Info
                </Link>
              </li>
              <li>
                <Link href="/festivals" className="text-white/80 hover:text-white transition-colors">
                  Festival Calendar
                </Link>
              </li>
              <li>
                <Link href="/bhutan/farmhouses-homestays" className="text-white/80 hover:text-white transition-colors">
                  Hotels & Homestays
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">Tours</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/packages" className="text-white/80 hover:text-white transition-colors">
                  All Packages
                </Link>
              </li>
              <li>
                <Link href="/packages/festival/paro-tshechu" className="text-white/80 hover:text-white transition-colors">
                  Festival Tours
                </Link>
              </li>
              <li>
                <Link href="/packages/trekking/druk-path-trek" className="text-white/80 hover:text-white transition-colors">
                  Trekking Adventures
                </Link>
              </li>
              <li>
                <Link href="/packages/luxury/luxury-bhutan" className="text-white/80 hover:text-white transition-colors">
                  Luxury Escapes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>Thimphu, Bhutan</li>
              <li>
                <a href="tel:+97517565604" className="hover:text-white transition-colors">
                  +975 17565604
                </a>
              </li>
              <li>
                <a href="mailto:info@bhutanaraviapeaks.com" className="hover:text-white transition-colors">
                  info@bhutanaraviapeaks.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-xs text-white/70">
              &copy; {new Date().getFullYear()} Bhutan Aravia Peaks. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-white/70">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms &amp; Conditions
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Business-level identifiers only — never owner names or CID numbers here. */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">
              Licensed Bhutan Tour Operator &middot; License No. 06013153
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">
              DoT Clearance DOT/2025/918
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">
              Sustainable Travel
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
