export type UserRole = "admin" | "citizen"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  roleLabel: string
  avatar: string
  memberSince: string
  status: "Active" | "Inactive"
}

export type PollStatus = "active" | "closed" | "draft"

export interface PollOption {
  id: string
  label: string
  votes: number
}

export interface Poll {
  id: string
  title: string
  description: string
  question: string
  status: PollStatus
  options: PollOption[]
  createdAt: string
  closesAt: string
  totalVotes: number
  responses: number
  owner?: string
}

export interface ActivityItem {
  id: string
  user: string
  avatar: string
  action: string
  timestamp: string
  badge: string
}

export interface VoteReceipt {
  voteId: string
  pollQuestion: string
  selectedOption: string
  date: string
  time: string
  status: "VERIFIED" | "PENDING"
}
