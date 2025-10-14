import { Card } from "@/components/ui/card"
import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react"
import { mockDriftData } from "@/lib/mock-data"
import { DriftTable } from "@/components/drift-table"
import { DriftStatusCard } from "@/components/drift-status-card"

export default function DriftPage() {
  const driftDetectedCount = mockDriftData.filter((d) => d.drift_detected).length
  const totalFeatures = mockDriftData.length
  const healthScore = ((totalFeatures - driftDetectedCount) / totalFeatures) * 100

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-3xl font-bold text-foreground">Drift Monitoring</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Continuous monitoring of data and concept drift with automatic recalibration
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-border bg-card px-4 py-2">
            <span className="text-xs text-muted-foreground">Health Score</span>
            <p className="font-mono text-sm font-semibold text-chart-4">{healthScore.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <DriftStatusCard
          title="Features Monitored"
          value={totalFeatures}
          icon={TrendingUp}
          description="Active feature tracking"
          status="info"
        />
        <DriftStatusCard
          title="Drift Detected"
          value={driftDetectedCount}
          icon={AlertTriangle}
          description="Requires attention"
          status="warning"
        />
        <DriftStatusCard
          title="Stable Features"
          value={totalFeatures - driftDetectedCount}
          icon={CheckCircle2}
          description="Within normal range"
          status="success"
        />
      </div>

      {/* Drift Detection Details */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="font-sans text-lg font-semibold text-foreground">Feature Drift Analysis</h3>
          <p className="text-sm text-muted-foreground">Statistical tests and p-values for each monitored feature</p>
        </div>
        <DriftTable data={mockDriftData} />
      </Card>

      {/* Drift Monitoring Info */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-sans text-lg font-semibold text-foreground">Detection Methods</h3>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h4 className="font-mono text-sm font-semibold text-foreground">Kolmogorov-Smirnov Test</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Compares distributions of continuous features between training and production data
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h4 className="font-mono text-sm font-semibold text-foreground">Chi-Square Test</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Detects drift in categorical features by comparing frequency distributions
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h4 className="font-mono text-sm font-semibold text-foreground">Population Stability Index</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Measures changes in population distribution across feature bins
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h4 className="font-mono text-sm font-semibold text-foreground">Wasserstein Distance</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Quantifies the distance between two probability distributions
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-sans text-lg font-semibold text-foreground">Recalibration Pipeline</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-semibold text-primary">
                1
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">Drift Detection</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Statistical tests run hourly on production data streams
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-semibold text-primary">
                2
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">Alert Trigger</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Automated alerts sent when p-value {"<"} 0.05 threshold
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-semibold text-primary">
                3
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">Data Collection</h4>
                <p className="mt-1 text-xs text-muted-foreground">Recent production data aggregated for retraining</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-semibold text-primary">
                4
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">Model Recalibration</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Airflow triggers retraining pipeline with updated data
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-semibold text-primary">
                5
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">Validation & Deployment</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  New model validated and deployed via MLflow registry
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Impact */}
      <Card className="p-6">
        <h3 className="font-sans text-lg font-semibold text-foreground">Drift Impact on Performance</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground">False Positives Reduction</p>
            <p className="mt-2 font-mono text-2xl font-semibold text-chart-4">-15%</p>
            <p className="mt-1 text-xs text-muted-foreground">After implementing drift monitoring</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground">AUC Score Maintenance</p>
            <p className="mt-2 font-mono text-2xl font-semibold text-chart-4">{">"}0.92</p>
            <p className="mt-1 text-xs text-muted-foreground">Sustained over 6 months</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground">Recalibration Time</p>
            <p className="mt-2 font-mono text-2xl font-semibold text-chart-4">{"<"}4hrs</p>
            <p className="mt-1 text-xs text-muted-foreground">Automated end-to-end</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
