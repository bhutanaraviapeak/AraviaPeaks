import type { Metadata } from "next"
import { listSubmissions } from "@/lib/db/submissions"
import { DashboardClient, type SubmissionView } from "./dashboard-client"

export const metadata: Metadata = {
  title: "Admin Dashboard | Bhutan Aravia Peaks",
}

// This page reads live submissions on every request and must never be
// statically prerendered — build-time prerendering would try to connect to
// MongoDB during the build itself, and a transient DB/network hiccup at
// build time could fail the entire deployment.
export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  let submissions: SubmissionView[] = []
  let loadError: string | null = null

  try {
    const docs = await listSubmissions()
    submissions = docs.map((doc) => ({
      id: doc._id!.toString(),
      type: doc.type,
      fullName: doc.fullName,
      email: doc.email,
      phone: doc.phone,
      country: doc.country,
      message: doc.message,
      packageType: doc.packageType,
      travelMonth: doc.travelMonth,
      groupSize: doc.groupSize,
      duration: doc.duration,
      referenceNumber: doc.referenceNumber,
      status: doc.status,
      createdAt: doc.createdAt.toISOString(),
      mode: doc.mode,
      packageSnapshot: doc.packageSnapshot,
      customization: doc.customization,
      interests: doc.interests,
      regions: doc.regions,
      pace: doc.pace,
      accommodation: doc.accommodation,
      budget: doc.budget,
    }))
  } catch (error) {
    console.error("[admin] Failed to load submissions:", error)
    loadError = "Could not connect to the database. Check MONGODB_URI and try again."
  }

  return <DashboardClient submissions={submissions} loadError={loadError} />
}
