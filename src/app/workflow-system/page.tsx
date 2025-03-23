"use client"

import { WorkflowDialog } from "@/components/workflow-system/workflow-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet, Terminal, Globe, BarChart, Sparkles, PlusCircle, ArrowRight } from "lucide-react"

export default function WorkflowSystemPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Workflow Automation System</h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          A powerful system for automating workflows with CSV configuration, API integration, and natural language
          commands.
        </p>
        <div className="flex justify-center mt-6">
          <WorkflowDialog />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-blue-400" />
              CSV Configuration
            </CardTitle>
            <CardDescription>Define workflows using CSV files for easy import/export and sharing</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white/70 mb-4">
              Import and export workflows using CSV files, making it easy to manage and share your automation
              configurations.
            </p>
            <Button variant="outline" className="w-full justify-between">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-green-400" />
              Natural Language Commands
            </CardTitle>
            <CardDescription>Control your workflows using simple natural language commands</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white/70 mb-4">
              Execute workflows and commands using natural language, making automation accessible to everyone.
            </p>
            <Button variant="outline" className="w-full justify-between">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-400" />
              API Integration
            </CardTitle>
            <CardDescription>Connect to external systems and services via API</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white/70 mb-4">
              Integrate with external APIs and services to extend your automation capabilities and connect with other
              systems.
            </p>
            <Button variant="outline" className="w-full justify-between">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              Workflow Templates
            </CardTitle>
            <CardDescription>Get started quickly with pre-built workflow templates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white/70 mb-4">
              Choose from a variety of pre-built templates to jumpstart your automation journey without starting from
              scratch.
            </p>
            <Button variant="outline" className="w-full justify-between">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-cyan-400" />
              Visual Workflow Builder
            </CardTitle>
            <CardDescription>Create workflows visually without coding</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white/70 mb-4">
              Build complex workflows using our intuitive visual builder, making automation accessible to non-technical
              users.
            </p>
            <Button variant="outline" className="w-full justify-between">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-red-400" />
              Monitoring & Analytics
            </CardTitle>
            <CardDescription>Track and analyze your workflow performance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white/70 mb-4">
              Monitor your workflows in real-time and analyze their performance to optimize your automation processes.
            </p>
            <Button variant="outline" className="w-full justify-between">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

