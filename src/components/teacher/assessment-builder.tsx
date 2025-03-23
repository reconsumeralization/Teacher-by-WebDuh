import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Save, Eye, Clock } from "lucide-react"

interface Question {
  id: string
  type: "multiple-choice" | "true-false" | "short-answer" | "essay"
  question: string
  options?: string[]
  correctAnswer?: string
  points: number
}

interface Assessment {
  id: string
  title: string
  description: string
  duration: number
  questions: Question[]
  settings: {
    shuffleQuestions: boolean
    showResults: boolean
    allowRetake: boolean
  }
}

export function AssessmentBuilder() {
  const [assessment, setAssessment] = useState<Assessment>({
    id: "1",
    title: "New Assessment",
    description: "",
    duration: 60,
    questions: [
      {
        id: "1",
        type: "multiple-choice",
        question: "",
        options: ["", "", "", ""],
        points: 1,
      },
    ],
    settings: {
      shuffleQuestions: false,
      showResults: true,
      allowRetake: false,
    },
  })

  const addQuestion = () => {
    setAssessment({
      ...assessment,
      questions: [
        ...assessment.questions,
        {
          id: String(assessment.questions.length + 1),
          type: "multiple-choice",
          question: "",
          options: ["", "", "", ""],
          points: 1,
        },
      ],
    })
  }

  const removeQuestion = (id: string) => {
    setAssessment({
      ...assessment,
      questions: assessment.questions.filter((q) => q.id !== id),
    })
  }

  const updateQuestion = (
    id: string,
    field: keyof Question,
    value: string | string[] | number
  ) => {
    setAssessment({
      ...assessment,
      questions: assessment.questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      ),
    })
  }

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setAssessment({
      ...assessment,
      questions: assessment.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options?.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : q
      ),
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Label htmlFor="assessment-title">Assessment Title</Label>
          <Input
            id="assessment-title"
            value={assessment.title}
            onChange={(e) =>
              setAssessment({ ...assessment, title: e.target.value })
            }
            placeholder="Enter assessment title"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <Tabs defaultValue="questions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          {assessment.questions.map((question) => (
            <Card key={question.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Question {question.id}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeQuestion(question.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`type-${question.id}`}>Type</Label>
                  <select
                    id={`type-${question.id}`}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={question.type}
                    onChange={(e) =>
                      updateQuestion(question.id, "type", e.target.value)
                    }
                    aria-label="Question type"
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                    <option value="short-answer">Short Answer</option>
                    <option value="essay">Essay</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`question-${question.id}`}>Question</Label>
                  <Input
                    id={`question-${question.id}`}
                    value={question.question}
                    onChange={(e) =>
                      updateQuestion(question.id, "question", e.target.value)
                    }
                    placeholder="Enter question"
                  />
                </div>
                {(question.type === "multiple-choice" ||
                  question.type === "true-false") && (
                  <div className="space-y-2">
                    <Label>Options</Label>
                    {question.options?.map((option, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          value={option}
                          onChange={(e) =>
                            updateOption(question.id, index, e.target.value)
                          }
                          placeholder={`Option ${index + 1}`}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newOptions = question.options?.filter(
                              (_, i) => i !== index
                            )
                            updateQuestion(question.id, "options", newOptions)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newOptions = [
                          ...(question.options || []),
                          "",
                        ]
                        updateQuestion(question.id, "options", newOptions)
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Option
                    </Button>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor={`points-${question.id}`}>Points</Label>
                  <Input
                    id={`points-${question.id}`}
                    type="number"
                    value={question.points}
                    onChange={(e) =>
                      updateQuestion(
                        question.id,
                        "points",
                        parseInt(e.target.value)
                      )
                    }
                    min="0"
                    placeholder="Enter points"
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" onClick={addQuestion} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Question
          </Button>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={assessment.description}
                  onChange={(e) =>
                    setAssessment({ ...assessment, description: e.target.value })
                  }
                  placeholder="Enter assessment description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <div className="flex space-x-2">
                  <Input
                    id="duration"
                    type="number"
                    value={assessment.duration}
                    onChange={(e) =>
                      setAssessment({
                        ...assessment,
                        duration: parseInt(e.target.value),
                      })
                    }
                    min="0"
                    placeholder="Enter duration"
                  />
                  <Button variant="outline" size="icon">
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Assessment Options</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={assessment.settings.shuffleQuestions}
                      onChange={(e) =>
                        setAssessment({
                          ...assessment,
                          settings: {
                            ...assessment.settings,
                            shuffleQuestions: e.target.checked,
                          },
                        })
                      }
                    />
                    Shuffle Questions
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={assessment.settings.showResults}
                      onChange={(e) =>
                        setAssessment({
                          ...assessment,
                          settings: {
                            ...assessment.settings,
                            showResults: e.target.checked,
                          },
                        })
                      }
                    />
                    Show Results
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={assessment.settings.allowRetake}
                      onChange={(e) =>
                        setAssessment({
                          ...assessment,
                          settings: {
                            ...assessment.settings,
                            allowRetake: e.target.checked,
                          },
                        })
                      }
                    />
                    Allow Retake
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 