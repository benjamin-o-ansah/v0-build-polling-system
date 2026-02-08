"use client"

import { useAppStore } from "@/lib/app-store"
import { LoginPage } from "@/components/login-page"
import { RegistrationPage } from "@/components/registration-page"
import { AppSidebar } from "@/components/app-sidebar"
import { AdminDashboard } from "@/components/admin-dashboard"
import { PollsList } from "@/components/polls-list"
import { PollDetail } from "@/components/poll-detail"
import { PollResults } from "@/components/poll-results"
import { CreatePoll } from "@/components/create-poll"
import { EditPoll } from "@/components/edit-poll"
import { VotingInterface } from "@/components/voting-interface"
import { VoteSubmitted } from "@/components/vote-submitted"
import { UserProfile } from "@/components/user-profile"

function MainContent() {
  const { currentPage } = useAppStore()

  switch (currentPage) {
    case "dashboard":
      return <AdminDashboard />
    case "polls":
      return <PollsList />
    case "poll-detail":
      return <PollDetail />
    case "poll-results":
      return <PollResults />
    case "create-poll":
      return <CreatePoll />
    case "edit-poll":
      return <EditPoll />
    case "voting":
      return <VotingInterface />
    case "vote-submitted":
      return <VoteSubmitted />
    case "profile":
      return <UserProfile />
    case "settings":
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Settings page coming soon.</p>
        </div>
      )
    case "users":
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground">User management coming soon.</p>
        </div>
      )
    case "audit-logs":
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground">Audit logs coming soon.</p>
        </div>
      )
    default:
      return <PollsList />
  }
}

export function AppShell() {
  const { currentPage, isLoggedIn } = useAppStore()

  if (currentPage === "login" && !isLoggedIn) return <LoginPage />
  if (currentPage === "register" && !isLoggedIn) return <RegistrationPage />

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-auto bg-background">
        <MainContent />
      </main>
    </div>
  )
}
