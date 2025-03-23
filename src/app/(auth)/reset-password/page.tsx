"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

export default function ResetPasswordPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await resetPassword(email)
      setIsSubmitted(true)
      toast({
        title: "Success",
        description: "Password reset instructions have been sent to your email",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset instructions",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Reset your password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset your password
          </p>
        </div>
        <Card>
          {!isSubmitted ? (
            <form onSubmit={handleResetPassword}>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-1">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Send Reset Link
                      </span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </form>
          ) : (
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Check your email</h3>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ve sent a password reset link to <span className="font-medium">{email}</span>
                  </p>
                </div>
                <Button variant="outline" className="w-full" onClick={() => router.push("/login")}>
                  Back to Login
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
        <div className="flex flex-col space-y-4">
          <Separator />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/login"
              className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-primary"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

