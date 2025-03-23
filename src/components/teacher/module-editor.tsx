import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmbeddedContent } from "@/components/teacher/embedded-content"
import { Plus, Trash2, Save, Eye } from "lucide-react"

interface ModuleContent {
  id: string
  title: string
  type: "text" | "video" | "interactive" | "quiz"
  content: string
  resources: string[]
}

export function ModuleEditor() {
  const [contents, setContents] = useState<ModuleContent[]>([
    {
      id: "1",
      title: "Introduction",
      type: "text",
      content: "",
      resources: [],
    },
  ])

  const addContent = () => {
    setContents([
      ...contents,
      {
        id: String(contents.length + 1),
        title: "",
        type: "text",
        content: "",
        resources: [],
      },
    ])
  }

  const removeContent = (id: string) => {
    setContents(contents.filter((content) => content.id !== id))
  }

  const updateContent = (
    id: string,
    field: keyof ModuleContent,
    value: string | string[]
  ) => {
    setContents(
      contents.map((content) =>
        content.id === id ? { ...content, [field]: value } : content
      )
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Label htmlFor="module-title">Module Title</Label>
          <Input id="module-title" placeholder="Enter module title" />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          {contents.map((content) => (
            <Card key={content.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Content Block {content.id}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeContent(content.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${content.id}`}>Title</Label>
                  <Input
                    id={`title-${content.id}`}
                    value={content.title}
                    onChange={(e) =>
                      updateContent(content.id, "title", e.target.value)
                    }
                    placeholder="Enter content title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`type-${content.id}`}>Type</Label>
                  <select
                    id={`type-${content.id}`}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={content.type}
                    onChange={(e) =>
                      updateContent(content.id, "type", e.target.value)
                    }
                    aria-label="Content type"
                  >
                    <option value="text">Text</option>
                    <option value="video">Video</option>
                    <option value="interactive">Interactive</option>
                    <option value="quiz">Quiz</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`content-${content.id}`}>Content</Label>
                  {content.type === "text" && (
                    <Textarea
                      id={`content-${content.id}`}
                      value={content.content}
                      onChange={(e) =>
                        updateContent(content.id, "content", e.target.value)
                      }
                      placeholder="Enter content"
                    />
                  )}
                  {content.type === "video" && (
                    <EmbeddedContent
                      title="Video Embed"
                      url="https://example.com/video-embed"
                      type="iframe"
                      height="300px"
                    />
                  )}
                  {content.type === "interactive" && (
                    <EmbeddedContent
                      title="Interactive Content"
                      url="https://example.com/interactive"
                      type="iframe"
                      height="300px"
                    />
                  )}
                  {content.type === "quiz" && (
                    <EmbeddedContent
                      title="Quiz Builder"
                      url="https://example.com/quiz-builder"
                      type="iframe"
                      height="300px"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" onClick={addContent} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Content Block
          </Button>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Library</CardTitle>
            </CardHeader>
            <CardContent>
              <EmbeddedContent
                title="Resource Manager"
                url="https://example.com/resource-manager"
                type="iframe"
                height="400px"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Module Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" placeholder="e.g., 2 hours" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prerequisites">Prerequisites</Label>
                <Input id="prerequisites" placeholder="Enter prerequisites" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="objectives">Learning Objectives</Label>
                <Textarea
                  id="objectives"
                  placeholder="Enter learning objectives"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 