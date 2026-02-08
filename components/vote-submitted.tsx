"use client"

import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/app-store"
import { CheckCircle2 } from "lucide-react"

export function VoteSubmitted() {
  const { voteReceipt, navigate, selectedPollId, selectPoll } = useAppStore()

  if (!voteReceipt) return null

  return (
    <div className="flex min-h-full items-start justify-center p-8">
      <div className="w-full max-w-lg rounded-lg border border-border bg-card p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-chart-1/20">
            <CheckCircle2 className="h-8 w-8 text-chart-1" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Vote Submitted</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your participation has been recorded. You cannot change your vote for
            this poll.
          </p>
        </div>

        <div className="rounded-lg border border-border p-5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Poll Question
          </p>
          <p className="mb-4 text-sm font-medium text-foreground">
            {voteReceipt.pollQuestion}
          </p>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Your Selection
          </p>
          <div className="rounded-lg border-2 border-primary bg-primary/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {voteReceipt.selectedOption}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Vote ID</span>
              <span className="font-mono text-foreground">{voteReceipt.voteId}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span className="text-foreground">{voteReceipt.date}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Time</span>
              <span className="text-foreground">{voteReceipt.time}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="rounded-full bg-chart-1 px-2.5 py-0.5 text-xs font-semibold text-card">
                {voteReceipt.status}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Button
            onClick={() => {
              if (selectedPollId) {
                navigate("poll-results")
              }
            }}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            View Live Results
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("polls")}
            className="w-full bg-transparent text-foreground"
          >
            Back to Polls
          </Button>
        </div>
      </div>
    </div>
  )
}
