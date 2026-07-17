import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  Mail,
  Phone,
  Globe,
  Compass,
  CalendarDays,
  Users,
  Clock3,
  MessageSquare,
  AlertCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react"

type InquirySearchParams = {
  [key: string]: string | string[] | undefined
}

export const metadata: Metadata = {
  title: "Request a Quote | Bhutan Aravia Peaks",
  description:
    "Tell us about your Bhutan trip. We will craft a tailored itinerary and get back to you within 24 hours.",
}

const getStringValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] ?? "" : value ?? ""

const mapPackageType = (category: string) => {
  if (category === "Festival Tour") return "festival"
  if (category === "Cultural Tour") return "cultural"
  if (category === "Trekking") return "trekking"
  if (category === "Luxury") return "luxury"
  return ""
}

const mapDuration = (durationLabel: string) => {
  if (durationLabel.includes("13") || durationLabel.includes("15")) return "13-15"
  if (durationLabel.includes("10") || durationLabel.includes("11") || durationLabel.includes("12")) return "9-12"
  if (durationLabel.includes("7") || durationLabel.includes("8")) return "6-8"
  if (durationLabel.includes("5") || durationLabel.includes("4") || durationLabel.includes("3")) return "3-5"
  return ""
}

const selectClass =
  "flex h-11 w-full appearance-none rounded-lg border border-border/60 bg-background bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23696969%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center] px-3.5 pr-10 text-sm text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"

const inputClass =
  "h-11 rounded-lg border border-border/60 pl-10 text-sm transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"

