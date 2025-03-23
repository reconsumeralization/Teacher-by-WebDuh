"use client"

import { TaskList } from "@/components/tasks/task-list"
import { AgentsProvider } from "@/hooks/use-agents"
import { TasksProvider } from "@/hooks/use-tasks"

export default function TasksPage() {
  return (
    <AgentsProvider>
      <TasksProvider>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">Manage and assign tasks to your agents</p>
          </div>

          <TaskList />
        </div>
      </TasksProvider>
    </AgentsProvider>
  )
}

