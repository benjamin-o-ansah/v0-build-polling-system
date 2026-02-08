"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/app-store"
import { cn } from "@/lib/utils"

export function VotingInterface() {
  const { polls, selectedPollId, submitVote } = useAppStore()
  const poll = polls.find((p) => p.id === selectedPollId)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  if (!poll) return null

  const handleSubmit = () => {
    if (!selectedOption) return
    submitVote(poll.id, selectedOption)
  }

  return (
    <div className="flex min-h-screen items-start justify-center p-8">
      <div className="w-full max-w-xl">
        <div className="rounded-lg border border-border bg-card p-8">
          <span className="mb-4 inline-block rounded-full bg-chart-1 px-3 py-1 text-xs font-semibold text-card">
            Active Poll
          </span>

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

          <Button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Submit Vote
          </Button>

          <div className="mt-6 rounded-lg bg-muted p-4">
            <p className="text-sm font-medium text-foreground">
              Secure & Anonymous
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Your vote is encrypted and anonymized. Project Nexus ensures that
              individual choices cannot be traced back to your account.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Project Nexus &copy; 2025. Empowering civic engagement.
        </p>
      </div>
    </div>
  )
}
