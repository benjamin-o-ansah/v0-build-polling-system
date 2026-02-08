import { create } from "zustand"
import type { User, Poll, VoteReceipt } from "./types"
import { adminUser, polls as initialPolls } from "./mock-data"

export type AppPage =
  | "login"
  | "register"
  | "dashboard"
  | "polls"
  | "poll-detail"
  | "poll-results"
  | "create-poll"
  | "edit-poll"
  | "vote-submitted"
  | "voting"
  | "profile"
  | "settings"
  | "users"
  | "audit-logs"

interface AppState {
  currentPage: AppPage
  currentUser: User | null
  isLoggedIn: boolean
  polls: Poll[]
  selectedPollId: string | null
  voteReceipt: VoteReceipt | null
  draftSavedMessage: string | null

  // Actions
  navigate: (page: AppPage) => void
  login: (user: User) => void
  logout: () => void
  selectPoll: (id: string) => void
  submitVote: (pollId: string, optionId: string) => void
  createPoll: (title: string, description: string, options: string[]) => void
  saveDraft: (title: string, description: string, options: string[]) => void
  publishPoll: (pollId: string) => void
  deletePoll: (pollId: string) => void
  closePoll: (pollId: string) => void
  clearDraftMessage: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  currentPage: "login",
  currentUser: null,
  isLoggedIn: false,
  polls: initialPolls,
  selectedPollId: null,
  voteReceipt: null,
  draftSavedMessage: null,

  navigate: (page) => set({ currentPage: page }),

  login: (user) =>
    set({
      currentUser: user,
      isLoggedIn: true,
      currentPage: user.role === "admin" ? "dashboard" : "polls",
    }),

  logout: () =>
    set({
      currentUser: null,
      isLoggedIn: false,
      currentPage: "login",
      selectedPollId: null,
      voteReceipt: null,
    }),

  selectPoll: (id) => set({ selectedPollId: id }),

  submitVote: (pollId, optionId) => {
    const { polls } = get()
    const poll = polls.find((p) => p.id === pollId)
    if (!poll) return

    const updatedPolls = polls.map((p) => {
      if (p.id === pollId) {
        return {
          ...p,
          options: p.options.map((opt) =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt,
          ),
          totalVotes: p.totalVotes + 1,
          responses: p.responses + 1,
        }
      }
      return p
    })

    const selectedOption = poll.options.find((o) => o.id === optionId)

    set({
      polls: updatedPolls,
      voteReceipt: {
        voteId: `#${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        pollQuestion: poll.question,
        selectedOption: selectedOption?.label || "",
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        status: "VERIFIED",
      },
      currentPage: "vote-submitted",
    })
  },

  createPoll: (title, description, options) => {
    const newPoll: Poll = {
      id: `poll-${Date.now()}`,
      title,
      description,
      question: title,
      status: "active",
      options: options.map((label, i) => ({
        id: `opt-new-${i}`,
        label,
        votes: 0,
      })),
      createdAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      closesAt: "Closes in 7 days",
      totalVotes: 0,
      responses: 0,
    }
    set((state) => ({
      polls: [newPoll, ...state.polls],
      currentPage: "polls",
    }))
  },

  saveDraft: (title, description, options) => {
    const newPoll: Poll = {
      id: `poll-${Date.now()}`,
      title: title || "Untitled Draft",
      description,
      question: title,
      status: "draft",
      options: options
        .filter((l) => l.trim())
        .map((label, i) => ({
          id: `opt-draft-${i}`,
          label,
          votes: 0,
        })),
      createdAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      closesAt: "",
      totalVotes: 0,
      responses: 0,
      owner: get().currentUser?.email,
    }
    const now = new Date()
    const timeStr = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    set((state) => ({
      polls: [newPoll, ...state.polls],
      draftSavedMessage: `Draft saved successfully at ${timeStr}`,
    }))
  },

  publishPoll: (pollId) => {
    set((state) => ({
      polls: state.polls.map((p) =>
        p.id === pollId ? { ...p, status: "active" as const } : p,
      ),
      currentPage: "polls",
    }))
  },

  deletePoll: (pollId) => {
    set((state) => ({
      polls: state.polls.filter((p) => p.id !== pollId),
      currentPage: "polls",
      selectedPollId: null,
    }))
  },

  closePoll: (pollId) => {
    set((state) => ({
      polls: state.polls.map((p) =>
        p.id === pollId ? { ...p, status: "closed" as const } : p,
      ),
    }))
  },

  clearDraftMessage: () => set({ draftSavedMessage: null }),
}))
