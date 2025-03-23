import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Link, Maximize2, Minimize2 } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import visualization libraries
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false })
const NetworkGraph = dynamic(() => import('@/components/teacher/network-graph'), { ssr: false })

interface EmbeddedContentProps {
  title: string
  url?: string
  type: 'iframe' | 'graph' | 'chart'
  data?: any
  height?: string
}

export function EmbeddedContent({ title, url, type, data, height = "600px" }: EmbeddedContentProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [customUrl, setCustomUrl] = useState(url || "")

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customUrl) {
      // Handle URL validation and loading here
      console.log("Loading URL:", customUrl)
    }
  }

  const renderContent = () => {
    switch (type) {
      case 'iframe':
        return (
          <div className="relative w-full" style={{ height }}>
            <iframe
              src={customUrl}
              className="w-full h-full rounded-md border"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute top-2 right-2 space-x-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        )
      case 'graph':
        return (
          <div className="w-full" style={{ height }}>
            <NetworkGraph data={data} />
          </div>
        )
      case 'chart':
        return (
          <div className="w-full" style={{ height }}>
            <ForceGraph2D
              graphData={data}
              nodeLabel="id"
              nodeRelSize={6}
              linkDirectionalParticles={2}
              linkDirectionalParticleSpeed={0.004}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className={isFullscreen ? "fixed inset-0 z-50 m-0 h-screen w-screen" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center space-x-2">
          {type === 'iframe' && (
            <form onSubmit={handleUrlSubmit} className="flex items-center space-x-2">
              <Input
                type="url"
                placeholder="Enter URL"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-[300px]"
              />
              <Button type="submit" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  )
} 