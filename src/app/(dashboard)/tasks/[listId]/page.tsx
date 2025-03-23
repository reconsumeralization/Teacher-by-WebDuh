"use client"

import { useState, useEffect, useCallback } from "react"
import { CheckCircle2, Circle, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"

interface Task {
  id: string
  title: string
  completed: boolean
  dueDate?: Date
}

export default function TaskListPage({ params }: { params: { listId: string } }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")

  // Initialize tasks after mount to avoid hydration issues
  useEffect(() => {
    // Load tasks from storage or API
    const loadTasks = async () => {
      // Replace with actual API call or storage access
      const storedTasks = localStorage.getItem(`tasks-${params.listId}`)
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks))
      }
    }
    loadTasks()
  }, [params.listId])

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem(`tasks-${params.listId}`, JSON.stringify(tasks))
  }, [tasks, params.listId])

  const toggleTask = useCallback((taskId: string) => {
    setTasks(tasks => tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }, [])

  const deleteTask = useCallback((taskId: string) => {
    setTasks(tasks => tasks.filter((task) => task.id !== taskId))
  }, [])

  const addTask = useCallback(() => {
    if (!newTaskTitle.trim()) return
    setTasks(tasks => [
      ...tasks,
      { 
        id: crypto.randomUUID(), 
        title: newTaskTitle, 
        completed: false,
        dueDate: new Date()
      },
    ])
    setNewTaskTitle("")
  }, [newTaskTitle])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-neon-green">
          Task List {params.listId}
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">{tasks.length} tasks</span>
            <span className="text-zinc-400">•</span>
            <span className="text-zinc-400">
              {tasks.filter((t) => t.completed).length} completed
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg
                   text-white placeholder-zinc-500 focus:outline-none focus:border-neon-green
                   transition-colors"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-neon-green text-black rounded-lg hover:bg-neon-green/90
                   transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800
                     rounded-lg group hover:border-neon-green/30 transition-colors"
          >
            <button
              onClick={() => toggleTask(task.id)}
              className="text-zinc-400 hover:text-neon-green transition-colors"
              aria-label={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <div className="flex-1">
              <span
                className={`block ${
                  task.completed ? "text-zinc-500 line-through" : "text-white"
                }`}
              >
                {task.title}
              </span>
              {task.dueDate && (
                <span className="text-xs text-zinc-500">
                  Due: {format(task.dueDate, "MMM d, yyyy")}
                </span>
              )}
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 p-2 text-zinc-400
                       hover:text-red-500 hover:bg-zinc-800 rounded-lg transition-all"
              aria-label="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
