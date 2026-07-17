import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"

export type SubmissionType = "inquiry" | "contact"
export type SubmissionStatus = "new" | "contacted" | "closed"

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

export async function updateSubmissionStatus(id: string, status: SubmissionStatus): Promise<boolean> {
  const db = await getDb()
  const result = await db
    .collection<Submission>(COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: { status } })
  return result.matchedCount > 0
}
