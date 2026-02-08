"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { dashboardMetrics, recentActivity } from "@/lib/mock-data"

const badgeColors: Record<string, string> = {
  Voted: "border-border text-foreground bg-card",
  Created: "border-border text-foreground bg-card",
  "New User": "border-border text-foreground bg-card",
  "Admin Action": "border-border text-foreground bg-card",
  Update: "border-border text-foreground bg-card",
}

export function AdminDashboard() {
  const [metrics, setMetrics] = useState(dashboardMetrics)

  const handleRefresh = () => {
    setMetrics({
      ...metrics,
      activeUsers: metrics.activeUsers + Math.floor(Math.random() * 5),
    })
  }

  const statCards = [
    {
      label: "Total Polls",
      value: metrics.totalPolls.toLocaleString(),
      sub: "+12% from last month",
      subColor: "text-chart-1",
    },
    {
      label: "Active Polls",
      value: metrics.activePolls.toString(),
      sub: "Currently live for voting",
      subColor: "text-muted-foreground",
    },
    {
      label: "Total Votes Cast",
      value: metrics.totalVotesCast.toLocaleString(),
      sub: "+8% this week",
      subColor: "text-chart-1",
    },
    {
      label: "Active Users",
      value: metrics.activeUsers.toLocaleString(),
      sub: "+24 new today",
      subColor: "text-chart-1",
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            System Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time metrics from API endpoint /api/admin/metrics
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          className="bg-transparent text-foreground"
        >
          Refresh Data
        </Button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-border bg-card p-5"
          >
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {card.value}
            </p>
            <p className={`mt-1 text-xs ${card.subColor}`}>{card.sub}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="mb-4 text-lg font-bold text-foreground">
          Recent User Activity
        </h2>
        <div className="rounded-lg border border-border bg-card">
          {recentActivity.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex items-center gap-4 px-5 py-4 ${
                index < recentActivity.length - 1
                  ? "border-b border-border"
                  : ""
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium text-foreground">
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user}</span>{" "}
                  {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </p>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  badgeColors[activity.badge] || "border-border text-foreground bg-card"
                }`}
              >
                {activity.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
