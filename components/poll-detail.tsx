"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/app-store"
import { cn } from "@/lib/utils"

export function PollDetail() {
  const {
    polls,
    selectedPollId,
    currentUser,
    navigate,
    selectPoll,
    submitVote,
    closePoll,
    deletePoll,
  } = useAppStore()

  const poll = polls.find((p) => p.id === selectedPollId)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  if (!poll) return null

  const isAdmin = currentUser?.role === "admin"

  const handleSubmitVote = () => {
    if (!selectedOption) return
    submitVote(poll.id, selectedOption)
  }

  return (
    <div className="p-8">
      <button
        type="button"
        onClick={() => navigate("polls")}
        className="mb-4 text-sm text-muted-foreground hover:text-foreground"
      >
        Back to Dashboard
      </button>

      <div className="max-w-2xl rounded-lg border border-border bg-card p-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-chart-1 px-3 py-1 text-xs font-semibold uppercase text-card">
            {poll.status}
          </span>
          {poll.closesAt && (
            <span className="text-sm text-muted-foreground">
              {poll.closesAt}
            </span>
          )}
        </div>

        <h1 className="mb-3 text-2xl font-bold text-foreground">
          {poll.title}
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          {poll.description}
        </p>

        <div className="flex flex-col gap-3">
          {poll.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelectedOption(option.id)}
              className={cn(
                "flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-all",
                selectedOption === option.id
                  ? "border-primary bg-primary/5 ring-2 ring-primary"
                  : "border-border bg-card hover:border-muted-foreground/30"
              )}
            >
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                  selectedOption === option.id
                    ? "border-primary"
                    : "border-muted-foreground/40"
                )}
              >
                {selectedOption === option.id && (
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-sm font-medium text-foreground">
                {option.label}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("polls")}
            className="bg-transparent text-foreground"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitVote}
            disabled={!selectedOption}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Submit Vote
          </Button>
        </div>

        {isAdmin && (
          <>
            <div className="mt-8 border-t border-border pt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Admin Controls
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    selectPoll(poll.id)
                    navigate("edit-poll")
                  }}
                  className="bg-transparent text-foreground"
                >
                  Edit Poll
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => closePoll(poll.id)}
                  className="bg-transparent text-foreground"
                >
                  Close Poll Early
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deletePoll(poll.id)}
                  className="border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/10"
                >
                  Delete
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
