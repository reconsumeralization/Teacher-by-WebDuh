"use client"
import { ContextAwareCard, ContextAwareContent } from "@/components/context-aware-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MultiStateDemo() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Multi-State Interface Demo</h1>

      <p className="text-muted-foreground">
        This demo showcases the multi-state interface that allows for dynamic content switching based on context and
        user interactions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContextAwareCard className="col-span-1 md:col-span-2">
          <ContextAwareContent>
            <Card>
              <CardHeader>
                <CardTitle>Main Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This is the main content area that adapts based on the current state.</p>
                <p className="mt-2">
                  Try clicking the button in the top-right corner to flip to the API integration view.
                </p>
                <p className="mt-2">The interface will smoothly transition between different states.</p>
              </CardContent>
            </Card>
          </ContextAwareContent>
        </ContextAwareCard>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The multi-state interface uses Framer Motion for smooth animations between states.</p>
            <p className="mt-2">Each state can have its own transition direction and content.</p>
            <p className="mt-2">The system automatically determines which state to show based on context.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>Multiple states with custom transitions</li>
              <li>Context-aware content loading</li>
              <li>URL-based state navigation</li>
              <li>Event-based state changes</li>
              <li>Consistent height during transitions</li>
              <li>Multiple navigation styles</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

