import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ModelMetrics } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

interface ModelVersionTableProps {
  data: ModelMetrics[]
}

export function ModelVersionTable({ data }: ModelVersionTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Version</TableHead>
            <TableHead>AUC Score</TableHead>
            <TableHead>Precision</TableHead>
            <TableHead>Recall</TableHead>
            <TableHead>FP Rate</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((metric, index) => (
            <TableRow key={metric.model_id}>
              <TableCell className="font-mono font-medium">{metric.version}</TableCell>
              <TableCell className="font-mono">
                <span className={metric.auc_score >= 0.92 ? "text-chart-4" : "text-muted-foreground"}>
                  {metric.auc_score.toFixed(4)}
                </span>
              </TableCell>
              <TableCell className="font-mono">{metric.precision.toFixed(4)}</TableCell>
              <TableCell className="font-mono">{metric.recall.toFixed(4)}</TableCell>
              <TableCell className="font-mono">
                <span className={metric.false_positive_rate < 0.05 ? "text-chart-4" : "text-destructive"}>
                  {(metric.false_positive_rate * 100).toFixed(2)}%
                </span>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {metric.timestamp.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </TableCell>
              <TableCell>
                {index === 0 ? (
                  <Badge className="bg-primary text-primary-foreground">Active</Badge>
                ) : (
                  <Badge variant="outline">Archived</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
