import { AlertTriangle, CheckCircle2, RefreshCw, TrendingUp } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "success",
    message: "Model recalibration completed successfully",
    time: "2 minutes ago",
    icon: CheckCircle2,
    color: "text-chart-4",
  },
  {
    id: 2,
    type: "warning",
    message: "Drift detected in transaction_frequency feature",
    time: "15 minutes ago",
    icon: AlertTriangle,
    color: "text-chart-2",
  },
  {
    id: 3,
    type: "info",
    message: "Automated retraining pipeline initiated",
    time: "1 hour ago",
    icon: RefreshCw,
    color: "text-chart-1",
  },
  {
    id: 4,
    type: "success",
    message: "AUC score improved to 0.9347",
    time: "3 hours ago",
    icon: TrendingUp,
    color: "text-chart-4",
  },
]

export function RecentActivity() {
  return (
    <div className="p-6">
      <h3 className="font-sans text-lg font-semibold text-foreground">Recent Activity</h3>
      <div className="mt-4 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={`rounded-lg bg-card p-2 ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{activity.message}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
