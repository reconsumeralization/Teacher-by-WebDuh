"use client"

import { useEffect } from "react"
import { BackgroundProvider, useBackground } from "@/contexts/background-context"
import { BackgroundCard } from "@/components/ui/background-card"
import { BackgroundSettingsPanel } from "@/components/background/background-settings-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FloatingAssistant } from "@/components/assistant/floating-assistant"

function BackgroundDemo() {
  const { setBackgroundImage } = useBackground()

  // Set the provided image as the default background
  useEffect(() => {
    setBackgroundImage(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Radial%20Beam.jpg-FHBaTeRPISFgF27QwYPc9uQrqyX7Vq.jpeg",
    )
  }, [setBackgroundImage])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BackgroundCard className="min-h-[600px]">
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold">Customizable Background Card</h1>
                  <p className="text-muted-foreground">A beautiful container for your interface components</p>
                </div>

                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="content">Content Example</TabsTrigger>
                    <TabsTrigger value="cards">Card Layout</TabsTrigger>
                    <TabsTrigger value="form">Form Elements</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                      <CardHeader>
                        <CardTitle>Welcome to Wonder List</CardTitle>
                        <CardDescription>Your customizable task management platform</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>
                          This background card component provides a beautiful foundation for your interface. You can
                          customize the background image, colors, borders, and more using the settings panel.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button>Get Started</Button>
                      </CardFooter>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                        <CardHeader>
                          <CardTitle>Customizable</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Change the background image, colors, and more</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                        <CardHeader>
                          <CardTitle>Responsive</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Works on all screen sizes and devices</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="cards" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i} className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                          <CardHeader>
                            <CardTitle>Card {i + 1}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>This is an example card with a transparent background</p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="form" className="space-y-4">
                    <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                      <CardHeader>
                        <CardTitle>Contact Form</CardTitle>
                        <CardDescription>Send us a message</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="first-name" className="text-sm font-medium">
                              First Name
                            </label>
                            <input id="first-name" className="w-full p-2 border rounded-md" placeholder="John" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="last-name" className="text-sm font-medium">
                              Last Name
                            </label>
                            <input id="last-name" className="w-full p-2 border rounded-md" placeholder="Doe" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="w-full p-2 border rounded-md"
                            placeholder="john.doe@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">
                            Message
                          </label>
                          <textarea
                            id="message"
                            className="w-full p-2 border rounded-md min-h-[100px]"
                            placeholder="Your message here..."
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Submit</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </BackgroundCard>
          </div>

          <div className="lg:col-span-1">
            <BackgroundSettingsPanel />
          </div>
        </div>
      </div>

      <FloatingAssistant />
    </div>
  )
}

export default function BackgroundDemoPage() {
  return (
    <BackgroundProvider>
      <BackgroundDemo />
    </BackgroundProvider>
  )
}

