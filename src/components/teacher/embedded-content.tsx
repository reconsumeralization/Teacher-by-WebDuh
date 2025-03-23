import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe, Maximize2, Minimize2 } from "lucide-react"
import dynamic from "next/dynamic"
import styles from './embedded-content.module.css'

// Dynamically import visualization libraries
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false })
const NetworkGraph = dynamic(() => import('@/components/teacher/network-graph'), { ssr: false })

interface GraphData {
  nodes: Array<{
    id: string
    [key: string]: unknown
  }>
  links: Array<{
    source: string
    target: string
    [key: string]: unknown
  }>
}

interface EmbeddedContentProps {
  title: string
  url?: string
  type: 'iframe' | 'graph' | 'chart'
  data?: GraphData
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
          <div className={styles.contentContainer} style={{ height }}>
            <iframe
              src={customUrl}
              className={styles.iframe}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`Embedded content: ${title}`}
            />
            <div className={styles.controls}>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsFullscreen(!isFullscreen)}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
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
          <div className={styles.contentContainer} style={{ height }}>
            <NetworkGraph data={data} />
          </div>
        )
      case 'chart':
        return (
          <div className={styles.contentContainer} style={{ height }}>
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
    <Card className={isFullscreen ? styles.fullscreen : ""}>
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
                aria-label="URL input"
              />
              <Button type="submit" size="icon" aria-label="Load URL">
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