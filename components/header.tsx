"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/packages", label: "Journeys" },
  { href: "/festivals", label: "Festivals" },
  { href: "/travel-guide", label: "Travel Guide" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Transparent-over-hero only on the homepage; solid elsewhere.
  const isHome = /^\/(en|es|fr|de|zh)?\/?$/.test(pathname || "/")
  const transparent = isHome && !isScrolled && !menuOpen

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const handleLinkClick = () => {
    setMenuOpen(false)
    setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 0)
  }

  return (
    <>
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        transparent
          ? "bg-transparent"
          : "border-b border-border/70 bg-background/85 shadow-[0_1px_0_rgba(28,26,22,0.04),0_10px_30px_-24px_rgba(28,26,22,0.4)] backdrop-blur-xl"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      <div className={`container mx-auto flex items-center justify-between px-4 md:px-6 transition-all duration-500 ${transparent ? "h-24" : "h-[76px]"}`}>
        {/* Brand */}
        <Link href="/" className="flex items-center transition-opacity hover:opacity-90" onClick={handleLinkClick}>
          <Image
            src="/images/final-logo.png"
            alt="Bhutan Aravia Peaks Tours and Travels"
            width={478}
            height={257}
            className={`w-auto object-contain transition-all duration-500 ${
              transparent ? "h-20 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]" : "h-16"
            }`}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className={`group relative text-[13px] font-medium tracking-wide transition-colors ${
                transparent ? "text-white/85 hover:text-white" : "text-foreground/75 hover:text-primary"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/inquiry"
            onClick={handleLinkClick}
            className="btn-premium hidden items-center justify-center rounded-full px-6 py-2.5 text-[13px] font-semibold tracking-wide sm:inline-flex"
          >
            Plan Your Journey
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ${
              transparent ? "border-white/30 text-white" : "border-border text-primary"
            }`}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile drawer — kept OUTSIDE <header> deliberately: the header's backdrop-blur-xl
        (backdrop-filter) establishes a new containing block for position:fixed descendants,
        which would confine this overlay to the header's own ~76px box instead of the viewport. */}
    <div
      className="lg:hidden"
      style={{
        position: "fixed",
        top: "76px",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        backgroundColor: "rgba(246, 242, 234, 0.98)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "opacity 300ms",
        overflowY: "auto",
      }}
    >
      <nav className="container mx-auto flex flex-col gap-1 px-4 py-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={handleLinkClick}
            className="flex items-center justify-between border-b border-border/60 py-4 font-serif text-2xl text-foreground transition-colors hover:text-accent"
          >
            {link.label}
            <span className="text-accent">&rarr;</span>
          </Link>
        ))}
        <Link
          href="/inquiry"
          onClick={handleLinkClick}
          className="btn-premium mt-6 inline-flex items-center justify-center rounded-full px-6 py-4 text-base font-semibold"
        >
          Plan Your Journey
        </Link>
      </nav>
    </div>

    {/* Spacer so fixed header doesn't overlap content on non-home pages (home hero is full-bleed) */}
    {!isHome && <div aria-hidden className="h-[76px]" />}
    </>
  )
}

export default Header
