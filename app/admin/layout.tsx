import type { ReactNode } from "react"
import { AdminTopBar } from "./admin-top-bar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <AdminTopBar />
      <main className="container mx-auto px-4 py-10 md:px-6">{children}</main>
    </div>
  )
}
