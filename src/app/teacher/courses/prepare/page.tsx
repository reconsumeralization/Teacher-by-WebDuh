import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmbeddedContent } from "@/components/teacher/embedded-content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Save, Trash2 } from "lucide-react"

// Example course structure data
const courseStructureData = {
  nodes: [
    { id: "1", label: "Introduction", type: "module", size: 20, color: "#ff6b6b" },
    { id: "2", label: "Core Concepts", type: "module", size: 20, color: "#4ecdc4" },
    { id: "3", label: "Advanced Topics", type: "module", size: 20, color: "#45b7d1" },
    { id: "4", label: "Week 1", type: "week", size: 15, color: "#96ceb4" },
    { id: "5", label: "Week 2", type: "week", size: 15, color: "#96ceb4" },
    { id: "6", label: "Week 3", type: "week", size: 15, color: "#96ceb4" },
  ],
  links: [
    { source: "1", target: "4", value: 1 },
    { source: "2", target: "5", value: 1 },
    { source: "3", target: "6", value: 1 },
  ],
}

export default function CoursePreparationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Course Preparation</h2>
          <p className="text-muted-foreground">
            Design and organize your course content with interactive elements.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input id="title" placeholder="Enter course title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter course description" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" placeholder="e.g., 8 weeks" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Input id="level" placeholder="e.g., Beginner, Intermediate" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <EmbeddedContent
                  title="Course Modules"
                  type="graph"
                  data={courseStructureData}
                  height="400px"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Module Content</CardTitle>
                <Button variant="outline" size="sm" className="mt-2">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Module
                </Button>
              </CardHeader>
              <CardContent>
                <EmbeddedContent
                  title="Module Editor"
                  url="https://example.com/module-editor"
                  type="iframe"
                  height="400px"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <EmbeddedContent
                  title="Content Preview"
                  url="https://example.com/content-preview"
                  type="iframe"
                  height="400px"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resource Library</CardTitle>
                <Button variant="outline" size="sm" className="mt-2">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Resource
                </Button>
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

            <Card>
              <CardHeader>
                <CardTitle>Resource Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <EmbeddedContent
                  title="Resource Map"
                  type="chart"
                  data={courseStructureData}
                  height="400px"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assessment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Builder</CardTitle>
                <Button variant="outline" size="sm" className="mt-2">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Assessment
                </Button>
              </CardHeader>
              <CardContent>
                <EmbeddedContent
                  title="Assessment Editor"
                  url="https://example.com/assessment-builder"
                  type="iframe"
                  height="400px"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assessment Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <EmbeddedContent
                  title="Assessment Preview"
                  url="https://example.com/assessment-preview"
                  type="iframe"
                  height="400px"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 