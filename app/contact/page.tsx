"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendContactEmail } from "@/app/actions/send-contact"
import { useState } from "react"
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  User,
  Globe,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Clock,
  ArrowRight,
  BadgeCheck,
} from "lucide-react"

export default function ContactPage() {
  const { t } = useLanguage()
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t("faq_question_1"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("faq_answer_1"),
        },
      },
      {
        "@type": "Question",
        name: t("faq_question_2"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("faq_answer_2"),
        },
      },
      {
        "@type": "Question",
        name: t("faq_question_3"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("faq_answer_3"),
        },
      },
      {
        "@type": "Question",
        name: t("faq_question_4"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("faq_answer_4"),
        },
      },
    ],
  }

  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [contactReferenceNumber, setContactReferenceNumber] = useState("")

  const handleContactChange = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)

    // Honeypot is an uncontrolled input (bots fill the DOM, not React state) — read it at submit time.
    const website = String(new FormData(e.currentTarget).get("website") ?? "")

    try {
      const result = await sendContactEmail({ ...contactForm, website })

      if (result.success) {
        setSubmitSuccess(true)
        if (result.referenceNumber) {
          setContactReferenceNumber(result.referenceNumber)
        }
        setContactForm({
          fullName: "",
          email: "",
          phone: "",
          country: "",
          message: "",
        })

        setTimeout(() => {
          setSubmitSuccess(false)
          setContactReferenceNumber("")
        }, 10000)
      } else {
        setSubmitError(result.message || "Failed to send message. Please try again.")
      }
    } catch (error) {
      setSubmitError("An error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="flex-1">
        <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
          <div className="absolute inset-0">
            <Image
              src="/bhutan-punakha-dzong-fortress-rivers-mountains.jpg"
              alt="Punakha Dzong beside the river, Bhutan"
              fill
              priority
              className="scale-105 object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-background" />
            <div className="absolute inset-0 hero-gradient" />
          </div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {t("contact_get_in_touch")}
              </span>
              <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-balance text-white sm:text-5xl md:text-6xl">
                {t("contact_title")}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-balance text-white/85">
                {t("contact_description")}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 section-tint">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
              <Card className="card-premium border border-border/70 bg-card text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Mail className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">{t("contact_email_us")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("contact_email_description")}</p>
                  <p className="text-foreground font-semibold">info@bhutanaraviapeaks.com</p>
                </CardContent>
              </Card>

              <Card className="card-premium border border-border/70 bg-card text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Phone className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">{t("contact_call_us")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("contact_call_description")}</p>
                  <p className="text-foreground font-semibold">+975 17565604</p>
                </CardContent>
              </Card>

              <Card className="card-premium border border-border/70 bg-card text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <MessageCircle className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">{t("contact_whatsapp")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("contact_whatsapp_description")}</p>
                  <a
                    href="https://wa.me/97517565604"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground font-semibold hover:underline"
                  >
                    {t("contact_whatsapp_chat")}
                  </a>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              <Card className="relative overflow-hidden border border-border/70 bg-card shadow-sm card-premium">
                <div className="h-1.5 w-full bg-gradient-to-r from-accent via-primary to-accent" />
                <CardContent className="relative p-8 md:p-10">
                  <div className="mb-8">
                    <span className="eyebrow">
                      <Send className="h-3.5 w-3.5" aria-hidden="true" />
                      Quick Contact
                    </span>
                    <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
                      {t("contact_send_message")}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">{t("contact_form_description")}</p>
                  </div>

                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    {/* Honeypot — invisible to humans, bots auto-fill it. Server discards any submission where it's set. */}
                    <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
                      <label htmlFor="website">Website</label>
                      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                    </div>
                    {submitSuccess && contactReferenceNumber && (
                      <div
                        role="status"
                        aria-live="polite"
                        className="space-y-4 rounded-xl border border-accent/30 bg-accent/5 p-6"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{t("message_sent_success")}</p>
                            <p className="text-sm text-muted-foreground">{t("inquiry_success_description")}</p>
                          </div>
                        </div>
                        <div className="rounded-xl bg-primary p-5">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                            {t("inquiry_reference_number")}
                          </p>
                          <p className="font-serif text-2xl font-semibold tracking-wide text-primary-foreground md:text-3xl">
                            {contactReferenceNumber}
                          </p>
                          <p className="mt-3 text-xs text-primary-foreground/70">{t("inquiry_save_number")}</p>
                        </div>
                      </div>
                    )}

                    {submitError && (
                      <div
                        role="alert"
                        aria-live="polite"
                        className="flex gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-destructive"
                      >
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                        <p className="font-semibold">{submitError}</p>
                      </div>
                    )}

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">{t("inquiry_full_name")} *</Label>
                        <div className="relative">
                          <User
                            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <Input
                            id="contact-name"
                            required
                            placeholder="John Smith"
                            value={contactForm.fullName}
                            onChange={(e) => handleContactChange("fullName", e.target.value)}
                            className="h-12 rounded-lg border border-border/60 pl-10 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-email">{t("inquiry_email")} *</Label>
                        <div className="relative">
                          <Mail
                            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <Input
                            id="contact-email"
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={contactForm.email}
                            onChange={(e) => handleContactChange("email", e.target.value)}
                            className="h-12 rounded-lg border border-border/60 pl-10 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-phone">{t("inquiry_phone")} *</Label>
                        <div className="relative">
                          <Phone
                            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <Input
                            id="contact-phone"
                            type="tel"
                            required
                            placeholder="+1 (555) 000-0000"
                            value={contactForm.phone}
                            onChange={(e) => handleContactChange("phone", e.target.value)}
                            className="h-12 rounded-lg border border-border/60 pl-10 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-country">{t("inquiry_country")} *</Label>
                        <div className="relative">
                          <Globe
                            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <Input
                            id="contact-country"
                            required
                            placeholder="United States"
                            value={contactForm.country}
                            onChange={(e) => handleContactChange("country", e.target.value)}
                            className="h-12 rounded-lg border border-border/60 pl-10 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message">{t("your_message")} *</Label>
                      <Textarea
                        id="contact-message"
                        required
                        placeholder={t("message_placeholder")}
                        value={contactForm.message}
                        onChange={(e) => handleContactChange("message", e.target.value)}
                        className="min-h-[140px] resize-y rounded-lg border border-border/60 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-premium hover-glow group flex h-14 w-full items-center justify-center rounded-lg text-base font-semibold disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          {t("sending_message")}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          {t("contact_send_message")}
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </span>
                      )}
                    </button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="card-premium border border-border/70 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <MapPin className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-semibold mb-2">{t("contact_our_office")}</h3>
                        <p className="text-sm text-muted-foreground">{t("contact_office_address")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-premium border border-border/70 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Clock className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-semibold mb-2">{t("contact_business_hours")}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {t("contact_hours_weekday")}
                          <br />
                          {t("contact_hours_saturday")}
                          <br />
                          {t("contact_hours_sunday")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-premium border border-border/70 bg-muted/30 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-serif text-lg font-semibold mb-4">{t("contact_why_contact")}</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-2.5">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <span>{t("contact_reason_1")}</span>
                      </li>
                      <li className="flex gap-2.5">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <span>{t("contact_reason_2")}</span>
                      </li>
                      <li className="flex gap-2.5">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <span>{t("contact_reason_3")}</span>
                      </li>
                      <li className="flex gap-2.5">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <span>{t("contact_reason_4")}</span>
                      </li>
                      <li className="flex gap-2.5">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <span>{t("contact_reason_5")}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="eyebrow justify-center">Common Questions</span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
                {t("faq_title")}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("faq_description")}</p>
            </div>

            <div className="mx-auto max-w-3xl space-y-4">
              <Card className="card-premium border border-border/70 border-l-4 border-l-accent bg-card">
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-semibold mb-2">{t("faq_question_1")}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t("faq_answer_1")}</p>
                </CardContent>
              </Card>

              <Card className="card-premium border border-border/70 border-l-4 border-l-accent bg-card">
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-semibold mb-2">{t("faq_question_2")}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t("faq_answer_2")}</p>
                </CardContent>
              </Card>

              <Card className="card-premium border border-border/70 border-l-4 border-l-accent bg-card">
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-semibold mb-2">{t("faq_question_3")}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t("faq_answer_3")}</p>
                </CardContent>
              </Card>

              <Card className="card-premium border border-border/70 border-l-4 border-l-accent bg-card">
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-semibold mb-2">{t("faq_question_4")}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t("faq_answer_4")}</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-10 text-center">
              <p className="mb-4 text-muted-foreground">{t("faq_more_questions")}</p>
              <Button variant="outline" className="hover-glow" asChild>
                <Link href="/travel-guide">{t("faq_view_travel_guide")}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12% 20%, #b08733 0%, transparent 42%), radial-gradient(circle at 88% 85%, #1d5238 0%, transparent 46%)",
            }}
          />
          <div className="container relative mx-auto px-4 text-center md:px-6">
            <span className="eyebrow justify-center">Ready When You Are</span>
            <h2 className="mx-auto mt-5 max-w-2xl font-serif text-3xl font-semibold leading-tight text-balance text-white sm:text-4xl">
              {t("contact_ready_planning")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-balance text-white/70">
              {t("contact_ready_description")}
            </p>
            <Link
              href="/inquiry"
              className="btn-premium hover-glow group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-wide"
            >
              {t("get_consultation")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
