import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { DriftMonitoring } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle2 } from "lucide-react"

interface DriftTableProps {
  data: DriftMonitoring[]
}

export function DriftTable({ data }: DriftTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Feature Name</TableHead>
            <TableHead>Statistical Test</TableHead>
            <TableHead>P-Value</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action Taken</TableHead>
            <TableHead>Last Checked</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((drift) => (
            <TableRow key={drift.feature_name}>
              <TableCell className="font-mono font-medium">{drift.feature_name}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{drift.statistical_test}</TableCell>
              <TableCell className="font-mono">
                <span className={drift.p_value < 0.05 ? "text-destructive" : "text-chart-4"}>
                  {drift.p_value.toFixed(3)}
                </span>
              </TableCell>
              <TableCell>
                {drift.drift_detected ? (
                  <Badge variant="destructive" className="flex w-fit items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Drift Detected
                  </Badge>
                ) : (
                  <Badge variant="outline" className="flex w-fit items-center gap-1 border-chart-4 text-chart-4">
                    <CheckCircle2 className="h-3 w-3" />
                    Stable
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-sm">{drift.action_taken}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {Math.floor((Date.now() - drift.timestamp.getTime()) / (1000 * 60 * 60))}h ago
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
