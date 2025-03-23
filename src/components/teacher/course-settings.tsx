import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save } from "lucide-react"

interface CourseSettings {
  title: string
  description: string
  language: string
  visibility: "public" | "private" | "unlisted"
  enrollment: {
    type: "open" | "invite" | "waitlist"
    maxStudents: number
    waitlistEnabled: boolean
  }
  notifications: {
    email: boolean
    push: boolean
    announcements: boolean
    discussions: boolean
  }
  integrations: {
    calendar: boolean
    analytics: boolean
    storage: boolean
  }
}

export function CourseSettings() {
  const [settings, setSettings] = useState<CourseSettings>({
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of web development",
    language: "English",
    visibility: "private",
    enrollment: {
      type: "invite",
      maxStudents: 50,
      waitlistEnabled: true,
    },
    notifications: {
      email: true,
      push: true,
      announcements: true,
      discussions: true,
    },
    integrations: {
      calendar: true,
      analytics: true,
      storage: true,
    },
  })

  const updateSetting = (
    section: keyof CourseSettings,
    field: string,
    value: string | number | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: typeof prev[section] === "object"
        ? { ...prev[section], [field]: value }
        : value,
    }))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Course Settings</h2>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={settings.title}
                  onChange={(e) =>
                    updateSetting("title", "", e.target.value)
                  }
                  placeholder="Enter course title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={settings.description}
                  onChange={(e) =>
                    updateSetting("description", "", e.target.value)
                  }
                  placeholder="Enter course description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <select
                  id="language"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={settings.language}
                  onChange={(e) =>
                    updateSetting("language", "", e.target.value)
                  }
                  aria-label="Course language"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="visibility">Visibility</Label>
                <select
                  id="visibility"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={settings.visibility}
                  onChange={(e) =>
                    updateSetting("visibility", "", e.target.value)
                  }
                  aria-label="Course visibility"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="unlisted">Unlisted</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enrollment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="enrollment-type">Enrollment Type</Label>
                <select
                  id="enrollment-type"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={settings.enrollment.type}
                  onChange={(e) =>
                    updateSetting("enrollment", "type", e.target.value)
                  }
                  aria-label="Enrollment type"
                >
                  <option value="open">Open</option>
                  <option value="invite">Invite Only</option>
                  <option value="waitlist">Waitlist</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-students">Maximum Students</Label>
                <Input
                  id="max-students"
                  type="number"
                  value={settings.enrollment.maxStudents}
                  onChange={(e) =>
                    updateSetting(
                      "enrollment",
                      "maxStudents",
                      parseInt(e.target.value)
                    )
                  }
                  min="1"
                  placeholder="Enter maximum number of students"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="waitlist"
                  checked={settings.enrollment.waitlistEnabled}
                  onChange={(e) =>
                    updateSetting(
                      "enrollment",
                      "waitlistEnabled",
                      e.target.checked
                    )
                  }
                  aria-label="Enable waitlist"
                />
                <Label htmlFor="waitlist">Enable Waitlist</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Notification Channels</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.notifications.email}
                      onChange={(e) =>
                        updateSetting(
                          "notifications",
                          "email",
                          e.target.checked
                        )
                      }
                    />
                    Email Notifications
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.notifications.push}
                      onChange={(e) =>
                        updateSetting(
                          "notifications",
                          "push",
                          e.target.checked
                        )
                      }
                    />
                    Push Notifications
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notification Types</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.notifications.announcements}
                      onChange={(e) =>
                        updateSetting(
                          "notifications",
                          "announcements",
                          e.target.checked
                        )
                      }
                    />
                    Course Announcements
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.notifications.discussions}
                      onChange={(e) =>
                        updateSetting(
                          "notifications",
                          "discussions",
                          e.target.checked
                        )
                      }
                    />
                    Discussion Updates
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Available Integrations</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.integrations.calendar}
                      onChange={(e) =>
                        updateSetting(
                          "integrations",
                          "calendar",
                          e.target.checked
                        )
                      }
                    />
                    Calendar Integration
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.integrations.analytics}
                      onChange={(e) =>
                        updateSetting(
                          "integrations",
                          "analytics",
                          e.target.checked
                        )
                      }
                    />
                    Analytics Integration
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.integrations.storage}
                      onChange={(e) =>
                        updateSetting(
                          "integrations",
                          "storage",
                          e.target.checked
                        )
                      }
                    />
                    Cloud Storage Integration
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 