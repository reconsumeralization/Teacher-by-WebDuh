import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Save, Eye, Clock, MessageSquare, Flag, Lock } from "lucide-react"

interface Discussion {
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
    role: "teacher" | "student"
  }
  createdAt: string
  isLocked: boolean
  isPinned: boolean
  replies: Reply[]
}

interface Reply {
  id: string
  content: string
  author: {
    id: string
    name: string
    role: "teacher" | "student"
  }
  createdAt: string
  isReported: boolean
}

export function CourseDiscussions() {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: "1",
      title: "Getting Started with Web Development",
      content: "What are your thoughts on starting with HTML and CSS?",
      author: {
        id: "1",
        name: "John Doe",
        role: "teacher",
      },
      createdAt: "2024-03-20T10:00:00Z",
      isLocked: false,
      isPinned: true,
      replies: [
        {
          id: "1",
          content: "I think starting with HTML and CSS is a great approach!",
          author: {
            id: "2",
            name: "Jane Smith",
            role: "student",
          },
          createdAt: "2024-03-20T11:00:00Z",
          isReported: false,
        },
      ],
    },
  ])

  const [newDiscussion, setNewDiscussion] = useState<Partial<Discussion>>({
    title: "",
    content: "",
    isLocked: false,
    isPinned: false,
    replies: [],
  })

  const addDiscussion = () => {
    if (!newDiscussion.title || !newDiscussion.content) return

    const discussion: Discussion = {
      id: String(discussions.length + 1),
      title: newDiscussion.title,
      content: newDiscussion.content,
      author: {
        id: "1", // Current teacher's ID
        name: "John Doe", // Current teacher's name
        role: "teacher",
      },
      createdAt: new Date().toISOString(),
      isLocked: newDiscussion.isLocked || false,
      isPinned: newDiscussion.isPinned || false,
      replies: [],
    }

    setDiscussions([discussion, ...discussions])
    setNewDiscussion({
      title: "",
      content: "",
      isLocked: false,
      isPinned: false,
      replies: [],
    })
  }

  const removeDiscussion = (id: string) => {
    setDiscussions(discussions.filter((d) => d.id !== id))
  }

  const toggleLock = (id: string) => {
    setDiscussions(
      discussions.map((d) =>
        d.id === id ? { ...d, isLocked: !d.isLocked } : d
      )
    )
  }

  const togglePin = (id: string) => {
    setDiscussions(
      discussions.map((d) =>
        d.id === id ? { ...d, isPinned: !d.isPinned } : d
      )
    )
  }

  const removeReply = (discussionId: string, replyId: string) => {
    setDiscussions(
      discussions.map((d) =>
        d.id === discussionId
          ? {
              ...d,
              replies: d.replies.filter((r) => r.id !== replyId),
            }
          : d
      )
    )
  }

  const toggleReport = (discussionId: string, replyId: string) => {
    setDiscussions(
      discussions.map((d) =>
        d.id === discussionId
          ? {
              ...d,
              replies: d.replies.map((r) =>
                r.id === replyId
                  ? { ...r, isReported: !r.isReported }
                  : r
              ),
            }
          : d
      )
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Course Discussions</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Discussion
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pinned">Pinned</TabsTrigger>
          <TabsTrigger value="reported">Reported</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Discussion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newDiscussion.title}
                  onChange={(e) =>
                    setNewDiscussion({ ...newDiscussion, title: e.target.value })
                  }
                  placeholder="Enter discussion title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <textarea
                  id="content"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newDiscussion.content}
                  onChange={(e) =>
                    setNewDiscussion({ ...newDiscussion, content: e.target.value })
                  }
                  placeholder="Enter discussion content"
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="lock"
                    checked={newDiscussion.isLocked}
                    onChange={(e) =>
                      setNewDiscussion({
                        ...newDiscussion,
                        isLocked: e.target.checked,
                      })
                    }
                    aria-label="Lock discussion"
                  />
                  <Label htmlFor="lock">Lock Discussion</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="pin"
                    checked={newDiscussion.isPinned}
                    onChange={(e) =>
                      setNewDiscussion({
                        ...newDiscussion,
                        isPinned: e.target.checked,
                      })
                    }
                    aria-label="Pin discussion"
                  />
                  <Label htmlFor="pin">Pin Discussion</Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button size="sm" onClick={addDiscussion}>
                  <Save className="mr-2 h-4 w-4" />
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleLock(discussion.id)}
                    >
                      <Lock
                        className={`h-4 w-4 ${
                          discussion.isLocked ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => togglePin(discussion.id)}
                    >
                      <MessageSquare
                        className={`h-4 w-4 ${
                          discussion.isPinned ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                    <CardTitle className="text-sm font-medium">
                      {discussion.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDiscussion(discussion.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {discussion.content}
                  </p>
                  <div className="mt-4 flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(discussion.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>by {discussion.author.name}</span>
                    </div>
                  </div>

                  {discussion.replies.length > 0 && (
                    <div className="mt-4 space-y-4 border-t pt-4">
                      <h4 className="text-sm font-medium">Replies</h4>
                      {discussion.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="rounded-lg border bg-muted/50 p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">
                                {reply.author.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(reply.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  toggleReport(discussion.id, reply.id)
                                }
                              >
                                <Flag
                                  className={`h-4 w-4 ${
                                    reply.isReported ? "fill-current" : ""
                                  }`}
                                />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  removeReply(discussion.id, reply.id)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {reply.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pinned" className="space-y-4">
          <div className="space-y-4">
            {discussions
              .filter((d) => d.isPinned)
              .map((discussion) => (
                <Card key={discussion.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleLock(discussion.id)}
                      >
                        <Lock
                          className={`h-4 w-4 ${
                            discussion.isLocked ? "fill-current" : ""
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePin(discussion.id)}
                      >
                        <MessageSquare className="h-4 w-4 fill-current" />
                      </Button>
                      <CardTitle className="text-sm font-medium">
                        {discussion.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDiscussion(discussion.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {discussion.content}
                    </p>
                    <div className="mt-4 flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {new Date(discussion.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>by {discussion.author.name}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="reported" className="space-y-4">
          <div className="space-y-4">
            {discussions
              .filter((d) => d.replies.some((r) => r.isReported))
              .map((discussion) => (
                <Card key={discussion.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleLock(discussion.id)}
                      >
                        <Lock
                          className={`h-4 w-4 ${
                            discussion.isLocked ? "fill-current" : ""
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePin(discussion.id)}
                      >
                        <MessageSquare
                          className={`h-4 w-4 ${
                            discussion.isPinned ? "fill-current" : ""
                          }`}
                        />
                      </Button>
                      <CardTitle className="text-sm font-medium">
                        {discussion.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDiscussion(discussion.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {discussion.content}
                    </p>
                    <div className="mt-4 flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {new Date(discussion.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>by {discussion.author.name}</span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-4 border-t pt-4">
                      <h4 className="text-sm font-medium">Reported Replies</h4>
                      {discussion.replies
                        .filter((r) => r.isReported)
                        .map((reply) => (
                          <div
                            key={reply.id}
                            className="rounded-lg border bg-muted/50 p-4"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">
                                  {reply.author.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(reply.createdAt).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    toggleReport(discussion.id, reply.id)
                                  }
                                >
                                  <Flag className="h-4 w-4 fill-current" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    removeReply(discussion.id, reply.id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                              {reply.content}
                            </p>
                          </div>
                        ))}
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