export default async function InquiryPage({
  searchParams,
}: {
  searchParams?: Promise<InquirySearchParams>
}) {
  const params = (await searchParams) ?? {}
  const status = getStringValue(params.status)
  const errorMessage = getStringValue(params.errorMessage)
  const errorFields = new Set(getStringValue(params.errorFields).split(",").filter(Boolean))

  const packageName = getStringValue(params.name)
  const packageCategory = getStringValue(params.category)
  const packageDuration = getStringValue(params.duration)

  const prefillPackageType = mapPackageType(packageCategory)
  const prefillDuration = mapDuration(packageDuration)
  const prefillMessage = packageName ? `I am interested in the ${packageName} package.` : ""

  const values = {
    fullName: getStringValue(params.fullName),
    email: getStringValue(params.email),
    phone: getStringValue(params.phone),
    country: getStringValue(params.country),
    packageType: getStringValue(params.packageType) || prefillPackageType,
    travelMonth: getStringValue(params.travelMonth),
    groupSize: getStringValue(params.groupSize),
    duration: getStringValue(params.durationValue) || prefillDuration,
    message: getStringValue(params.message) || prefillMessage,
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-background to-muted/30 pt-28 pb-20 md:pt-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="eyebrow justify-center">Plan Your Journey</span>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
              Request a quote for your <span className="text-gradient">Bhutan adventure</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-balance">
              Tell us your travel goals and we will craft a tailored itinerary within 24 hours.
            </p>
          </div>

          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card className="card-premium overflow-hidden border border-border/70 shadow-sm">
                  <div className="h-1.5 w-full bg-gradient-to-r from-accent via-primary to-accent" />
                  <CardHeader className="border-b border-border/60 bg-muted/30 px-6 py-6 md:px-8">
                    <CardTitle className="font-serif text-2xl font-semibold text-foreground">
                      Inquiry Form
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Share your dates, interests, and preferences. We will handle the details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 py-8 md:px-8">
                    {status === "error" && (
                      <div
                        role="alert"
                        aria-live="polite"
                        className="mb-8 flex gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-destructive"
                      >
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                        <div>
                          <p className="font-semibold">
                            We need a little more detail before we can send your inquiry.
                          </p>
                          <p className="mt-1 text-sm text-destructive/80">
                            {errorMessage || "Please review the highlighted fields below and try again."}
                          </p>
                        </div>
                      </div>
                    )}

                    <form action="/api/inquiry" method="post" className="space-y-10" noValidate>
                      <div className="space-y-6">
                        <h3 className="eyebrow">Personal Information</h3>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full name *</Label>
                            <div className="relative">
                              <User
                                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                aria-hidden="true"
                              />
                              <Input
                                id="fullName"
                                name="fullName"
                                placeholder="Enter your full name"
                                defaultValue={values.fullName}
                                required
                                aria-invalid={errorFields.has("fullName")}
                                aria-describedby={errorFields.has("fullName") ? "fullName-error" : undefined}
                                className={inputClass}
                              />
                            </div>
                            {errorFields.has("fullName") && (
                              <p id="fullName-error" className="text-sm text-destructive" role="alert">
                                Please enter your full name.
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email address *</Label>
                            <div className="relative">
                              <Mail
                                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                aria-hidden="true"
                              />
                              <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                defaultValue={values.email}
                                required
                                aria-invalid={errorFields.has("email")}
                                aria-describedby={errorFields.has("email") ? "email-error" : undefined}
                                className={inputClass}
                              />
                            </div>
                            {errorFields.has("email") && (
                              <p id="email-error" className="text-sm text-destructive" role="alert">
                                Please enter a valid email address.
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone number</Label>
                            <div className="relative">
                              <Phone
                                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                aria-hidden="true"
                              />
                              <Input
                                id="phone"
                                type="tel"
                                name="phone"
                                placeholder="Optional"
                                defaultValue={values.phone}
                                className={inputClass}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country of residence *</Label>
                            <div className="relative">
                              <Globe
                                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                aria-hidden="true"
                              />
                              <Input
                                id="country"
                                name="country"
                                placeholder="Country"
                                defaultValue={values.country}
                                required
                                aria-invalid={errorFields.has("country")}
                                aria-describedby={errorFields.has("country") ? "country-error" : undefined}
                                className={inputClass}
                              />
                            </div>
                            {errorFields.has("country") && (
                              <p id="country-error" className="text-sm text-destructive" role="alert">
                                Please add your country.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="eyebrow">Trip Details</h3>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="packageType">Package type *</Label>
                            <div className="relative">
                              <Compass
                                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                aria-hidden="true"
                              />
                              <select
                                id="packageType"
                                name="packageType"
                                defaultValue={values.packageType}
                                required
                                aria-invalid={errorFields.has("packageType")}
                                aria-describedby={errorFields.has("packageType") ? "packageType-error" : undefined}
                                className={`${selectClass} pl-10`}
                              >
                                <option value="" disabled>
                                  Select a package type
                                </option>
                                <option value="cultural">Cultural tour</option>
                                <option value="festival">Festival tour</option>
                                <option value="trekking">Trekking</option>
                                <option value="luxury">Luxury</option>
                                <option value="custom">Custom</option>
                              </select>
                            </div>
                            {errorFields.has("packageType") && (
                              <p id="packageType-error" className="text-sm text-destructive" role="alert">
                                Please select a package type.
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="travelMonth">Travel month *</Label>
                            <div className="relative">
                              <CalendarDays
                                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                aria-hidden="true"
                              />
                              <select
                                id="travelMonth"
                                name="travelMonth"
                                defaultValue={values.travelMonth}
                                required
                                aria-invalid={errorFields.has("travelMonth")}
                                aria-describedby={errorFields.has("travelMonth") ? "travelMonth-error" : undefined}
                                className={`${selectClass} pl-10`}
                              >
                                <option value="" disabled>
                                  Select a month
                                </option>
                                <option value="jan-2026">January 2026</option>
                                <option value="feb-2026">February 2026</option>
                                <option value="mar-2026">March 2026</option>
                                <option value="apr-2026">April 2026</option>
                                <option value="may-2026">May 2026</option>
                                <option value="jun-2026">June 2026</option>
                                <option value="jul-2026">July 2026</option>
                                <option value="aug-2026">August 2026</option>
                                <option value="sep-2026">September 2026</option>
                                <option value="oct-2026">October 2026</option>
                                <option value="nov-2026">November 2026</option>
                                <option value="dec-2026">December 2026</option>
                              </select>
                            </div>
                            {errorFields.has("travelMonth") && (
                              <p id="travelMonth-error" className="text-sm text-destructive" role="alert">
                                Please select a travel month.
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="groupSize">Group size *</Label>
                            <div className="relative">
                              <Users
                                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                aria-hidden="true"
                              />
                              <select
                                id="groupSize"
                                name="groupSize"
                                defaultValue={values.groupSize}
                                required
                                aria-invalid={errorFields.has("groupSize")}
                                aria-describedby={errorFields.has("groupSize") ? "groupSize-error" : undefined}
                                className={`${selectClass} pl-10`}
                              >
                                <option value="" disabled>
                                  Select group size
                                </option>
                                <option value="1">1 person</option>
                                <option value="2">2 people</option>
                                <option value="3-4">3-4 people</option>
                                <option value="5-8">5-8 people</option>
                                <option value="9+">9+ people</option>
                              </select>
                            </div>
                            {errorFields.has("groupSize") && (
                              <p id="groupSize-error" className="text-sm text-destructive" role="alert">
                                Please select your group size.
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="durationValue">Trip duration *</Label>
                            <div className="relative">
                              <Clock3
                                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                aria-hidden="true"
                              />
                              <select
                                id="durationValue"
                                name="duration"
                                defaultValue={values.duration}
                                required
                                aria-invalid={errorFields.has("duration")}
                                aria-describedby={errorFields.has("duration") ? "duration-error" : undefined}
                                className={`${selectClass} pl-10`}
                              >
                                <option value="" disabled>
                                  Select duration
                                </option>
                                <option value="3-5">3-5 days</option>
                                <option value="6-8">6-8 days</option>
                                <option value="9-12">9-12 days</option>
                                <option value="13-15">13-15 days</option>
                                <option value="15+">15+ days</option>
                              </select>
                            </div>
                            {errorFields.has("duration") && (
                              <p id="duration-error" className="text-sm text-destructive" role="alert">
                                Please select your trip duration.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="eyebrow">Additional Information</h3>
                        <div className="space-y-2">
                          <Label htmlFor="message" className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                            Trip notes
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell us about your interests, pace, and must-sees..."
                            defaultValue={values.message}
                            className="min-h-[120px] rounded-lg border border-border/60 text-sm transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn-premium hover-glow group flex h-14 w-full items-center justify-center rounded-lg text-base font-semibold"
                      >
                        <span className="inline-flex items-center gap-2">
                          Send inquiry
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="card-premium border border-border/70 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2.5 font-serif text-lg font-semibold">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Phone className="h-4 w-4" aria-hidden="true" />
                      </span>
                      Contact Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Phone</p>
                      <p className="text-base font-semibold text-foreground">+975 17565604</p>
                    </div>
                    <div className="rule-gold" />
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Email</p>
                      <p className="text-base font-semibold text-foreground break-all">
                        bhutanaraviapeak@gmail.com
                      </p>
                    </div>
                    <div className="rule-gold" />
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Office</p>
                      <p className="text-base font-semibold text-foreground">Thimphu, Bhutan</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="card-premium border border-border/70 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2.5 font-serif text-lg font-semibold">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                      </span>
                      What Happens Next?
                    </CardTitle>
                    <CardDescription>Expect a response within 24 hours.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                    <div className="flex gap-3">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <p>We review your request, match you with a local expert, and craft a personalized itinerary.</p>
                    </div>
                    <div className="flex gap-3">
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <p>You can reply directly to our email to refine or add details at any time.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
