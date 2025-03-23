"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const OverlappingSidebars = dynamic(
  () => import("@/components/overlapping-sidebars"),
  { ssr: false }
)

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <main className="flex min-h-screen bg-black">
        <div className="flex-1 p-6 transition-all duration-300 bg-black text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-neon-green">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div 
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-lg
                           hover:border-neon-green/30 transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 bg-neon-green rounded-full" />
                    <h2 className="text-xl font-semibold text-neon-green">
                      Content Panel {i + 1}
                    </h2>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    This is the main content area. The sidebars can be expanded without obstructing 
                    this content. Each panel provides different functionality and information.
                  </p>
                  <div className="h-32 bg-zinc-800 rounded-md flex items-center justify-center
                                group-hover:bg-zinc-800/50 transition-colors duration-200">
                    <span className="text-zinc-500">Content Area</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen bg-black">
      <OverlappingSidebars />
      <div className="flex-1 p-6 transition-all duration-300 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-neon-green">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div 
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-lg
                         hover:border-neon-green/30 transition-colors duration-200 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-neon-green rounded-full" />
                  <h2 className="text-xl font-semibold text-neon-green">
                    Content Panel {i + 1}
                  </h2>
                </div>
                <p className="text-zinc-400 mb-4">
                  This is the main content area. The sidebars can be expanded without obstructing 
                  this content. Each panel provides different functionality and information.
                </p>
                <div className="h-32 bg-zinc-800 rounded-md flex items-center justify-center
                              group-hover:bg-zinc-800/50 transition-colors duration-200">
                  <span className="text-zinc-500">Content Area</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}