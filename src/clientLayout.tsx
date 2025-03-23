"use client"

import type React from "react"
import { useEffect, useCallback } from "react"

import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import { AnimatePresence } from "framer-motion"
import { useAssistant } from "@/contexts/assistant-context"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { toggleOpen, isOpen } = useAssistant()

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Alt + A to toggle assistant
    if (e.altKey && e.key === "a") {
      toggleOpen()
    }

    // Escape to close assistant if open
    if (e.key === "Escape" && isOpen) {
      toggleOpen()
    }
  }, [toggleOpen, isOpen])

  // Add keyboard shortcut to toggle assistant
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <AnimatePresence mode="wait">{children}</AnimatePresence>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

