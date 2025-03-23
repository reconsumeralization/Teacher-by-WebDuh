"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllTasks, claimTask, unclaimTask, type Task } from "@/lib/tasks"
import { getAllUsers, getCurrentUser, type User } from "@/lib/users"
import { formatDistanceToNow } from "date-fns"

export default function StreamPage() {
  const [filter, setFilter] = useState<"all" | "mine" | "unassigned">("all")
  const currentUser = getCurrentUser()
  const tasks = getAllTasks()
  const users = getAllUsers()

  // Filter tasks based on the selected tab
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "mine") return task.assignedTo === currentUser.id
    if (filter === "unassigned") return !task.assignedTo
    return true
  })

  // Sort tasks by creation date (newest first)
  const sortedTasks = [...filteredTasks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const handleClaimTask = (taskId: string) => {
    claimTask(taskId, currentUser.id)
  }

  const handleUnclaimTask = (taskId: string) => {
    unclaimTask(taskId)
  }

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Social Stream</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value as any)}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="mine">My Tasks</TabsTrigger>
              <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {renderTaskStream(sortedTasks, users, currentUser, handleClaimTask, handleUnclaimTask)}
            </TabsContent>

            <TabsContent value="mine" className="space-y-4">
              {renderTaskStream(sortedTasks, users, currentUser, handleClaimTask, handleUnclaimTask)}
            </TabsContent>

            <TabsContent value="unassigned" className="space-y-4">
              {renderTaskStream(sortedTasks, users, currentUser, handleClaimTask, handleUnclaimTask)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function renderTaskStream(
  tasks: Task[],
  users: User[],
  currentUser: User,
  onClaimTask: (id: string) => void,
  onUnclaimTask: (id: string) => void,
) {
  if (tasks.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
        <p className="text-sm text-muted-foreground">No tasks found</p>
      </div>
    )
  }

  return tasks.map((task) => {
    const assignedUser = task.assignedTo ? users.find((user) => user.id === task.assignedTo) : null
    const isAssignedToCurrentUser = task.assignedTo === currentUser.id

    return (
      <div key={task.id} className="border rounded-lg p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {assignedUser ? (
              <Avatar>
                <AvatarImage src={assignedUser.avatar} alt={assignedUser.name} />
                <AvatarFallback>{assignedUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar>
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
            )}
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-muted-foreground">
                {assignedUser ? `Assigned to ${assignedUser.name}` : "Unassigned"} ·{" "}
                {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          {!task.assignedTo ? (
            <Button size="sm" onClick={() => onClaimTask(task.id)}>
              Claim Task
            </Button>
          ) : isAssignedToCurrentUser ? (
            <Button size="sm" variant="outline" onClick={() => onUnclaimTask(task.id)}>
              Release
            </Button>
          ) : null}
        </div>

        <div className="pl-12 text-sm">
          {task.dueDate && <p className="text-muted-foreground">Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
          <p className="text-xs text-muted-foreground mt-1">
            From list: {task.listId === "inbox" ? "Inbox" : task.listId}
          </p>
        </div>
      </div>
    )
  })
}

