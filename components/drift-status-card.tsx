import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface DriftStatusCardProps {
  title: string
  value: number
  icon: LucideIcon
  description: string
  status: "success" | "warning" | "info"
}

export function DriftStatusCard({ title, value, icon: Icon, description, status }: DriftStatusCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="font-mono text-3xl font-semibold text-foreground">{value}</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        <div
          className={cn(
            "rounded-lg p-3",
            status === "success" && "bg-chart-4/10",
            status === "warning" && "bg-chart-2/10",
            status === "info" && "bg-chart-1/10",
          )}
        >
          <Icon
            className={cn(
              "h-5 w-5",
              status === "success" && "text-chart-4",
              status === "warning" && "text-chart-2",
              status === "info" && "text-chart-1",
            )}
          />
        </div>
      </div>
    </Card>
  )
}
