import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';

type ChartDataPoint = {
  name: string;
  amount: number;
  [key: string]: any;
};

type LineChartComponentProps = {
  data: ChartDataPoint[];
  height?: number;
  dataKey?: string;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number) => string;
  lineColor?: string;
  lineStrokeWidth?: number;
  className?: string;
};

export const LineChartComponent = ({
  data,
  height = 300,
  dataKey = 'amount',
  yAxisFormatter = (value) => `N$${value / 1000}k`,
  tooltipFormatter,
  lineColor = 'var(--primary-500)',
  lineStrokeWidth = 1,
  className = '',
}: LineChartComponentProps) => {
  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="0"
            vertical={false}
            stroke="transparent"
          />
          <XAxis
            dataKey="name"
            axisLine={{ stroke: 'var(--custom-gray-100)' }}
            tickLine={false}
            tick={{
              fill: 'hsl(var(--custom-neutral-90) / 0.4)',
              fontSize: 11,
            }}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--black-90) / 0.7)', fontSize: 11 }}
            tickFormatter={yAxisFormatter}
            width={60}
          />
          <Tooltip
            content={<CustomTooltip valueFormatter={tooltipFormatter} />}
            cursor={{ stroke: 'transparent' }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={lineColor}
            strokeWidth={lineStrokeWidth}
            dot={{ fill: lineColor, r: 2 }}
            activeDot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};