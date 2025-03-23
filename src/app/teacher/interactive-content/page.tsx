import { EmbeddedContent } from "@/components/teacher/embedded-content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Example data for network graph
const networkData = {
  nodes: [
    { id: "1", label: "Topic 1", type: "topic", size: 20, color: "#ff6b6b" },
    { id: "2", label: "Topic 2", type: "topic", size: 20, color: "#4ecdc4" },
    { id: "3", label: "Topic 3", type: "topic", size: 20, color: "#45b7d1" },
    { id: "4", label: "Resource 1", type: "resource", size: 15, color: "#96ceb4" },
    { id: "5", label: "Resource 2", type: "resource", size: 15, color: "#96ceb4" },
    { id: "6", label: "Resource 3", type: "resource", size: 15, color: "#96ceb4" },
  ],
  links: [
    { source: "1", target: "4", value: 1 },
    { source: "1", target: "5", value: 1 },
    { source: "2", target: "5", value: 1 },
    { source: "2", target: "6", value: 1 },
    { source: "3", target: "4", value: 1 },
    { source: "3", target: "6", value: 1 },
  ],
}

export default function InteractiveContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Interactive Content</h2>
        <p className="text-muted-foreground">
          Explore and interact with various types of content and visualizations.
        </p>
      </div>

      <Tabs defaultValue="embeddings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="embeddings">Embedded Content</TabsTrigger>
          <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
        </TabsList>

        <TabsContent value="embeddings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <EmbeddedContent
              title="Educational Resource"
              url="https://example.com/educational-content"
              type="iframe"
              height="400px"
            />
            <EmbeddedContent
              title="Interactive Simulation"
              url="https://example.com/simulation"
              type="iframe"
              height="400px"
            />
          </div>
        </TabsContent>

        <TabsContent value="visualizations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Network Graph</CardTitle>
              </CardHeader>
              <CardContent>
                <EmbeddedContent
                  title="Topic Relationships"
                  type="graph"
                  data={networkData}
                  height="400px"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Force-Directed Graph</CardTitle>
              </CardHeader>
              <CardContent>
                <EmbeddedContent
                  title="Concept Map"
                  type="chart"
                  data={networkData}
                  height="400px"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interactive" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <EmbeddedContent
                  title="Course Timeline"
                  url="https://example.com/timeline"
                  type="iframe"
                  height="400px"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>3D Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <EmbeddedContent
                  title="3D Model Viewer"
                  url="https://example.com/3d-viewer"
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