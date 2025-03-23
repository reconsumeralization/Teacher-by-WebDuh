import { MinecraftServersProvider } from "@/hooks/use-minecraft-servers"
import { ServerDashboard } from "@/components/minecraft/server-dashboard"

export default function MinecraftServersPage() {
  return (
    <MinecraftServersProvider>
      <ServerDashboard />
    </MinecraftServersProvider>
  )
}

