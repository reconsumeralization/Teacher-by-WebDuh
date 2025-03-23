import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmbeddedContent } from "@/components/teacher/embedded-content"
import { Plus, Trash2, Upload, Link } from "lucide-react"

interface Resource {
  id: string
  title: string
  type: "file" | "link" | "text"
  url?: string
  content?: string
  tags: string[]
}

export function ResourceManager() {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "1",
      title: "Course Syllabus",
      type: "file",
      url: "https://example.com/syllabus.pdf",
      tags: ["syllabus", "documentation"],
    },
  ])

  const addResource = () => {
    const newResource: Resource = {
      id: `resource-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: '',
      type: 'file',
      tags: [],
    }
    setResources([...resources, newResource])
  }

  const removeResource = (id: string) => {
    setResources(resources.filter((resource) => resource.id !== id))
  }

  const updateResource = (
    id: string,
    field: keyof Resource,
    value: string | string[]
  ) => {
    setResources(
      resources.map((resource) =>
        resource.id === id ? { ...resource, [field]: value } : resource
      )
    )
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="resources" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="space-y-4">
          {resources.map((resource) => (
            <Card key={resource.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Resource {resource.id}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeResource(resource.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${resource.id}`}>Title</Label>
                  <Input
                    id={`title-${resource.id}`}
                    value={resource.title}
                    onChange={(e) =>
                      updateResource(resource.id, "title", e.target.value)
                    }
                    placeholder="Enter resource title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`type-${resource.id}`}>Type</Label>
                  <select
                    id={`type-${resource.id}`}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={resource.type}
                    onChange={(e) =>
                      updateResource(resource.id, "type", e.target.value)
                    }
                    aria-label="Resource type"
                  >
                    <option value="file">File</option>
                    <option value="link">Link</option>
                    <option value="text">Text</option>
                  </select>
                </div>
                {resource.type === "file" && (
                  <div className="space-y-2">
                    <Label htmlFor={`url-${resource.id}`}>File URL</Label>
                    <div className="flex space-x-2">
                      <Input
                        id={`url-${resource.id}`}
                        value={resource.url}
                        onChange={(e) =>
                          updateResource(resource.id, "url", e.target.value)
                        }
                        placeholder="Enter file URL"
                      />
                      <Button variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                {resource.type === "link" && (
                  <div className="space-y-2">
                    <Label htmlFor={`url-${resource.id}`}>Link URL</Label>
                    <div className="flex space-x-2">
                      <Input
                        id={`url-${resource.id}`}
                        value={resource.url}
                        onChange={(e) =>
                          updateResource(resource.id, "url", e.target.value)
                        }
                        placeholder="Enter link URL"
                      />
                      <Button variant="outline" size="icon">
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                {resource.type === "text" && (
                  <div className="space-y-2">
                    <Label htmlFor={`content-${resource.id}`}>Content</Label>
                    <textarea
                      id={`content-${resource.id}`}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={resource.content}
                      onChange={(e) =>
                        updateResource(resource.id, "content", e.target.value)
                      }
                      placeholder="Enter content"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor={`tags-${resource.id}`}>Tags</Label>
                  <Input
                    id={`tags-${resource.id}`}
                    value={resource.tags.join(", ")}
                    onChange={(e) =>
                      updateResource(resource.id, "tags", e.target.value.split(", "))
                    }
                    placeholder="Enter tags (comma-separated)"
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" onClick={addResource} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Library</CardTitle>
            </CardHeader>
            <CardContent>
              <EmbeddedContent
                title="Resource Library"
                url="https://example.com/resource-library"
                type="iframe"
                height="400px"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-type">Default Resource Type</Label>
                <select
                  id="default-type"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  aria-label="Default resource type"
                >
                  <option value="file">File</option>
                  <option value="link">Link</option>
                  <option value="text">Text</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowed-types">Allowed Resource Types</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked /> Files
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked /> Links
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked /> Text
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