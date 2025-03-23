import { ReactNode } from "react"
import { TeacherNav } from "@/components/teacher/nav"
import { TeacherHeader } from "@/components/teacher/header"

interface TeacherLayoutProps {
  children: ReactNode
}

export default function TeacherLayout({ children }: TeacherLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TeacherHeader />
      <div className="flex">
        <TeacherNav />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 