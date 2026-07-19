import { NextResponse } from "next/server"
import { updateSubmissionStatus, deleteSubmission, type SubmissionStatus } from "@/lib/db/submissions"

export const runtime = "nodejs"

const VALID_STATUSES: SubmissionStatus[] = ["new", "contacted", "closed"]

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let body: { status?: string } = {}
  try {
    body = (await request.json()) as { status?: string }
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  if (!body.status || !VALID_STATUSES.includes(body.status as SubmissionStatus)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }

  try {
    const updated = await updateSubmissionStatus(id, body.status as SubmissionStatus)
    if (!updated) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[admin] Failed to update submission status:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const deleted = await deleteSubmission(id)
    if (!deleted) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[admin] Failed to delete submission:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
