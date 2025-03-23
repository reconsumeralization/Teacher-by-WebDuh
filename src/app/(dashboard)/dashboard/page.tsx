"use client"

import { useTasks } from "@/hooks/use-tasks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Target, Brain } from "lucide-react"

export default function DashboardPage() {
  const { learningPaths } = useTasks()

  // Calculate metrics
  const totalLessons = learningPaths.reduce((acc, path) => acc + path.tasks.length, 0)
  const completedLessons = learningPaths.reduce(
    (acc, path) => acc + path.tasks.filter((task) => task.completed).length,
    0
  )
  const totalStudyTime = learningPaths.reduce(
    (acc, path) => acc + path.tasks.filter((task) => task.completed).length * 30, // Assuming 30 minutes per lesson
    0
  )
  const averageProgress = learningPaths.length > 0
    ? learningPaths.reduce((acc, path) => acc + path.progress, 0) / learningPaths.length
    : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">
          Continue your learning journey with Teacher by WebDuh
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Learning Paths</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{learningPaths.length}</div>
            <p className="text-xs text-muted-foreground">
              {learningPaths.length === 1 ? "Learning path" : "Learning paths"} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Lessons</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedLessons}</div>
            <p className="text-xs text-muted-foreground">
              of {totalLessons} total lessons
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudyTime} min</div>
            <p className="text-xs text-muted-foreground">
              Time spent learning
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(averageProgress * 100)}%</div>
            <Progress value={averageProgress * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Learning Paths</CardTitle>
            <CardDescription>Track your progress across different subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {learningPaths.map((path) => (
                <div key={path.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{path.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {path.tasks.filter((task) => task.completed).length} of {path.tasks.length} lessons completed
                    </p>
                  </div>
                  <Progress value={path.progress * 100} className="w-[100px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest learning achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {learningPaths
                .flatMap((path) =>
                  path.tasks
                    .filter((task) => task.completed)
                    .map((task) => ({
                      ...task,
                      pathName: path.name,
                    }))
                )
                .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
                .slice(0, 5)
                .map((task) => (
                  <div key={task.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.pathName}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {task.completedAt.toLocaleDateString()}
                    </p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

