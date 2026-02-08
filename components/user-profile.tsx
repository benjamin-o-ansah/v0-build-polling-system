"use client"

import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/app-store"

export function UserProfile() {
  const { currentUser, logout } = useAppStore()

  if (!currentUser) return null

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="max-w-xl rounded-lg border border-border bg-card p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-lg font-semibold text-foreground">
            {currentUser.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {currentUser.name}
            </h2>
            <div className="mt-1 flex gap-2">
              <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                {currentUser.roleLabel}
              </span>
              <span className="rounded-full border border-chart-1/30 bg-chart-1/10 px-3 py-0.5 text-xs font-medium text-chart-1">
                {currentUser.status}
              </span>
            </div>
          </div>
        </div>

        <div className="my-6 border-t border-border" />

        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Email Address
            </p>
            <p className="mt-1 text-sm text-foreground">{currentUser.email}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              User ID
            </p>
            <p className="mt-1 font-mono text-sm text-foreground">
              {currentUser.id}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Member Since
            </p>
            <p className="mt-1 text-sm text-foreground">
              {currentUser.memberSince}
            </p>
          </div>
        </div>

        <div className="my-6 border-t border-border" />

        <div className="flex items-center justify-between">
          <code className="rounded bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
            GET /api/auth/me
          </code>
          <Button
            variant="outline"
            onClick={logout}
            className="border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/10"
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  )
}
