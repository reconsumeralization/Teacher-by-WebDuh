"use client"

import { useState } from "react"
import { McpServerDialog } from "@/components/mcp-server/mcp-server-dialog"
import { FlippableCard } from "@/components/api-integration/flippable-card"
import { ApiIntegrationProvider } from "@/hooks/use-api-integration"
import { McpServerProvider } from "@/hooks/use-mcp-server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function Home() {
  const [open, setOpen] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 p-4">
      <McpServerProvider>
        <ApiIntegrationProvider>
          <FlippableCard className="w-full max-w-4xl">
            <div className="p-6 space-y-6">
              <div className="flex flex-col space-y-2">
                <h1 className="text-2xl font-bold text-white">Wonder List API Integration</h1>
                <p className="text-zinc-400">Manage your tasks and API integrations with natural language processing</p>
              </div>

              <Tabs defaultValue="dashboard" className="w-full">
                <TabsList className="bg-zinc-800 border border-zinc-700">
                  <TabsTrigger
                    value="dashboard"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="tasks" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    Tasks
                  </TabsTrigger>
                  <TabsTrigger
                    value="integrations"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Integrations
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard" className="mt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="bg-zinc-800 border-zinc-700 text-white">
                      <CardHeader>
                        <CardTitle>Task Overview</CardTitle>
                        <CardDescription className="text-zinc-400">Your task completion status</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Completed Tasks</span>
                            <span>12/20</span>
                          </div>
                          <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-blue-600"
                              initial={{ width: 0 }}
                              animate={{ width: "60%" }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-zinc-800 border-zinc-700 text-white">
                      <CardHeader>
                        <CardTitle>API Status</CardTitle>
                        <CardDescription className="text-zinc-400">Current API connection status</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span>Connected</span>
                          </div>
                          <Button onClick={() => setOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                            Configure MCP Server
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="tasks" className="mt-4">
                  <Card className="bg-zinc-800 border-zinc-700 text-white">
                    <CardHeader>
                      <CardTitle>Recent Tasks</CardTitle>
                      <CardDescription className="text-zinc-400">Your most recent tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 border border-zinc-700 rounded-md"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-zinc-700 flex items-center justify-center text-xs">
                                {i}
                              </div>
                              <span>Task {i}</span>
                            </div>
                            <div className="text-sm text-zinc-400">2 days ago</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="integrations" className="mt-4">
                  <Card className="bg-zinc-800 border-zinc-700 text-white">
                    <CardHeader>
                      <CardTitle>Available Integrations</CardTitle>
                      <CardDescription className="text-zinc-400">Configure your API integrations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border border-zinc-700 rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-xs">
                              MCP
                            </div>
                            <div>
                              <div>MCP Server</div>
                              <div className="text-sm text-zinc-400">Model Context Protocol</div>
                            </div>
                          </div>
                          <Button onClick={() => setOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                            Configure
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </FlippableCard>
        </ApiIntegrationProvider>

        <McpServerDialog open={open} onOpenChange={setOpen} />
      </McpServerProvider>
    </main>
  )
}

