import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Save, Eye, Clock, Pin } from "lucide-react"

interface Announcement {
  id: string
  title: string
  content: string
  isPinned: boolean
  createdAt: string
  scheduledFor?: string
  attachments: string[]
}

export function CourseAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Welcome to the Course!",
      content: "Welcome to Introduction to Web Development. We're excited to have you here!",
      isPinned: true,
      createdAt: "2024-03-20T10:00:00Z",
      attachments: [],
    },
  ])

  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
    title: "",
    content: "",
    isPinned: false,
    attachments: [],
  })

  const addAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) return

    const announcement: Announcement = {
      id: String(announcements.length + 1),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      isPinned: newAnnouncement.isPinned || false,
      createdAt: new Date().toISOString(),
      scheduledFor: newAnnouncement.scheduledFor,
      attachments: newAnnouncement.attachments || [],
    }

    setAnnouncements([announcement, ...announcements])
    setNewAnnouncement({
      title: "",
      content: "",
      isPinned: false,
      attachments: [],
    })
  }

  const removeAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id))
  }

  const togglePin = (id: string) => {
    setAnnouncements(
      announcements.map((a) =>
        a.id === id ? { ...a, isPinned: !a.isPinned } : a
      )
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Course Announcements</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pinned">Pinned</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Announcement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newAnnouncement.title}
                  onChange={(e) =>
                    setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
                  }
                  placeholder="Enter announcement title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <textarea
                  id="content"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newAnnouncement.content}
                  onChange={(e) =>
                    setNewAnnouncement({ ...newAnnouncement, content: e.target.value })
                  }
                  placeholder="Enter announcement content"
                  aria-label="Announcement content"
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="pin"
                    checked={newAnnouncement.isPinned}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        isPinned: e.target.checked,
                      })
                    }
                    aria-label="Pin announcement"
                  />
                  <Label htmlFor="pin">Pin Announcement</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="datetime-local"
                    id="schedule"
                    value={newAnnouncement.scheduledFor || ""}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        scheduledFor: e.target.value,
                      })
                    }
                    aria-label="Schedule announcement"
                  />
                  <Label htmlFor="schedule">Schedule</Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button size="sm" onClick={addAnnouncement}>
                  <Save className="mr-2 h-4 w-4" />
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => togglePin(announcement.id)}
                      aria-label={announcement.isPinned ? "Unpin announcement" : "Pin announcement"}
                    >
                      <Pin
                        className={`h-4 w-4 ${
                          announcement.isPinned ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                    <CardTitle className="text-sm font-medium">
                      {announcement.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAnnouncement(announcement.id)}
                      aria-label="Delete announcement"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {announcement.content}
                  </p>
                  <div className="mt-4 flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(announcement.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {announcement.scheduledFor && (
                      <div className="flex items-center space-x-1">
                        <span>Scheduled for:</span>
                        <span>
                          {new Date(announcement.scheduledFor).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pinned" className="space-y-4">
          <div className="space-y-4">
            {announcements
              .filter((a) => a.isPinned)
              .map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePin(announcement.id)}
                        aria-label={announcement.isPinned ? "Unpin announcement" : "Pin announcement"}
                      >
                        <Pin className="h-4 w-4 fill-current" />
                      </Button>
                      <CardTitle className="text-sm font-medium">
                        {announcement.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAnnouncement(announcement.id)}
                        aria-label="Delete announcement"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {announcement.content}
                    </p>
                    <div className="mt-4 flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {new Date(announcement.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <div className="space-y-4">
            {announcements
              .filter((a) => a.scheduledFor)
              .map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePin(announcement.id)}
                        aria-label={announcement.isPinned ? "Unpin announcement" : "Pin announcement"}
                      >
                        <Pin
                          className={`h-4 w-4 ${
                            announcement.isPinned ? "fill-current" : ""
                          }`}
                        />
                      </Button>
                      <CardTitle className="text-sm font-medium">
                        {announcement.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAnnouncement(announcement.id)}
                        aria-label="Delete announcement"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {announcement.content}
                    </p>
                    <div className="mt-4 flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {new Date(announcement.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>Scheduled for:</span>
                        <span>
                          {new Date(announcement.scheduledFor!).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 