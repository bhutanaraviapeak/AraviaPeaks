"use client"

import { useMemo, useState } from "react"
import {
  Inbox,
  Mail,
  Phone,
  Globe,
  MessageSquare,
  Search,
  Compass,
  CalendarDays,
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { InquiryMode, PackageSnapshot, Customization } from "@/lib/db/submissions"

export type SubmissionView = {
  id: string
  type: "inquiry" | "contact"
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
  status: "new" | "contacted" | "closed"
  createdAt: string
  mode?: InquiryMode
  packageSnapshot?: PackageSnapshot
  customization?: Customization
}

const CHANGE_TYPE_LABELS: Record<string, string> = {
  "add-days": "Add extra days",
  "reduce-days": "Reduce the duration",
  "add-destination": "Add another destination",
  "remove-destination": "Remove a destination",
  "upgrade-accommodation": "Upgrade accommodation",
  "include-festival": "Include a festival",
  "add-trekking": "Add trekking or hiking",
  "add-wellness": "Add wellness or spa experience",
  "include-homestay": "Include a homestay",
  "special-celebration": "Add a special celebration",
  other: "Other request",
}

type Filter = "all" | "inquiry" | "contact" | "new"

const STATUS_STYLES: Record<SubmissionView["status"], string> = {
  new: "bg-accent/10 text-accent border-accent/30",
  contacted: "bg-secondary/10 text-secondary border-secondary/30",
  closed: "bg-muted text-muted-foreground border-border",
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })

export function DashboardClient({
  submissions: initialSubmissions,
  loadError,
}: {
  submissions: SubmissionView[]
  loadError?: string | null
}) {
  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [filter, setFilter] = useState<Filter>("all")
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<SubmissionView | null>(null)
  const [updating, setUpdating] = useState(false)

  const stats = useMemo(
    () => ({
      total: submissions.length,
      new: submissions.filter((s) => s.status === "new").length,
      inquiry: submissions.filter((s) => s.type === "inquiry").length,
      contact: submissions.filter((s) => s.type === "contact").length,
    }),
    [submissions],
  )

  const filtered = useMemo(() => {
    let list = submissions
    if (filter === "inquiry" || filter === "contact") list = list.filter((s) => s.type === filter)
    if (filter === "new") list = list.filter((s) => s.status === "new")
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter((s) => s.fullName.toLowerCase().includes(q) || s.email.toLowerCase().includes(q))
    }
    return list
  }, [submissions, filter, query])

  const updateStatus = async (id: string, status: SubmissionView["status"]) => {
    setUpdating(true)
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("Failed to update status")
      setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))
      setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev))
    } catch (error) {
      console.error("[admin] Failed to update submission status:", error)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <span className="eyebrow">Submissions</span>
        <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight">Inquiries &amp; Contact Messages</h1>
        <p className="mt-2 text-muted-foreground">Every inquiry and contact form submission from the website.</p>
      </div>

      {loadError && (
        <div className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-destructive">
          <XCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="text-sm font-medium">{loadError}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Inbox} label="Total submissions" value={stats.total} />
        <StatCard icon={Sparkles} label="New" value={stats.new} accent />
        <StatCard icon={Compass} label="Inquiries" value={stats.inquiry} />
        <StatCard icon={MessageSquare} label="Contact messages" value={stats.contact} />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(
            [
              { key: "all", label: "All" },
              { key: "inquiry", label: "Inquiries" },
              { key: "contact", label: "Contacts" },
              { key: "new", label: "New" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === tab.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/70 hover:border-accent/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or email"
            className="h-10 w-full rounded-lg border border-border/60 bg-card pl-9 pr-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      {/* Table */}
      <div className="card-premium overflow-hidden border border-border/70">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-16 text-center text-muted-foreground">
            <Inbox className="h-8 w-8" aria-hidden="true" />
            <p className="font-medium">No submissions yet</p>
            <p className="text-sm">New inquiries and contact messages will show up here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-muted/40 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Received</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelected(s)}
                    className="cursor-pointer border-b border-border/40 transition-colors last:border-0 hover:bg-accent/5"
                  >
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                          s.type === "inquiry"
                            ? "border-primary/30 bg-primary/5 text-primary"
                            : "border-secondary/30 bg-secondary/5 text-secondary"
                        }`}
                      >
                        {s.type === "inquiry" ? "Inquiry" : "Contact"}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-foreground">{s.fullName}</td>
                    <td className="px-5 py-4 text-muted-foreground">{s.email}</td>
                    <td className="px-5 py-4 text-muted-foreground">{formatDate(s.createdAt)}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[s.status]}`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail modal */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">{selected.fullName}</DialogTitle>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Ref: {selected.referenceNumber} &middot; {formatDate(selected.createdAt)}
                </p>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <DetailField icon={Mail} label="Email" value={selected.email} />
                  <DetailField icon={Phone} label="Phone" value={selected.phone || "—"} />
                  <DetailField icon={Globe} label="Country" value={selected.country || "—"} />
                  <DetailField
                    icon={selected.type === "inquiry" ? Compass : MessageSquare}
                    label="Type"
                    value={selected.type === "inquiry" ? "Inquiry" : "Contact"}
                  />
                </div>

                {selected.type === "inquiry" && (
                  <div className="grid grid-cols-2 gap-3 border-t border-border/60 pt-4 text-sm">
                    <DetailField icon={Compass} label="Package" value={selected.packageType || "—"} />
                    <DetailField icon={CalendarDays} label="Travel month" value={selected.travelMonth || "—"} />
                    <DetailField icon={Users} label="Group size" value={selected.groupSize || "—"} />
                    <DetailField icon={Clock3} label="Duration" value={selected.duration || "—"} />
                  </div>
                )}

                {selected.mode === "package" && selected.packageSnapshot && (
                  <div className="border-t border-border/60 pt-4">
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                      Selected Package
                    </p>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="font-serif text-base font-semibold text-foreground">
                        {selected.packageSnapshot.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {selected.packageSnapshot.region} &middot; {selected.packageSnapshot.duration}
                      </p>
                    </div>
                    {selected.customization?.changeTypes && selected.customization.changeTypes.length > 0 && (
                      <div className="mt-3">
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Requested changes
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {selected.customization.changeTypes.map((changeType) => (
                            <span
                              key={changeType}
                              className="inline-flex items-center rounded-full border border-accent/30 bg-accent/5 px-2.5 py-1 text-xs font-medium text-accent"
                            >
                              {CHANGE_TYPE_LABELS[changeType] || changeType}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="border-t border-border/60 pt-4">
                  <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                    Message
                  </p>
                  <p className="whitespace-pre-wrap rounded-lg bg-muted/50 p-3 text-sm leading-relaxed text-foreground">
                    {selected.message || "No message provided."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-border/60 pt-4">
                  {(["new", "contacted", "closed"] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      disabled={updating || selected.status === status}
                      onClick={() => updateStatus(selected.id, status)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors disabled:cursor-default ${
                        selected.status === status
                          ? STATUS_STYLES[status]
                          : "border-border text-foreground/60 hover:border-accent/50"
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Mark {status}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Inbox
  label: string
  value: number
  accent?: boolean
}) {
  return (
    <div className="card-premium border border-border/70 p-5">
      <div
        className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full ${
          accent ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
        }`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <p className="font-serif text-2xl font-semibold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function DetailField({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}
