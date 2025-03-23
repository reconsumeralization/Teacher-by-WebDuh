"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, BookOpen, ChevronRight, ChevronDown } from "lucide-react"

interface LearningPath {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  lists: LearningPath[]
  newListName: string
  setNewListName: (name: string) => void
  handleCreateList: () => void
}

export function Sidebar({
  className,
  lists,
  newListName,
  setNewListName,
  handleCreateList,
  ...props
}: SidebarProps) {
  const pathname = usePathname()
  const [expandedLists, setExpandedLists] = useState<string[]>([])

  const toggleList = (listId: string) => {
    setExpandedLists((prev) =>
      prev.includes(listId)
        ? prev.filter((id) => id !== listId)
        : [...prev, listId]
    )
  }

  return (
    <div
      className={cn(
        "flex h-full w-64 flex-col border-r bg-background",
        className
      )}
      {...props}
    >
      <div className="flex h-14 items-center border-b px-4">
        <h2 className="text-lg font-semibold">Learning Paths</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {lists.map((list) => (
            <div key={list.id}>
              <button
                onClick={() => toggleList(list.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === `/learning-paths/${list.id}`
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>{list.name}</span>
                </div>
                {expandedLists.includes(list.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {expandedLists.includes(list.id) && (
                <div className="ml-6 mt-1 space-y-1">
                  <Link
                    href={`/learning-paths/${list.id}/overview`}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === `/learning-paths/${list.id}/overview`
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    Overview
                  </Link>
                  <Link
                    href={`/learning-paths/${list.id}/lessons`}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === `/learning-paths/${list.id}/lessons`
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    Lessons
                  </Link>
                  <Link
                    href={`/learning-paths/${list.id}/progress`}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === `/learning-paths/${list.id}/progress`
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    Progress
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="New learning path..."
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateList()
              }
            }}
          />
          <Button
            size="icon"
            onClick={handleCreateList}
            disabled={!newListName.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 