"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { LayoutDashboard, LogOut } from "lucide-react"

export function AdminTopBar() {
  const pathname = usePathname()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const isLoginPage = pathname === "/admin/login"

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch("/api/admin/logout", { method: "POST" })
    } finally {
      router.replace("/admin/login")
      router.refresh()
    }
  }

  return (
    <header className="border-b border-white/10 bg-primary text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
        <Link href="/admin" className="flex items-center gap-2.5">
          <LayoutDashboard className="h-5 w-5 text-accent" aria-hidden="true" />
          <span className="font-serif text-lg font-semibold">
            Bhutan Aravia Peaks <span className="font-sans text-sm font-normal text-white/50">/ Admin</span>
          </span>
        </Link>
        {!isLoginPage && (
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/90 transition-colors hover:border-white/60 disabled:opacity-60"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            {loading ? "Signing out..." : "Logout"}
          </button>
        )}
      </div>
    </header>
  )
}
