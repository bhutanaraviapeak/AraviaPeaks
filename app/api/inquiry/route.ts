import { NextResponse } from "next/server"
import { sendInquiryEmail } from "@/app/actions/send-inquiry"
import { getPackageBySlug } from "@/lib/data/packages"
import type { InquiryMode, PackageSnapshot } from "@/lib/db/submissions"

type InquiryData = {
  fullName: string
  email: string
  phone: string
  country: string
  packageType: string
  travelMonth: string
  groupSize: string
  duration: string
  message: string
  website?: string
}

const requiredFields: Array<keyof InquiryData> = [
  "fullName",
  "email",
  "country",
  "packageType",
  "travelMonth",
  "groupSize",
  "duration",
]

const getStringValue = (value: FormDataEntryValue | null) => (typeof value === "string" ? value.trim() : "")

export async function POST(request: Request) {
  const formData = await request.formData()

  const data: InquiryData = {
    fullName: getStringValue(formData.get("fullName")),
    email: getStringValue(formData.get("email")),
    phone: getStringValue(formData.get("phone")),
    country: getStringValue(formData.get("country")),
    packageType: getStringValue(formData.get("packageType")),
    travelMonth: getStringValue(formData.get("travelMonth")),
    groupSize: getStringValue(formData.get("groupSize")),
    duration: getStringValue(formData.get("duration")),
    message: getStringValue(formData.get("message")),
    website: getStringValue(formData.get("website")),
  }

  // The package slug is the only thing we trust from the client to identify a
  // package — the actual name/category/duration/highlights saved to the
  // dashboard are always looked up server-side from it, never taken from
  // client-submitted text, so a hand-edited URL can't inject a fake package.
  const packageSlug = getStringValue(formData.get("packageSlug"))
  const changeTypes = formData.getAll("changeTypes").map((v) => String(v).trim()).filter(Boolean)

  let mode: InquiryMode = "custom"
  let packageSnapshot: PackageSnapshot | undefined

  if (packageSlug) {
    const pkg = getPackageBySlug(packageSlug)
    if (pkg) {
      mode = "package"
      packageSnapshot = {
        slug: pkg.slug,
        name: pkg.title,
        category: pkg.category,
        duration: pkg.durationLabel,
        region: pkg.region,
        highlights: pkg.highlights,
        itinerarySummary: pkg.itinerary.map((item) => ({ day: item.day, title: item.title })),
      }
    }
  }

  const errorFields = requiredFields.filter((field) => !data[field])

  if (errorFields.length > 0) {
    const params = new URLSearchParams({
      status: "error",
      errorMessage: "Please fill in all required fields.",
      errorFields: errorFields.join(","),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      packageType: data.packageType,
      travelMonth: data.travelMonth,
      groupSize: data.groupSize,
      durationValue: data.duration,
      message: data.message,
      ...(packageSlug ? { package: packageSlug } : {}),
      ...(changeTypes.length ? { changeTypes: changeTypes.join(",") } : {}),
    })

    return NextResponse.redirect(new URL(`/inquiry?${params.toString()}`, request.url), 303)
  }

  const result = await sendInquiryEmail({
    ...data,
    mode,
    packageSnapshot,
    customization: mode === "package" ? { changeTypes, notes: data.message } : undefined,
  })

  if (!result.success) {
    const params = new URLSearchParams({
      status: "error",
      errorMessage: result.message || "We were unable to send your inquiry. Please try again.",
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      packageType: data.packageType,
      travelMonth: data.travelMonth,
      groupSize: data.groupSize,
      durationValue: data.duration,
      message: data.message,
      ...(packageSlug ? { package: packageSlug } : {}),
      ...(changeTypes.length ? { changeTypes: changeTypes.join(",") } : {}),
    })

    return NextResponse.redirect(new URL(`/inquiry?${params.toString()}`, request.url), 303)
  }

  const successParams = new URLSearchParams({
    ref: result.referenceNumber || "",
    name: data.fullName,
  })

  return NextResponse.redirect(new URL(`/thank-you?${successParams.toString()}`, request.url), 303)
}
