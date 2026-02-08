"use client"

import { useAppStore, type AppPage } from "@/lib/app-store"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  page: AppPage
  adminOnly?: boolean
  section?: string
}

const adminNav: NavItem[] = [
  { label: "Dashboard", page: "dashboard" },
  { label: "Polls Management", page: "polls" },
  { label: "Users", page: "users" },
  { label: "Settings", page: "settings", section: "SYSTEM" },
  { label: "Audit Logs", page: "audit-logs" },
]

const citizenNav: NavItem[] = [
  { label: "Dashboard", page: "dashboard" },
  { label: "Polls", page: "polls" },
  { label: "Profile", page: "profile" },
  { label: "Settings", page: "settings" },
]

const citizenPollsNav: NavItem[] = [
  { label: "Dashboard", page: "dashboard" },
  { label: "Active Polls", page: "polls" },
  { label: "My Votes", page: "polls" },
  { label: "Create Poll", page: "create-poll" },
]

export function AppSidebar() {
  const { currentUser, currentPage, navigate, logout } = useAppStore()

  if (!currentUser) return null

  const isAdmin = currentUser.role === "admin"
  const navItems = isAdmin ? adminNav : citizenNav

  const isActivePage = (page: AppPage) => {
    if (page === "polls" && (currentPage === "polls" || currentPage === "poll-detail" || currentPage === "poll-results" || currentPage === "voting" || currentPage === "create-poll" || currentPage === "edit-poll" || currentPage === "vote-submitted")) return true
    if (page === "dashboard" && currentPage === "dashboard") return true
    if (page === "profile" && currentPage === "profile") return true
    if (page === "settings" && currentPage === "settings") return true
    if (page === "users" && currentPage === "users") return true
    if (page === "audit-logs" && currentPage === "audit-logs") return true
    return false
  }

  let currentSection = ""

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-2 px-5 pt-6 pb-8">
        <div className="h-7 w-7 rounded-lg bg-primary" />
        <span className="text-lg font-bold text-primary">Project Nexus</span>
        {isAdmin && (
          <span className="ml-1 rounded bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
            ADMIN
          </span>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3">
        {navItems.map((item) => {
          const showSection = item.section && item.section !== currentSection
          if (item.section) currentSection = item.section

          return (
            <div key={item.label}>
              {showSection && (
                <p className="mb-2 mt-6 px-3 text-xs font-semibold tracking-wider text-muted-foreground">
                  {item.section}
                </p>
              )}
              <button
                type="button"
                onClick={() => navigate(item.page)}
                className={cn(
                  "w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                  isActivePage(item.page)
                    ? "bg-sidebar-accent text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            </div>
          )
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium text-foreground">
            {currentUser.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-foreground">
              {currentUser.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {currentUser.roleLabel}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
