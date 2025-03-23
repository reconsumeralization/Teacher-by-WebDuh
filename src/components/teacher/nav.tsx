import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  Users,
  Calendar,
  BarChart,
  Settings,
  FileText,
  MessageSquare,
  GraduationCap,
  ClipboardList,
  Award,
  Network,
} from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/teacher",
    icon: BarChart,
  },
  {
    title: "Courses",
    href: "/teacher/courses",
    icon: BookOpen,
  },
  {
    title: "Students",
    href: "/teacher/students",
    icon: Users,
  },
  {
    title: "Schedule",
    href: "/teacher/schedule",
    icon: Calendar,
  },
  {
    title: "Assignments",
    href: "/teacher/assignments",
    icon: ClipboardList,
  },
  {
    title: "Grades",
    href: "/teacher/grades",
    icon: Award,
  },
  {
    title: "Resources",
    href: "/teacher/resources",
    icon: FileText,
  },
  {
    title: "Messages",
    href: "/teacher/messages",
    icon: MessageSquare,
  },
  {
    title: "Interactive Content",
    href: "/teacher/interactive-content",
    icon: Network,
  },
  {
    title: "Analytics",
    href: "/teacher/analytics",
    icon: GraduationCap,
  },
  {
    title: "Settings",
    href: "/teacher/settings",
    icon: Settings,
  },
]

export function TeacherNav() {
  const pathname = usePathname()

  return (
    <nav className="w-64 min-h-screen border-r bg-card">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Teacher Portal</h2>
      </div>
      <div className="space-y-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </div>
    </nav>
  )
} 