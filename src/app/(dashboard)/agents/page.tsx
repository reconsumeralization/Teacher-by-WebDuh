"use client"

import { AgentList } from "@/components/agents/agent-list"
import { AgentsProvider } from "@/hooks/use-agents"
import { TasksProvider } from "@/hooks/use-tasks"

export default function AgentsPage() {
  return (
    <AgentsProvider>
      <TasksProvider>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Agents</h1>
            <p className="text-muted-foreground">Manage your task agents and their assignments</p>
          </div>

          <AgentList />
        </div>
      </TasksProvider>
    </AgentsProvider>
  )
}

