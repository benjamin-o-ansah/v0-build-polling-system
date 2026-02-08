"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAppStore } from "@/lib/app-store"
import { X } from "lucide-react"

export function CreatePoll() {
  const { navigate, createPoll, saveDraft, draftSavedMessage, clearDraftMessage } =
    useAppStore()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [options, setOptions] = useState(["", "", ""])

  useEffect(() => {
    if (draftSavedMessage) {
      const timer = setTimeout(clearDraftMessage, 4000)
      return () => clearTimeout(timer)
    }
  }, [draftSavedMessage, clearDraftMessage])

  const addOption = () => setOptions([...options, ""])

  const removeOption = (index: number) => {
    if (options.length <= 2) return
    setOptions(options.filter((_, i) => i !== index))
  }

  const updateOption = (index: number, value: string) => {
    const updated = [...options]
    updated[index] = value
    setOptions(updated)
  }

  const handleCreate = () => {
    if (!title.trim()) return
    const validOptions = options.filter((o) => o.trim())
    if (validOptions.length < 2) return
    createPoll(title, description, validOptions)
  }

  const handleSaveDraft = () => {
    saveDraft(title, description, options)
  }

  return (
    <div className="p-8">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Create New Poll
          </h1>
          <p className="text-sm text-muted-foreground">
            Design a new poll for community engagement. Drafts are saved
            automatically.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("polls")}
          className="bg-transparent text-foreground"
        >
          Back to Polls
        </Button>
      </div>

      {draftSavedMessage && (
        <div className="mt-4 rounded-lg bg-chart-1 px-4 py-3 text-sm text-card">
          {draftSavedMessage}
        </div>
      )}

      <div className="mt-6 max-w-2xl rounded-lg border border-border bg-card p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label className="font-semibold text-foreground">Poll Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Downtown Park Renovation Proposal"
              className="border-border bg-card text-foreground"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-semibold text-foreground">Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide context about what is being voted on..."
              rows={4}
              className="border-border bg-card text-foreground"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label className="font-semibold text-foreground">Poll Options</Label>
              <span className="text-xs text-muted-foreground">
                Minimum 2 options required
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {options.map((option, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    value={option}
                    onChange={(e) => updateOption(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    className="border-border bg-card text-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => removeOption(i)}
                    disabled={options.length <= 2}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addOption}
              className="mt-1 rounded-md border border-dashed border-border py-2.5 text-sm font-medium text-primary transition-colors hover:bg-muted"
            >
              Add Another Option
            </button>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                className="bg-transparent text-foreground"
              >
                Save as Draft
              </Button>
              <Button
                onClick={handleCreate}
                disabled={
                  !title.trim() ||
                  options.filter((o) => o.trim()).length < 2
                }
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Create Poll
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
