"use client"

import { Card } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts"
import type { ModelMetrics } from "@/lib/mock-data"

interface PerformanceChartProps {
  title: string
  description: string
  data: ModelMetrics[]
  dataKey: keyof ModelMetrics
  secondaryDataKey?: keyof ModelMetrics
  color: string
  secondaryColor?: string
  targetLine?: number
}

export function PerformanceChart({
  title,
  description,
  data,
  dataKey,
  secondaryDataKey,
  color,
  secondaryColor,
  targetLine,
}: PerformanceChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    version: item.version,
  }))

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="font-sans text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`gradient-${String(dataKey)}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
            {secondaryDataKey && secondaryColor && (
              <linearGradient id={`gradient-${String(secondaryDataKey)}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={secondaryColor} stopOpacity={0} />
              </linearGradient>
            )}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="version"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={["dataMin - 0.05", "dataMax + 0.05"]}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--foreground))",
            }}
            formatter={(value: number) => value.toFixed(4)}
          />
          {targetLine && (
            <ReferenceLine
              y={targetLine}
              stroke="hsl(var(--chart-4))"
              strokeDasharray="3 3"
              label={{ value: "Target", fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
          )}
          <Area
            type="monotone"
            dataKey={String(dataKey)}
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${String(dataKey)})`}
          />
          {secondaryDataKey && secondaryColor && (
            <Area
              type="monotone"
              dataKey={String(secondaryDataKey)}
              stroke={secondaryColor}
              strokeWidth={2}
              fill={`url(#gradient-${String(secondaryDataKey)})`}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
