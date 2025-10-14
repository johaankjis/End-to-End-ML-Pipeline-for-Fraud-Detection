import { MetricCard } from "@/components/metric-card"
import { Card } from "@/components/ui/card"
import { Activity, Target, TrendingDown, TrendingUp } from "lucide-react"
import { mockModelMetrics, kpiData } from "@/lib/mock-data"
import { PerformanceChart } from "@/components/performance-chart"
import { ModelVersionTable } from "@/components/model-version-table"

export default function PerformancePage() {
  const latestMetrics = mockModelMetrics[mockModelMetrics.length - 1]
  const previousMetrics = mockModelMetrics[mockModelMetrics.length - 2]

  const aucChange = ((latestMetrics.auc_score - previousMetrics.auc_score) * 100).toFixed(2)
  const precisionChange = ((latestMetrics.precision - previousMetrics.precision) * 100).toFixed(2)
  const recallChange = ((latestMetrics.recall - previousMetrics.recall) * 100).toFixed(2)
  const fprChange = ((latestMetrics.false_positive_rate - previousMetrics.false_positive_rate) * 100).toFixed(2)

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-3xl font-bold text-foreground">Model Performance</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track model metrics and performance over time with MLflow integration
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-border bg-card px-4 py-2">
            <span className="text-xs text-muted-foreground">Current Model</span>
            <p className="font-mono text-sm font-semibold text-foreground">{kpiData.modelVersion}</p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="AUC Score"
          value={latestMetrics.auc_score.toFixed(4)}
          change={`${aucChange > 0 ? "+" : ""}${aucChange}%`}
          changeType={Number(aucChange) > 0 ? "positive" : "negative"}
          icon={Target}
          subtitle="Area Under Curve"
        />
        <MetricCard
          title="Precision"
          value={latestMetrics.precision.toFixed(4)}
          change={`${precisionChange > 0 ? "+" : ""}${precisionChange}%`}
          changeType={Number(precisionChange) > 0 ? "positive" : "negative"}
          icon={Activity}
          subtitle="True Positive Rate"
        />
        <MetricCard
          title="Recall"
          value={latestMetrics.recall.toFixed(4)}
          change={`${recallChange > 0 ? "+" : ""}${recallChange}%`}
          changeType={Number(recallChange) > 0 ? "positive" : "negative"}
          icon={TrendingUp}
          subtitle="Sensitivity"
        />
        <MetricCard
          title="False Positive Rate"
          value={`${(latestMetrics.false_positive_rate * 100).toFixed(2)}%`}
          change={`${fprChange > 0 ? "+" : ""}${fprChange}%`}
          changeType={Number(fprChange) < 0 ? "positive" : "negative"}
          icon={TrendingDown}
          subtitle="Target: <5%"
        />
      </div>

      {/* Performance Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <PerformanceChart
          title="AUC Score Over Time"
          description="Model accuracy trend across versions"
          data={mockModelMetrics}
          dataKey="auc_score"
          color="hsl(var(--chart-1))"
          targetLine={0.92}
        />
        <PerformanceChart
          title="Precision & Recall"
          description="Balance between precision and recall metrics"
          data={mockModelMetrics}
          dataKey="precision"
          secondaryDataKey="recall"
          color="hsl(var(--chart-2))"
          secondaryColor="hsl(var(--chart-3))"
        />
      </div>

      {/* Model Comparison */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-sans text-lg font-semibold text-foreground">Model Version History</h3>
            <p className="text-sm text-muted-foreground">Compare performance across different model versions</p>
          </div>
        </div>
        <ModelVersionTable data={mockModelMetrics.slice(-10).reverse()} />
      </Card>

      {/* Training Info */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="font-sans text-lg font-semibold text-foreground">Training Pipeline</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Orchestration</span>
              <span className="font-mono text-sm font-medium text-foreground">Apache Airflow</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tracking</span>
              <span className="font-mono text-sm font-medium text-foreground">MLflow</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Framework</span>
              <span className="font-mono text-sm font-medium text-foreground">PySpark + XGBoost</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Retraining Frequency</span>
              <span className="text-sm font-medium text-foreground">Weekly</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-sans text-lg font-semibold text-foreground">Performance Targets</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">AUC Score</span>
              <span className="font-mono text-sm font-medium text-chart-4">≥ 0.92 ✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">False Positive Rate</span>
              <span className="font-mono text-sm font-medium text-chart-4">{"< 5% ✓"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Precision</span>
              <span className="font-mono text-sm font-medium text-chart-4">≥ 0.85 ✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Recall</span>
              <span className="font-mono text-sm font-medium text-chart-4">≥ 0.80 ✓</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-sans text-lg font-semibold text-foreground">Improvements</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Retraining Time</span>
              <span className="text-sm font-medium text-chart-4">-50%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Deployment Errors</span>
              <span className="text-sm font-medium text-chart-4">-30%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">False Positives</span>
              <span className="text-sm font-medium text-chart-4">-15%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Delivery Speed</span>
              <span className="text-sm font-medium text-chart-4">+2 weeks</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
