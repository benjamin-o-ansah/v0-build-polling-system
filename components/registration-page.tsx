"use client"

import React from "react"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppStore } from "@/lib/app-store"
import { citizenUser } from "@/lib/mock-data"

function getPasswordStrength(password: string) {
  if (!password) return { level: 0, label: "", color: "" }
  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { level: 1, label: "Weak", color: "bg-destructive" }
  if (score <= 3)
    return { level: 2, label: "Medium", color: "bg-amber-400" }
  return { level: 3, label: "Strong", color: "bg-chart-1" }
}

export function RegistrationPage() {
  const { navigate, login } = useAppStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const strength = useMemo(() => getPasswordStrength(password), [password])
  const passwordsMatch =
    !confirmPassword || password === confirmPassword

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || !confirmPassword) return
    if (password !== confirmPassword) return
    login({ ...citizenUser, email, name: email.split("@")[0] })
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
            Create account
          </h1>
          <p className="mb-8 text-muted-foreground">
            Join the civic polling network today.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="reg-email" className="font-semibold text-foreground">
                Email Address
              </Label>
              <Input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border bg-card text-foreground"
              />
              <p className="text-xs text-muted-foreground">
                {"We'll use this for account verification."}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="reg-password" className="font-semibold text-foreground">
                Password
              </Label>
              <Input
                id="reg-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-border bg-card text-foreground"
              />
              {password && (
                <>
                  <div className="flex h-1.5 gap-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-full flex-1 rounded-full ${
                          i <= strength.level
                            ? strength.color
                            : "bg-border"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Strength: {strength.label}
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="reg-confirm" className="font-semibold text-foreground">
                Confirm Password
              </Label>
              <Input
                id="reg-confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`border-border bg-card text-foreground ${
                  !passwordsMatch
                    ? "border-destructive ring-1 ring-destructive"
                    : ""
                }`}
              />
              {!passwordsMatch && (
                <p className="text-sm text-destructive">
                  Passwords do not match
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={
                !email || !password || !confirmPassword || !passwordsMatch
              }
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("login")}
              className="font-medium text-primary hover:underline"
            >
              Log in
            </button>
          </p>

          <div className="mt-8 border-t border-border pt-4">
            <p className="text-xs text-muted-foreground">
              Submit to{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                POST /api/auth/register
              </code>
              . Validate inputs inline before submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
