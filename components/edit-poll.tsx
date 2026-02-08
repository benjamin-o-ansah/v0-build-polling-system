"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAppStore } from "@/lib/app-store"
import { PublishModal } from "@/components/publish-modal"

export function EditPoll() {
  const { polls, selectedPollId, navigate, publishPoll, deletePoll } =
    useAppStore()
  const poll = polls.find((p) => p.id === selectedPollId)

  const [title, setTitle] = useState(poll?.title || "")
  const [description, setDescription] = useState(poll?.description || "")
  const [question, setQuestion] = useState(poll?.question || "")
  const [options, setOptions] = useState(
    poll?.options.map((o) => o.label) || ["", ""]
  )
  const [showPublishModal, setShowPublishModal] = useState(false)

  if (!poll) return null

  const handlePublish = () => {
    publishPoll(poll.id)
    setShowPublishModal(false)
  }

  return (
    <div className="p-8">
      <div className="mb-1 text-sm text-muted-foreground">
        <button
          type="button"
          onClick={() => navigate("polls")}
          className="hover:text-foreground"
        >
          Polls
        </button>
        <span className="mx-1">{">"}</span>
        <span>Edit Poll</span>
      </div>
      <h1 className="mb-6 text-2xl font-bold text-foreground">{poll.title}</h1>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Poll Details</h2>
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
            {poll.status}
          </span>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Poll Question
            </Label>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="border-border bg-card text-foreground"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Description
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="border-border bg-card text-foreground"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Poll Options
            </Label>
            <p className="text-sm text-muted-foreground">
              {options.length} options
            </p>
            <div className="flex flex-col gap-2">
              {options.map((opt, i) => (
                <Input
                  key={i}
                  value={opt}
                  onChange={(e) => {
                    const updated = [...options]
                    updated[i] = e.target.value
                    setOptions(updated)
                  }}
                  className="border-border bg-card text-foreground"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <button
          type="button"
          onClick={() => deletePoll(poll.id)}
          className="text-sm font-medium text-destructive hover:underline"
        >
          Delete Poll
        </button>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate("polls")}
            className="text-foreground"
          >
            Cancel
          </Button>
          <Button
            onClick={() => setShowPublishModal(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Save Changes
          </Button>
        </div>
      </div>

      {showPublishModal && (
        <PublishModal
          pollTitle={title}
          onCancel={() => setShowPublishModal(false)}
          onConfirm={handlePublish}
        />
      )}
    </div>
  )
}
