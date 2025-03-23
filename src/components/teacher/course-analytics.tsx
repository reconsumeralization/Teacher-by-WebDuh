import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmbeddedContent } from "@/components/teacher/embedded-content"
import { Users, Clock, Target, TrendingUp } from "lucide-react"

interface AnalyticsCard {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
}

const analyticsCards: AnalyticsCard[] = [
  {
    title: "Total Students",
    value: "156",
    description: "Active students in the course",
    icon: <Users className="h-4 w-4" />,
    trend: {
      value: 12,
      isPositive: true,
    },
  },
  {
    title: "Average Time Spent",
    value: "2.5h",
    description: "Per week per student",
    icon: <Clock className="h-4 w-4" />,
    trend: {
      value: 0.5,
      isPositive: true,
    },
  },
  {
    title: "Completion Rate",
    value: "78%",
    description: "Of course objectives",
    icon: <Target className="h-4 w-4" />,
    trend: {
      value: 5,
      isPositive: true,
    },
  },
  {
    title: "Engagement Score",
    value: "8.2",
    description: "Out of 10",
    icon: <TrendingUp className="h-4 w-4" />,
    trend: {
      value: 0.3,
      isPositive: true,
    },
  },
]

export function CourseAnalytics() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
              {card.trend && (
                <div
                  className={`mt-2 text-xs ${
                    card.trend.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {card.trend.isPositive ? "+" : "-"}
                  {card.trend.value}% from last week
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <EmbeddedContent
                title="Progress Overview"
                url="https://example.com/progress-overview"
                type="iframe"
                height="400px"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <EmbeddedContent
                title="Engagement Analytics"
                url="https://example.com/engagement-analytics"
                type="iframe"
                height="400px"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <EmbeddedContent
                title="Performance Analytics"
                url="https://example.com/performance-analytics"
                type="iframe"
                height="400px"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <EmbeddedContent
                title="Predictive Analytics"
                url="https://example.com/predictive-analytics"
                type="iframe"
                height="400px"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 