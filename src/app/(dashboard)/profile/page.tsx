"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useTasks } from "@/hooks/use-tasks"
import { TaskCard } from "@/components/task-card"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  const { toast } = useToast()
  const { user, updateProfile } = useAuth()
  const { tasks } = useTasks()
  const [name, setName] = useState(user?.name || "")
  const [bio, setBio] = useState(user?.bio || "")
  const [isLoading, setIsLoading] = useState(false)

  // Filter tasks claimed by the current user
  const userTasks = tasks.filter((task) => task.assignedTo === "current-user") // Replace with actual user ID
  const completedTasks = userTasks.filter((task) => task.completed)
  const completionPercentage = userTasks.length > 0 ? Math.round((completedTasks.length / userTasks.length) * 100) : 0

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await updateProfile({ name, bio })
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and view your tasks.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <motion.div variants={itemVariants}>
          <Card className="border-2 shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Update your profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                    <AvatarImage src={user?.avatar || "/placeholder.svg?height=96&width=96"} alt={user?.name} />
                    <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                      {user?.name?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div className="text-center">
                  <h3 className="text-lg font-medium">{user?.name}</h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      disabled={isLoading}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button type="submit" className="w-full relative overflow-hidden group" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Profile"}
                    <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 group-hover:w-full"></span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <Card className="border-2 shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle>Task Statistics</CardTitle>
                <CardDescription>Overview of your task activity.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <motion.div
                      className="space-y-1"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className="text-3xl font-bold">{userTasks.length}</p>
                      <p className="text-sm text-muted-foreground">Total Tasks</p>
                    </motion.div>
                    <motion.div
                      className="space-y-1"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className="text-3xl font-bold">{completedTasks.length}</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </motion.div>
                    <motion.div
                      className="space-y-1"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className="text-3xl font-bold">{userTasks.length - completedTasks.length}</p>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion Rate</span>
                      <span className="font-medium">{completionPercentage}%</span>
                    </div>
                    <Progress value={completionPercentage} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-2 shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle>Your Tasks</CardTitle>
                <CardDescription>Tasks you have claimed.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="active" className="relative">
                      Active
                      <motion.div
                        className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary"
                        initial={false}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="relative">
                      Completed
                      <motion.div
                        className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary"
                        initial={false}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="active" className="mt-4 space-y-4">
                    {userTasks.filter((task) => !task.completed).length === 0 ? (
                      <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                        <p className="text-sm text-muted-foreground">No active tasks</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userTasks
                          .filter((task) => !task.completed)
                          .map((task) => (
                            <TaskCard key={task.id} task={task} compact />
                          ))}
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="completed" className="mt-4 space-y-4">
                    {completedTasks.length === 0 ? (
                      <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                        <p className="text-sm text-muted-foreground">No completed tasks</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {completedTasks.map((task) => (
                          <TaskCard key={task.id} task={task} compact />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

