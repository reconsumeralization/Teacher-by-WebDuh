"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { getAllTasks, type Task, toggleTaskCompletion } from "@/lib/tasks"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  // Filter tasks based on search query
  const tasks = getAllTasks().filter((task) => task.title.toLowerCase().includes(query.toLowerCase()))

  const handleToggleCompletion = (taskId: string) => {
    toggleTaskCompletion(taskId)
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Search Results: {query}</h1>
        <Link href="/tasks">
          <Button variant="outline">Back to Tasks</Button>
        </Link>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">No tasks found matching &quot;{query}&quot;</p>
          </div>
        ) : (
          tasks.map((task) => <SearchTaskItem key={task.id} task={task} onToggleCompletion={handleToggleCompletion} />)
        )}
      </div>
    </div>
  )
}

function SearchTaskItem({
  task,
  onToggleCompletion,
}: {
  task: Task
  onToggleCompletion: (id: string) => void
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-md border p-3 transition-colors",
        task.completed && "bg-muted/50",
      )}
    >
      <div className="flex items-center gap-3">
        <Checkbox checked={task.completed} onCheckedChange={() => onToggleCompletion(task.id)} />
        <div className="space-y-1">
          <p className={cn("text-sm font-medium", task.completed && "text-muted-foreground line-through")}>
            {task.title}
          </p>
          <p className="text-xs text-muted-foreground">List: {task.listId === "inbox" ? "Inbox" : task.listId}</p>
        </div>
      </div>
      <Link href={`/tasks/${task.listId}`}>
        <Button variant="ghost" size="sm">
          View List
        </Button>
      </Link>
    </div>
  )
}

