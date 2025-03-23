import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface Node {
  id: string
  label: string
  type: string
  size: number
  color: string
}

interface Link {
  source: string
  target: string
  value: number
  label?: string
}

interface NetworkGraphProps {
  data: {
    nodes: Node[]
    links: Link[]
  }
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
    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))

    // Create links
    const link = svg.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d: any) => Math.sqrt(d.value))

    // Create nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", (d: any) => d.size)
      .attr("fill", (d: any) => d.color)
      .call(drag(simulation) as any)

    // Add labels
    const label = svg.append("g")
      .selectAll("text")
      .data(data.nodes)
      .join("text")
      .text((d: any) => d.label)
      .attr("font-size", "12px")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y)

      label
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y)
    })

    // Drag behavior
    function drag(simulation: d3.Simulation<any, undefined>) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      }

      function dragged(event: any) {
        event.subject.fx = event.x
        event.subject.fy = event.y
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
      }

      return d3.drag()
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
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  )
} 