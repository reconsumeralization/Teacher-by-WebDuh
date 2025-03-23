"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [taskReminders, setTaskReminders] = useState(true)
  const [isPublicProfile, setIsPublicProfile] = useState(true)

  const handleSaveNotificationSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated",
    })
  }

  const handleSavePrivacySettings = () => {
    toast({
      title: "Settings saved",
      description: "Your privacy settings have been updated",
    })
  }

  const handleClearData = () => {
    toast({
      title: "Data cleared",
      description: "All your data has been cleared",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how Wonder List looks on your device.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="theme-toggle">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Switch between light and dark mode.</p>
              </div>
              <Switch
                id="theme-toggle"
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email notifications for important updates.</p>
              </div>
              <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications on your device.</p>
              </div>
              <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="task-reminders">Task Reminders</Label>
                <p className="text-sm text-muted-foreground">Receive reminders for upcoming tasks.</p>
              </div>
              <Switch id="task-reminders" checked={taskReminders} onCheckedChange={setTaskReminders} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveNotificationSettings}>Save Notification Settings</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
            <CardDescription>Manage your privacy settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="public-profile">Public Profile</Label>
                <p className="text-sm text-muted-foreground">Make your profile visible to other users.</p>
              </div>
              <Switch id="public-profile" checked={isPublicProfile} onCheckedChange={setIsPublicProfile} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSavePrivacySettings}>Save Privacy Settings</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Manage your Wonder List data.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Clear all your tasks and account data. This action cannot be undone.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" onClick={handleClearData}>
              Clear All Data
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

