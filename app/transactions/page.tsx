"use client"

import { Card } from "@/components/ui/card"
import { mockTransactions } from "@/lib/mock-data"
import { TransactionTable } from "@/components/transaction-table"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { MetricCard } from "@/components/metric-card"
import { AlertTriangle, CheckCircle2, DollarSign, TrendingUp } from "lucide-react"

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "fraud" | "legitimate">("all")

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.transaction_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.user_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.merchant_id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "fraud" && transaction.fraud_label) ||
      (filterStatus === "legitimate" && !transaction.fraud_label)

    return matchesSearch && matchesFilter
  })

  const fraudCount = mockTransactions.filter((t) => t.fraud_label).length
  const legitimateCount = mockTransactions.length - fraudCount
  const totalAmount = mockTransactions.reduce((sum, t) => sum + t.amount, 0)
  const avgFraudScore = mockTransactions.reduce((sum, t) => sum + (t.fraud_score || 0), 0) / mockTransactions.length

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-3xl font-bold text-foreground">Transaction Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor and analyze transactions with real-time fraud detection scores
          </p>
        </div>
      </div>

      {/* Transaction Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Transactions"
          value={mockTransactions.length}
          icon={TrendingUp}
          subtitle="In current dataset"
        />
        <MetricCard
          title="Flagged as Fraud"
          value={fraudCount}
          change={`${((fraudCount / mockTransactions.length) * 100).toFixed(1)}%`}
          changeType="neutral"
          icon={AlertTriangle}
          subtitle="Fraud detection rate"
        />
        <MetricCard
          title="Legitimate"
          value={legitimateCount}
          change={`${((legitimateCount / mockTransactions.length) * 100).toFixed(1)}%`}
          changeType="positive"
          icon={CheckCircle2}
          subtitle="Verified transactions"
        />
        <MetricCard
          title="Total Volume"
          value={`$${(totalAmount / 1000).toFixed(1)}K`}
          icon={DollarSign}
          subtitle={`Avg: $${(totalAmount / mockTransactions.length).toFixed(2)}`}
        />
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by transaction ID, user ID, or merchant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filter:</span>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="fraud">Fraud Only</SelectItem>
                <SelectItem value="legitimate">Legitimate Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Transaction Table */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-sans text-lg font-semibold text-foreground">Transaction History</h3>
            <p className="text-sm text-muted-foreground">
              Showing {filteredTransactions.length} of {mockTransactions.length} transactions
            </p>
          </div>
        </div>
        <TransactionTable data={filteredTransactions} />
      </Card>

      {/* Transaction Insights */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-sans text-lg font-semibold text-foreground">Fraud Detection Insights</h3>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Fraud Score</span>
                <span className="font-mono text-lg font-semibold text-foreground">{avgFraudScore.toFixed(3)}</span>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">High Risk Transactions</span>
                <span className="font-mono text-lg font-semibold text-destructive">
                  {mockTransactions.filter((t) => (t.fraud_score || 0) > 0.8).length}
                </span>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Medium Risk Transactions</span>
                <span className="font-mono text-lg font-semibold text-chart-2">
                  {mockTransactions.filter((t) => (t.fraud_score || 0) > 0.5 && (t.fraud_score || 0) <= 0.8).length}
                </span>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Low Risk Transactions</span>
                <span className="font-mono text-lg font-semibold text-chart-4">
                  {mockTransactions.filter((t) => (t.fraud_score || 0) <= 0.5).length}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-sans text-lg font-semibold text-foreground">Top Locations</h3>
          <div className="mt-4 space-y-3">
            {Array.from(new Set(mockTransactions.map((t) => t.location)))
              .map((location) => ({
                location,
                count: mockTransactions.filter((t) => t.location === location).length,
                fraudCount: mockTransactions.filter((t) => t.location === location && t.fraud_label).length,
              }))
              .sort((a, b) => b.count - a.count)
              .slice(0, 6)
              .map((item) => (
                <div
                  key={item.location}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.location}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.fraudCount} fraud / {item.count} total
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-semibold text-foreground">{item.count}</p>
                    <p className="text-xs text-muted-foreground">
                      {((item.fraudCount / item.count) * 100).toFixed(1)}% fraud
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
