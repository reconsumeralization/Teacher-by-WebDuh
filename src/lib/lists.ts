interface LearningPath {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
  lessons: Lesson[]
  progress: number
}

interface Lesson {
  id: string
  title: string
  description: string
  content: string
  duration: number
  completed: boolean
  completedAt?: Date
}

const STORAGE_KEY = "learning_paths"

export function getAllLists(): LearningPath[] {
  if (typeof window === "undefined") return []
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []
  
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

export function createList(name: string): LearningPath {
  const lists = getAllLists()
  const newList: LearningPath = {
    id: crypto.randomUUID(),
    name,
    createdAt: new Date(),
    updatedAt: new Date(),
    lessons: [],
    progress: 0,
  }
  
  lists.push(newList)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
  return newList
}

export function updateList(id: string, updates: Partial<LearningPath>): LearningPath | null {
  const lists = getAllLists()
  const index = lists.findIndex((list) => list.id === id)
  
  if (index === -1) return null
  
  lists[index] = {
    ...lists[index],
    ...updates,
    updatedAt: new Date(),
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
  return lists[index]
}

export function deleteList(id: string): boolean {
  const lists = getAllLists()
  const filtered = lists.filter((list) => list.id !== id)
  
  if (filtered.length === lists.length) return false
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  return true
}

export function addLesson(listId: string, lesson: Omit<Lesson, "id" | "completed" | "completedAt">): Lesson | null {
  const lists = getAllLists()
  const index = lists.findIndex((list) => list.id === listId)
  
  if (index === -1) return null
  
  const newLesson: Lesson = {
    ...lesson,
    id: crypto.randomUUID(),
    completed: false,
  }
  
  lists[index].lessons.push(newLesson)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
  return newLesson
}

export function updateLesson(listId: string, lessonId: string, updates: Partial<Lesson>): Lesson | null {
  const lists = getAllLists()
  const listIndex = lists.findIndex((list) => list.id === listId)
  
  if (listIndex === -1) return null
  
  const lessonIndex = lists[listIndex].lessons.findIndex((lesson) => lesson.id === lessonId)
  if (lessonIndex === -1) return null
  
  lists[listIndex].lessons[lessonIndex] = {
    ...lists[listIndex].lessons[lessonIndex],
    ...updates,
  }
  
  // Update progress
  const completedLessons = lists[listIndex].lessons.filter((lesson) => lesson.completed).length
  lists[listIndex].progress = (completedLessons / lists[listIndex].lessons.length) * 100
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
  return lists[listIndex].lessons[lessonIndex]
}

export function deleteLesson(listId: string, lessonId: string): boolean {
  const lists = getAllLists()
  const listIndex = lists.findIndex((list) => list.id === listId)
  
  if (listIndex === -1) return false
  
  const initialLength = lists[listIndex].lessons.length
  lists[listIndex].lessons = lists[listIndex].lessons.filter((lesson) => lesson.id !== lessonId)
  
  if (lists[listIndex].lessons.length === initialLength) return false
  
  // Update progress
  const completedLessons = lists[listIndex].lessons.filter((lesson) => lesson.completed).length
  lists[listIndex].progress = (completedLessons / lists[listIndex].lessons.length) * 100
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
  return true
} 