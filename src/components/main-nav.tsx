"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  GraduationCap,
  Brain,
  Users,
  Settings,
  HelpCircle,
} from "lucide-react"

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

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navigationItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Icon className="h-4 w-4 mr-2" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
} 