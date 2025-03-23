"use client"

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"
import { getAllLists, createList, updateList, deleteList, addLesson, updateLesson, deleteLesson } from "@/lib/lists"
import type { LearningPath, Lesson } from "@/lib/lists"

interface TasksContextType {
  learningPaths: LearningPath[]
  isLoading: boolean
  error: Error | null
  createLearningPath: (name: string) => Promise<LearningPath>
  updateLearningPath: (id: string, updates: Partial<LearningPath>) => Promise<LearningPath | null>
  deleteLearningPath: (id: string) => Promise<boolean>
  addLessonToPath: (pathId: string, lesson: Omit<Lesson, "id" | "completed" | "completedAt">) => Promise<Lesson | null>
  updateLessonInPath: (pathId: string, lessonId: string, updates: Partial<Lesson>) => Promise<Lesson | null>
  deleteLessonFromPath: (pathId: string, lessonId: string) => Promise<boolean>
  refreshLearningPaths: () => Promise<void>
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Memoize the refresh function
  const refreshLearningPaths = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const paths = await getAllLists()
      setLearningPaths(paths)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load learning paths"))
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    refreshLearningPaths()
  }, [refreshLearningPaths])

  // Memoize the context value
  const contextValue = useMemo(() => ({
    learningPaths,
    isLoading,
    error,
    createLearningPath: async (name: string) => {
      try {
        const newPath = await createList(name)
        await refreshLearningPaths()
        return newPath
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to create learning path"))
        throw err
      }
    },
    updateLearningPath: async (id: string, updates: Partial<LearningPath>) => {
      try {
        const updated = await updateList(id, updates)
        if (updated) {
          await refreshLearningPaths()
        }
        return updated
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to update learning path"))
        throw err
      }
    },
    deleteLearningPath: async (id: string) => {
      try {
        const deleted = await deleteList(id)
        if (deleted) {
          await refreshLearningPaths()
        }
        return deleted
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to delete learning path"))
        throw err
      }
    },
    addLessonToPath: async (pathId: string, lesson: Omit<Lesson, "id" | "completed" | "completedAt">) => {
      try {
        const added = await addLesson(pathId, lesson)
        if (added) {
          await refreshLearningPaths()
        }
        return added
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to add lesson"))
        throw err
      }
    },
    updateLessonInPath: async (pathId: string, lessonId: string, updates: Partial<Lesson>) => {
      try {
        const updated = await updateLesson(pathId, lessonId, updates)
        if (updated) {
          await refreshLearningPaths()
        }
        return updated
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to update lesson"))
        throw err
      }
    },
    deleteLessonFromPath: async (pathId: string, lessonId: string) => {
      try {
        const deleted = await deleteLesson(pathId, lessonId)
        if (deleted) {
          await refreshLearningPaths()
        }
        return deleted
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to delete lesson"))
        throw err
      }
    },
    refreshLearningPaths,
  }), [learningPaths, isLoading, error, refreshLearningPaths])

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider")
  }
  return context
} 