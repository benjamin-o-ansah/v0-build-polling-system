"use client"

import { Button } from "@/components/ui/button"

interface PublishModalProps {
  pollTitle: string
  onCancel: () => void
  onConfirm: () => void
}

export function PublishModal({
  pollTitle,
  onCancel,
  onConfirm,
}: PublishModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40">
      <div className="w-full max-w-lg rounded-xl bg-card p-8 shadow-xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <div className="h-5 w-5 rounded-full bg-destructive/30" />
        </div>

        <h2 className="mb-2 text-xl font-bold text-foreground">
          Publish this poll?
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          You are about to publish &quot;{pollTitle}&quot;. This action will make
          the poll live for all registered citizens.
        </p>

        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            Warning: Once published, you cannot edit the poll questions or
            options. You will only be able to close the poll early.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="bg-transparent text-foreground"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Confirm & Publish
          </Button>
        </div>
      </div>
    </div>
  )
}
