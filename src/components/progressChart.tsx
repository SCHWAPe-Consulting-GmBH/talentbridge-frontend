'use client';
import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useTheme } from 'next-themes';
import React from 'react';
const chartData = [
  { day: "'Mon", hours: 1 },
  { day: 'Tue', hours: 5 },
  { day: 'Wed', hours: 15 },
  { day: 'Thu', hours: 10 },
  { day: 'Fri', hours: 19 },
  { day: 'Sat', hours: 22 },
  { day: 'Sun', hours: 16 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

interface Props {
  maxHeightWrap: number;
  maxHeightInner: number;
}

export const ProgressChart: React.FC<Props> = ({ maxHeightWrap, maxHeightInner }) => {
  const { resolvedTheme } = useTheme();

  return (
    <Card style={{ backgroundColor: 'var(--background-second)', border: 'none', maxHeight: `${maxHeightWrap}px` }}>
      <CardContent >
        <ChartContainer config={chartConfig} style={{ maxHeight: `${maxHeightInner}px` }}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 22,
            }}
            style={{ backgroundColor: 'var(--background-second)'}}
          >
            <CartesianGrid vertical={true} horizontal={true} stroke="var(--stroke-chart)"/>
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value} h`}
              domain={[1, "dataMax"]}
              ticks={[1, 5, 10, 15, 20, 25]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="hours"
              type="natural"
              fill="rgba(93, 232, 91, 0.4)"
              fillOpacity={0.4}
              stroke="#5DE85B"
              strokeWidth={3}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
