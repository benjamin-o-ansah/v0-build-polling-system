"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAppStore } from "@/lib/app-store"
import type { PollStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

const statusColors: Record<PollStatus, string> = {
  active: "bg-chart-1 text-card",
  closed: "bg-muted text-muted-foreground",
  draft: "bg-primary text-primary-foreground",
}

const statusLabels: Record<PollStatus, string> = {
  active: "Active",
  closed: "Closed",
  draft: "Draft",
}

const filterTabs: PollStatus[] = ["active", "closed", "draft"]

export function PollsList() {
  const { polls, currentUser, navigate, selectPoll } = useAppStore()
  const [activeFilter, setActiveFilter] = useState<PollStatus>("active")
  const [showLoading, setShowLoading] = useState(false)

  const isAdmin = currentUser?.role === "admin"
  const filteredPolls = polls.filter((p) => p.status === activeFilter)

  const handlePollClick = (pollId: string) => {
    selectPoll(pollId)
    const poll = polls.find((p) => p.id === pollId)
    if (!poll) return
    if (poll.status === "closed") {
      navigate("poll-results")
    } else if (poll.status === "draft" && isAdmin) {
      navigate("edit-poll")
    } else {
      navigate("poll-detail")
    }
  }

  return (
    <div className="p-8">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Polls</h1>
          <p className="text-sm text-muted-foreground">
            Browse and manage polls retrieved from{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              GET /api/polls/
            </code>
            .
          </p>
        </div>
        {isAdmin && (
          <Button
            onClick={() => navigate("create-poll")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            New poll
          </Button>
        )}
      </div>

      <div className="mb-4 mt-6 flex gap-2 border-b border-border pb-3">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveFilter(tab)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors",
              activeFilter === tab
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredPolls.length} polls
        </p>
        {isAdmin && activeFilter === "draft" && (
          <span className="rounded-md border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            Draft view - admin only
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {filteredPolls.map((poll) => (
          <button
            key={poll.id}
            type="button"
            onClick={() => handlePollClick(poll.id)}
            className="w-full rounded-lg border border-border bg-card p-5 text-left transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{poll.title}</h3>
                <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Created {poll.createdAt}</span>
                  {poll.responses > 0 && (
                    <span>
                      {poll.responses.toLocaleString()} responses
                    </span>
                  )}
                  {poll.owner && <span>Owner: {poll.owner}</span>}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    statusColors[poll.status]
                  )}
                >
                  {statusLabels[poll.status]}
                </span>
                {poll.closesAt && (
                  <span className="text-xs text-muted-foreground">
                    {poll.closesAt}
                  </span>
                )}
                {poll.status === "draft" && (
                  <span className="text-xs text-muted-foreground">
                    Not visible to the public
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredPolls.length === 0 && (
        <div className="mt-4 rounded-lg border border-dashed border-border bg-card p-6">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-md bg-muted" />
            <div>
              <p className="font-semibold text-foreground">No polls found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                When GET /api/polls/ returns an empty list, new polls you create
                will appear here. Use filters above to switch between Active,
                Closed, and Draft views.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Loading skeleton demo */}
      <div className="mt-6">
        <p className="mb-2 text-sm text-muted-foreground">
          Loading state (skeleton)
        </p>
        <div className="flex flex-col gap-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-card p-5"
            >
              <Skeleton className="mb-2 h-5 w-3/5" />
              <Skeleton className="h-4 w-2/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
