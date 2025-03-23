"use client"

import { useState, useEffect, useCallback, Suspense, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Menu,
  X,
  BookOpen,
  GraduationCap,
  Brain,
  Users,
  Settings,
  HelpCircle,
  ChevronRight,
  Bell,
  Loader2,
} from "lucide-react"

interface List {
  id: string
  name: string
  progress: number
  lastAccessed: Date
}

interface OverlappingSidebarsProps {
  lists: List[]
}

// Lazy load the right sidebar content
const RightSidebarContent = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4" role="region" aria-label="Learning progress">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Current Course</h3>
          <div className="mt-2 rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Introduction to AI</span>
              <span className="text-sm text-muted-foreground">Week 3</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-accent">
              <div 
                className="h-full w-2/3 rounded-full bg-primary"
                role="progressbar"
                aria-valuenow="66"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Course progress: 66%"
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Learning Streak</h3>
          <div className="mt-2 rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">7 Days</span>
              <span className="text-sm text-muted-foreground">Best: 14 days</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Next Lesson</h3>
          <div className="mt-2 rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Neural Networks Basics</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Understanding the fundamentals of neural networks and their applications
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function OverlappingSidebars({ lists }: OverlappingSidebarsProps) {
  const [isLeftOpen, setIsLeftOpen] = useState(false)
  const [isRightOpen, setIsRightOpen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const pathname = usePathname()
  const leftSidebarRef = useRef<HTMLDivElement>(null)
  const rightSidebarRef = useRef<HTMLDivElement>(null)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsLeftOpen(false)
      setIsRightOpen(false)
    }
  }, [])

  // Handle touch gestures
  const handleTouchStart = useCallback((event: TouchEvent) => {
    setTouchStart(event.touches[0].clientX)
  }, [])

  const handleTouchEnd = useCallback((event: TouchEvent) => {
    if (!touchStart) return

    const touchEnd = event.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    // Swipe left to close right sidebar
    if (diff > 50 && isRightOpen) {
      setIsRightOpen(false)
    }
    // Swipe right to close left sidebar
    else if (diff < -50 && isLeftOpen) {
      setIsLeftOpen(false)
    }
  }, [touchStart, isLeftOpen, isRightOpen])

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchend", handleTouchEnd)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleKeyDown, handleTouchStart, handleTouchEnd])

  // Close sidebars on route change
  useEffect(() => {
    setIsLeftOpen(false)
    setIsRightOpen(false)
  }, [pathname])

  // Focus management
  useEffect(() => {
    if (isLeftOpen || isRightOpen) {
      document.body.style.overflow = "hidden"
      // Focus the appropriate sidebar
      if (isLeftOpen && leftSidebarRef.current) {
        leftSidebarRef.current.focus()
      } else if (isRightOpen && rightSidebarRef.current) {
        rightSidebarRef.current.focus()
      }
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isLeftOpen, isRightOpen])

  const navigationItems = [
    {
      name: "Learning Paths",
      href: "/dashboard",
      icon: BookOpen,
    },
    {
      name: "AI Tutor",
      href: "/tutor",
      icon: Brain,
    },
    {
      name: "Community",
      href: "/community",
      icon: Users,
    },
    {
      name: "Resources",
      href: "/resources",
      icon: GraduationCap,
    },
    {
      name: "Help Center",
      href: "/help",
      icon: HelpCircle,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <>
      {/* Left Sidebar Toggle */}
      <button
        onClick={() => setIsLeftOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-md bg-background p-2 shadow-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Open navigation menu"
        aria-expanded="false"
        aria-controls="left-sidebar"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Right Sidebar Toggle */}
      <button
        onClick={() => setIsRightOpen(true)}
        className="fixed right-4 top-4 z-50 rounded-md bg-background p-2 shadow-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Open learning progress"
        aria-expanded="false"
        aria-controls="right-sidebar"
      >
        <Bell className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Left Sidebar */}
      <div
        ref={leftSidebarRef}
        id="left-sidebar"
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-background shadow-lg transition-transform duration-300 ease-in-out md:w-72",
          isLeftOpen ? "translate-x-0" : "-translate-x-full",
          isReducedMotion && "transition-none"
        )}
        tabIndex={-1}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Teacher by WebDuh</h2>
            <button
              onClick={() => setIsLeftOpen(false)}
              className="rounded-md p-1 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 p-4" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" aria-hidden="true" />
                  {item.name}
                </Link>
              )
            })}
            {lists.length > 0 && (
              <div className="mt-4">
                <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground">Your Learning Paths</h3>
                {lists.map((list) => (
                  <Link
                    key={list.id}
                    href={`/tasks/${list.id}`}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      pathname === `/tasks/${list.id}`
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <span className="truncate">{list.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {Math.round(list.progress * 100)}%
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Right Sidebar */}
      <div
        ref={rightSidebarRef}
        id="right-sidebar"
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-80 transform bg-background shadow-lg transition-transform duration-300 ease-in-out md:w-96",
          isRightOpen ? "translate-x-0" : "translate-x-full",
          isReducedMotion && "transition-none"
        )}
        tabIndex={-1}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Learning Progress</h2>
            <button
              onClick={() => setIsRightOpen(false)}
              className="rounded-md p-1 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Close learning progress"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <Suspense fallback={
            <div className="flex h-full items-center justify-center" role="status" aria-label="Loading learning progress">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" aria-hidden="true" />
            </div>
          }>
            <RightSidebarContent />
          </Suspense>
        </div>
      </div>

      {/* Overlay */}
      {(isLeftOpen || isRightOpen) && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => {
            setIsLeftOpen(false)
            setIsRightOpen(false)
          }}
          role="presentation"
          aria-hidden="true"
        />
      )}
    </>
  )
} 