"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppStore } from "@/lib/app-store"
import { adminUser, citizenUser } from "@/lib/mock-data"

export function LoginPage() {
  const { navigate, login } = useAppStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields.")
      return
    }
    // Mock login - admin or citizen based on email
    if (email.includes("admin") || email.includes("sarah")) {
      login(adminUser)
    } else {
      login(citizenUser)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 lg:block">
        <img
          src="/city-illustration.jpg"
          alt="City skyline blueprint illustration"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          <h2 className="mb-1 text-lg font-bold text-primary">
            Project Nexus
          </h2>
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Welcome back
          </h1>
          <p className="mb-8 text-muted-foreground">
            Sign in to your civic polling account.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="login-email" className="font-semibold text-foreground">
                Email Address
              </Label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="border-border bg-card text-foreground"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="login-password" className="font-semibold text-foreground">
                Password
              </Label>
              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border-border bg-card text-foreground"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <button
              type="button"
              onClick={() => navigate("register")}
              className="font-medium text-primary hover:underline"
            >
              Create account
            </button>
          </p>

          <div className="mt-8 border-t border-border pt-4">
            <p className="mb-3 text-xs text-muted-foreground">
              Quick demo login:
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => login(adminUser)}
                className="bg-transparent text-foreground"
              >
                Login as Admin
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => login(citizenUser)}
                className="bg-transparent text-foreground"
              >
                Login as Citizen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
