import { AssistantProvider } from "@/contexts/assistant-context"
import { FloatingAssistant } from "@/components/assistant/floating-assistant"
import { AssistantDemo } from "@/components/assistant/assistant-demo"

export default function AssistantDemoPage() {
  return (
    <AssistantProvider>
      <AssistantDemo />
      <FloatingAssistant />
    </AssistantProvider>
  )
}

