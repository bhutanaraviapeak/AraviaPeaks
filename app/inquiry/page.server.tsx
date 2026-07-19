import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getPackageBySlug } from "@/lib/data/packages"
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
  MapPin,
  CalendarClock,
  Heart,
  Wallet,
  Gauge,
  Hotel,
} from "lucide-react"

const INTEREST_OPTIONS = [
  "Culture & Heritage",
  "Trekking & Adventure",
  "Festivals & Events",
  "Wildlife & Nature",
  "Wellness & Spa",
  "Photography",
  "Family-Friendly",
  "Luxury & Comfort",
]

const REGION_OPTIONS = [
  "Paro",
  "Thimphu",
  "Punakha",
  "Bumthang",
  "Haa Valley",
  "Phobjikha Valley",
  "Eastern Bhutan",
  "Not sure — recommend for me",
]

const CUSTOMIZATION_OPTIONS = [
  { value: "add-days", label: "Add extra days", placeholder: "How many extra days, and where?" },
  { value: "reduce-days", label: "Reduce the duration", placeholder: "How many days should we remove?" },
  { value: "add-destination", label: "Add another destination", placeholder: "Which destination would you like to add?" },
  { value: "remove-destination", label: "Remove a destination", placeholder: "Which destination would you like to remove?" },
  { value: "upgrade-accommodation", label: "Upgrade accommodation", placeholder: "e.g., 5-star hotel, boutique stay..." },
  { value: "include-festival", label: "Include a festival", placeholder: "Which festival, if you have one in mind?" },
  { value: "add-trekking", label: "Add trekking or hiking", placeholder: "Preferred trek or difficulty level?" },
  { value: "add-wellness", label: "Add wellness or spa experience", placeholder: "e.g., spa day, hot-stone bath..." },
  { value: "include-homestay", label: "Include a homestay", placeholder: "Any preferred region for the homestay?" },
  { value: "special-celebration", label: "Add a special celebration", placeholder: "e.g., anniversary, birthday..." },
  { value: "other", label: "Other request", placeholder: "Tell us more" },
]

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

  // The slug is the only package identifier we trust — it's looked up server-side
  // here (and re-verified again in the API route on submit) rather than trusting
  // the "name"/"category"/"duration" URL text, which a visitor could hand-edit.
  const packageSlug = getStringValue(params.package)
  const pkg = packageSlug ? getPackageBySlug(packageSlug) : undefined
  const isPackageMode = Boolean(pkg)

  const packageName = getStringValue(params.name)
  const packageCategory = getStringValue(params.category)
  const packageDuration = getStringValue(params.duration)

  const prefillPackageType = pkg ? pkg.category : mapPackageType(packageCategory)
  const prefillDuration = pkg ? mapDuration(pkg.durationLabel) : mapDuration(packageDuration)
  const prefillMessage = !pkg && packageName ? `I am interested in the ${packageName} package.` : ""

  const selectedChangeTypes = new Set(getStringValue(params.changeTypes).split(",").filter(Boolean))

  const changeDetailValues: Record<string, string> = {}
  getStringValue(params.changeDetails)
    .split("|")
    .filter(Boolean)
    .forEach((pair) => {
      const [key, value] = pair.split(":")
      if (key) changeDetailValues[decodeURIComponent(key)] = decodeURIComponent(value || "")
    })

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
    pace: getStringValue(params.pace),
    accommodation: getStringValue(params.accommodation),
    budget: getStringValue(params.budget),
  }

  const selectedInterests = new Set(getStringValue(params.interests).split(",").filter(Boolean))
  const selectedRegions = new Set(getStringValue(params.regions).split(",").filter(Boolean))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-background to-muted/30 pt-28 pb-20 md:pt-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            {isPackageMode && pkg ? (
              <>
                <span className="eyebrow justify-center">Customize Your Journey</span>
                <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
                  Customize your <span className="text-gradient">{pkg.title}</span> journey
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-balance">
                  You&rsquo;ve selected this itinerary as your starting point. Tell us what you&rsquo;d like to add,
                  remove, upgrade, or change.
                </p>
              </>
            ) : (
              <>
                <span className="eyebrow justify-center">Plan Your Journey</span>
                <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
                  Design your <span className="text-gradient">Bhutan adventure</span>
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-balance">
                  Share your interests, travel style, and preferred experiences — we will craft a tailored itinerary
                  within 24 hours.
                </p>
              </>
            )}
          </div>

          {isPackageMode && pkg && (
            <div className="mx-auto mb-8 max-w-6xl">
              <div className="card-premium border border-border/70 p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">Your Starting Itinerary</p>
                    <h2 className="mt-3 font-serif text-2xl font-semibold text-foreground">{pkg.title}</h2>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-accent" aria-hidden="true" /> {pkg.region}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="h-4 w-4 text-accent" aria-hidden="true" /> {pkg.durationLabel}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarClock className="h-4 w-4 text-accent" aria-hidden="true" /> {pkg.bestTime}
                      </span>
                    </div>
                  </div>
                  {pkg.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {pkg.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {pkg.itinerary.length > 0 && (
                  <div className="mt-6 grid gap-2 border-t border-border/60 pt-6 sm:grid-cols-2 lg:grid-cols-3">
                    {pkg.itinerary.map((item) => (
                      <div key={item.day} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                          {item.day}
                        </span>
                        <span className="text-foreground/80">{item.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card className="card-premium overflow-hidden border border-border/70 shadow-sm">
                  <div className="h-1.5 w-full bg-gradient-to-r from-accent via-primary to-accent" />
                  <CardHeader className="border-b border-border/60 bg-muted/30 px-6 py-6 md:px-8">
                    <CardTitle className="font-serif text-2xl font-semibold text-foreground">
                      {isPackageMode ? "Personalize This Journey" : "Inquiry Form"}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {isPackageMode
                        ? "Confirm your details and let us know how you'd like this itinerary adjusted."
                        : "Share your dates, interests, and preferences. We will handle the details."}
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
                      {/* Honeypot — invisible to humans, bots auto-fill it. Server discards any submission where it's set. */}
                      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
                        <label htmlFor="website">Website</label>
                        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                      </div>
                      {isPackageMode && pkg && <input type="hidden" name="packageSlug" value={pkg.slug} />}
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
                          {isPackageMode ? (
                            <input type="hidden" name="packageType" value={values.packageType} />
                          ) : (
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
                          )}
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
                          {isPackageMode ? (
                            <input type="hidden" name="duration" value={values.duration} />
                          ) : (
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
                          )}
                        </div>
                      </div>

                      {!isPackageMode && (
                        <div className="space-y-6">
                          <h3 className="eyebrow">Your Travel Style</h3>
                          <p className="-mt-2 text-sm text-muted-foreground">
                            Help us tailor a bespoke itinerary — every field here is optional.
                          </p>

                          <div className="space-y-3">
                            <Label className="flex items-center gap-2">
                              <Heart className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                              What interests you most?
                            </Label>
                            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                              {INTEREST_OPTIONS.map((interest) => (
                                <label
                                  key={interest}
                                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/60 px-3 py-2.5 text-sm text-foreground/85 transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/5"
                                >
                                  <input
                                    type="checkbox"
                                    name="interests"
                                    value={interest}
                                    defaultChecked={selectedInterests.has(interest)}
                                    className="h-4 w-4 rounded border-border/60 text-accent focus:ring-accent/30"
                                  />
                                  {interest}
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                              Regions you&rsquo;d like to visit
                            </Label>
                            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                              {REGION_OPTIONS.map((region) => (
                                <label
                                  key={region}
                                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/60 px-3 py-2.5 text-sm text-foreground/85 transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/5"
                                >
                                  <input
                                    type="checkbox"
                                    name="regions"
                                    value={region}
                                    defaultChecked={selectedRegions.has(region)}
                                    className="h-4 w-4 rounded border-border/60 text-accent focus:ring-accent/30"
                                  />
                                  {region}
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="grid gap-6 md:grid-cols-3">
                            <div className="space-y-2">
                              <Label htmlFor="pace">Travel pace</Label>
                              <div className="relative">
                                <Gauge
                                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                  aria-hidden="true"
                                />
                                <select
                                  id="pace"
                                  name="pace"
                                  defaultValue={values.pace}
                                  className={`${selectClass} pl-10`}
                                >
                                  <option value="">No preference</option>
                                  <option value="relaxed">Relaxed — plenty of downtime</option>
                                  <option value="balanced">Balanced — mix of activity and rest</option>
                                  <option value="active">Active — pack in as much as possible</option>
                                </select>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="accommodation">Accommodation style</Label>
                              <div className="relative">
                                <Hotel
                                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                  aria-hidden="true"
                                />
                                <select
                                  id="accommodation"
                                  name="accommodation"
                                  defaultValue={values.accommodation}
                                  className={`${selectClass} pl-10`}
                                >
                                  <option value="">No preference</option>
                                  <option value="boutique-luxury">Boutique & luxury</option>
                                  <option value="comfortable-mid-range">Comfortable mid-range</option>
                                  <option value="homestays">Homestays & authentic stays</option>
                                  <option value="mixed">A mix — surprise me</option>
                                </select>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="budget">Budget range</Label>
                              <div className="relative">
                                <Wallet
                                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                  aria-hidden="true"
                                />
                                <select
                                  id="budget"
                                  name="budget"
                                  defaultValue={values.budget}
                                  className={`${selectClass} pl-10`}
                                >
                                  <option value="">Not sure — please advise</option>
                                  <option value="under-2000">Under $2,000</option>
                                  <option value="2000-3500">$2,000 – $3,500</option>
                                  <option value="3500-5000">$3,500 – $5,000</option>
                                  <option value="above-5000">Above $5,000</option>
                                </select>
                              </div>
                              <p className="text-xs text-muted-foreground">Per person, excluding international flights.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {isPackageMode && (
                        <div className="space-y-6">
                          <h3 className="eyebrow">What Would You Like to Change?</h3>
                          <p className="-mt-2 text-sm text-muted-foreground">
                            Check any that apply — a detail field will appear so you can tell us more.
                          </p>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {CUSTOMIZATION_OPTIONS.map((option) => (
                              <div
                                key={option.value}
                                className="group rounded-lg border border-border/60 transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/5"
                              >
                                <label className="flex cursor-pointer items-center gap-2.5 px-3.5 py-2.5 text-sm text-foreground/85">
                                  <input
                                    type="checkbox"
                                    name="changeTypes"
                                    value={option.value}
                                    defaultChecked={selectedChangeTypes.has(option.value)}
                                    className="h-4 w-4 rounded border-border/60 text-accent focus:ring-accent/30"
                                  />
                                  {option.label}
                                </label>
                                <div className="hidden px-3.5 pb-3 group-has-[:checked]:block">
                                  <input
                                    type="text"
                                    name={`changeDetail_${option.value}`}
                                    defaultValue={changeDetailValues[option.value] || ""}
                                    placeholder={option.placeholder}
                                    className="h-9 w-full rounded-md border border-border/60 bg-background px-3 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-6">
                        <h3 className="eyebrow">Additional Information</h3>
                        <div className="space-y-2">
                          <Label htmlFor="message" className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                            {isPackageMode ? "Anything else you'd like us to know?" : "Trip notes"}
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder={
                              isPackageMode
                                ? "Any other requests or context for your Bhutan specialist..."
                                : "Tell us about your interests, pace, and must-sees..."
                            }
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
                        info@bhutanaraviapeaks.com
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
