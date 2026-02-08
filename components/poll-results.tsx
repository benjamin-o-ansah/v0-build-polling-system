"use client"

import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/app-store"

export function PollResults() {
  const { polls, selectedPollId, navigate } = useAppStore()
  const poll = polls.find((p) => p.id === selectedPollId)

  if (!poll) return null

  const sortedOptions = [...poll.options].sort((a, b) => b.votes - a.votes)
  const winnerIndex = 0
  const totalVotes = poll.totalVotes || sortedOptions.reduce((s, o) => s + o.votes, 0)
  const participationRate = totalVotes > 0 ? "68.4%" : "0%"

  const barColors = [
    "bg-chart-1",
    "bg-primary",
    "bg-primary",
    "bg-primary",
  ]

  return (
    <div className="p-8">
      <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
        <button
          type="button"
          onClick={() => navigate("polls")}
          className="hover:text-foreground"
        >
          Polls
        </button>
        <span>{">"}</span>
        <span>Results</span>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{poll.title}</h1>
        <span className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground">
          Poll Closed
        </span>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Total Votes</p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {totalVotes.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-chart-1">Verified Citizens</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Winning Option</p>
          <p className="mt-2 text-xl font-bold text-foreground">
            {sortedOptions[0]?.label}
          </p>
          <p className="mt-1 text-xs text-chart-1">
            {totalVotes > 0
              ? `${((sortedOptions[0]?.votes / totalVotes) * 100).toFixed(1)}% of total`
              : "N/A"}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Participation Rate</p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {participationRate}
          </p>
          <p className="mt-1 text-xs text-chart-1">+12% vs last year</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Vote Breakdown</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent text-foreground"
            >
              Export CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent text-foreground"
            >
              Print
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {sortedOptions.map((option, index) => {
            const percentage =
              totalVotes > 0
                ? ((option.votes / totalVotes) * 100).toFixed(1)
                : "0"
            return (
              <div key={option.id}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {index + 1}. {option.label}
                    </span>
                    {index === winnerIndex && totalVotes > 0 && (
                      <span className="rounded-full bg-chart-1/10 px-2 py-0.5 text-xs font-medium text-chart-1">
                        Winner
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">
                      {percentage}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {option.votes.toLocaleString()} votes
                    </span>
                  </div>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${barColors[index] || "bg-primary"}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Poll ID: #2025-UDI-01 &bull; Closed on Oct 15, 2025 &bull; Certified by
        City Clerk
      </p>
    </div>
  )
}
