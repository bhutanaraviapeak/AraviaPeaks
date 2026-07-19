import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"

export type SubmissionType = "inquiry" | "contact"
export type SubmissionStatus = "new" | "contacted" | "closed"
export type InquiryMode = "package" | "custom"

// Text only, deliberately — no images. Built server-side from a trusted
// slug lookup at submission time, not from client-supplied text, so a
// tampered URL can't inject a fake package name/duration into the record.
// Frozen at submission time so edits to the live package later don't
// retroactively change what the dashboard shows a traveler originally chose.
export type PackageSnapshot = {
  slug: string
  name: string
  category: string
  duration: string
  region: string
  highlights: string[]
  itinerarySummary: { day: number; title: string }[]
}

export type Customization = {
  changeTypes: string[]
  // Per-selected-option detail text, keyed by the change type value
  // (e.g. { "add-days": "2 extra nights in Punakha" }).
  changeDetails?: Record<string, string>
  notes?: string
}

export type Submission = {
  _id?: ObjectId
  type: SubmissionType
  fullName: string
  email: string
  phone: string
  country: string
  message: string
  packageType?: string
  travelMonth?: string
  groupSize?: string
  duration?: string
  referenceNumber: string
  status: SubmissionStatus
  createdAt: Date
  // Stored for anti-abuse rate limiting only; not shown in the dashboard.
  ip?: string
  // Set when the inquiry started from a specific package's "Request a Quote".
  mode?: InquiryMode
  packageSnapshot?: PackageSnapshot
  customization?: Customization
}

const COLLECTION = "submissions"

export async function createSubmission(
  data: Omit<Submission, "_id" | "status" | "createdAt">,
): Promise<void> {
  const db = await getDb()
  const doc: Submission = {
    ...data,
    status: "new",
    createdAt: new Date(),
  }
  await db.collection<Submission>(COLLECTION).insertOne(doc)
}

export async function listSubmissions(): Promise<Submission[]> {
  const db = await getDb()
  return db.collection<Submission>(COLLECTION).find().sort({ createdAt: -1 }).limit(200).toArray()
}

export async function countRecentSubmissionsByIp(ip: string, windowMs: number): Promise<number> {
  const db = await getDb()
  const since = new Date(Date.now() - windowMs)
  return db.collection<Submission>(COLLECTION).countDocuments({ ip, createdAt: { $gte: since } })
}

export async function updateSubmissionStatus(id: string, status: SubmissionStatus): Promise<boolean> {
  const db = await getDb()
  const result = await db
    .collection<Submission>(COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: { status } })
  return result.matchedCount > 0
}
