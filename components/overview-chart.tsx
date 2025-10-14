"use client"

import { Card } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface OverviewChartProps {
  title: string
  description: string
  data: Array<{ timestamp: Date; value: number }>
  dataKey: string
  color: string
  valueFormatter?: (value: number) => string
}

export function OverviewChart({
  title,
  description,
  data,
  dataKey,
  color,
  valueFormatter = (value) => value.toLocaleString(),
}: OverviewChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    time: item.timestamp.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
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
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={valueFormatter}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--foreground))",
            }}
            formatter={(value: number) => [valueFormatter(value), title]}
          />
          <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#gradient-${dataKey})`} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
