import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import styles from './network-graph.module.css'

interface Node {
  id: string
  label: string
  type: string
  size: number
  color: string
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

interface Link {
  source: string | Node
  target: string | Node
  value: number
  label?: string
}

interface NetworkGraphProps {
  data: {
    nodes: Node[]
    links: Link[]
  }
}

interface D3DragEvent {
  active: boolean
  subject: Node
  x: number
  y: number
}

export function NetworkGraph({ data }: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !data) return

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)

    // Create simulation
    const simulation = d3.forceSimulation<Node>(data.nodes)
      .force("link", d3.forceLink<Node, Link>(data.links).id((d) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))

    // Create links
    const link = svg.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d: Link) => Math.sqrt(d.value))

    // Create nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", (d: Node) => d.size)
      .attr("fill", (d: Node) => d.color)
      .call(drag(simulation) as unknown as (selection: d3.Selection<SVGCircleElement, Node, SVGGElement, unknown>) => void)

    // Add labels
    const label = svg.append("g")
      .selectAll("text")
      .data(data.nodes)
      .join("text")
      .text((d: Node) => d.label)
      .attr("font-size", "12px")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: Link) => (d.source as Node).x || 0)
        .attr("y1", (d: Link) => (d.source as Node).y || 0)
        .attr("x2", (d: Link) => (d.target as Node).x || 0)
        .attr("y2", (d: Link) => (d.target as Node).y || 0)

      node
        .attr("cx", (d: Node) => d.x || 0)
        .attr("cy", (d: Node) => d.y || 0)

      label
        .attr("x", (d: Node) => d.x || 0)
        .attr("y", (d: Node) => d.y || 0)
    })

    // Drag behavior
    function drag(simulation: d3.Simulation<Node, undefined>) {
      function dragstarted(event: D3DragEvent) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      }

      function dragged(event: D3DragEvent) {
        event.subject.fx = event.x
        event.subject.fy = event.y
      }

      function dragended(event: D3DragEvent) {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
      }

      return d3.drag<SVGCircleElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    }

    // Cleanup
    return () => {
      simulation.stop()
    }
  }, [data])

  return (
    <svg
      ref={svgRef}
      className={styles.graph}
    />
  )
} 