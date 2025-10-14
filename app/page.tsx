import { MetricCard } from "@/components/metric-card"
import { Card } from "@/components/ui/card"
import { Activity, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react"
import { kpiData, transactionVolumeData, fraudRateData } from "@/lib/mock-data"
import { OverviewChart } from "@/components/overview-chart"
import { RecentActivity } from "@/components/recent-activity"

export default function DashboardPage() {
  const fraudRate = ((kpiData.fraudDetected / kpiData.totalTransactions) * 100).toFixed(2)
  const falsePositiveRate = ((kpiData.falsePositives / kpiData.fraudDetected) * 100).toFixed(2)

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-3xl font-bold text-foreground">Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">Real-time fraud detection pipeline monitoring</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-chart-4" />
          <span className="text-sm font-medium text-foreground">Live</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Transactions"
          value={kpiData.totalTransactions.toLocaleString()}
          change="+12.3%"
          changeType="positive"
          icon={Activity}
          subtitle="Last 30 days"
        />
        <MetricCard
          title="Fraud Detected"
          value={kpiData.fraudDetected.toLocaleString()}
          change={`${fraudRate}%`}
          changeType="neutral"
          icon={AlertTriangle}
          subtitle="Detection rate"
        />
        <MetricCard
          title="Model AUC Score"
          value={kpiData.currentAUC.toFixed(4)}
          change="+0.0023"
          changeType="positive"
          icon={TrendingUp}
          subtitle="Target: ≥0.92"
        />
        <MetricCard
          title="False Positives"
          value={kpiData.falsePositives}
          change={`${falsePositiveRate}%`}
          changeType="positive"
          icon={CheckCircle2}
          subtitle="15% reduction"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <OverviewChart
          title="Transaction Volume"
          description="Transactions processed over time"
          data={transactionVolumeData}
          dataKey="value"
          color="hsl(var(--chart-1))"
        />
        <OverviewChart
          title="Fraud Detection Rate"
          description="Percentage of transactions flagged as fraud"
          data={fraudRateData}
          dataKey="value"
          color="hsl(var(--chart-2))"
          valueFormatter={(value) => `${value.toFixed(2)}%`}
        />
      </div>

      {/* Model Status & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="font-sans text-lg font-semibold text-foreground">Model Status</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Version</span>
              <span className="font-mono text-sm font-medium text-foreground">{kpiData.modelVersion}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Retrained</span>
              <span className="text-sm font-medium text-foreground">
                {Math.floor((Date.now() - kpiData.lastRetrained.getTime()) / (1000 * 60 * 60 * 24))} days ago
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg Processing Time</span>
              <span className="font-mono text-sm font-medium text-foreground">{kpiData.avgProcessingTime}ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">System Uptime</span>
              <span className="font-mono text-sm font-medium text-chart-4">{kpiData.uptime}%</span>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <RecentActivity />
        </Card>
      </div>
    </div>
  )
}
