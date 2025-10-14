import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Transaction } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle2 } from "lucide-react"

interface TransactionTableProps {
  data: Transaction[]
}

export function TransactionTable({ data }: TransactionTableProps) {
  const getRiskLevel = (score: number) => {
    if (score > 0.8) return { label: "High", variant: "destructive" as const }
    if (score > 0.5) return { label: "Medium", variant: "default" as const }
    return { label: "Low", variant: "outline" as const }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Merchant</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Fraud Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground">
                No transactions found
              </TableCell>
            </TableRow>
          ) : (
            data.map((transaction) => {
              const riskLevel = getRiskLevel(transaction.fraud_score || 0)
              return (
                <TableRow key={transaction.transaction_id}>
                  <TableCell className="font-mono text-sm font-medium">{transaction.transaction_id}</TableCell>
                  <TableCell className="font-mono text-sm">{transaction.user_id}</TableCell>
                  <TableCell className="font-mono text-sm">${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{transaction.merchant_id}</TableCell>
                  <TableCell className="text-sm">{transaction.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{(transaction.fraud_score || 0).toFixed(3)}</span>
                      <Badge variant={riskLevel.variant} className="text-xs">
                        {riskLevel.label}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {transaction.fraud_label ? (
                      <Badge variant="destructive" className="flex w-fit items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Fraud
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="flex w-fit items-center gap-1 border-chart-4 text-chart-4">
                        <CheckCircle2 className="h-3 w-3" />
                        Legitimate
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {transaction.timestamp.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
