import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';

type ChartDataPoint = {
  name: string;
  amount: number;
  displayAmount?: number;
  actualAmount?: number;
  [key: string]: any;
};

type BarChartComponentProps = {
  data: ChartDataPoint[];
  height?: number;
  dataKey?: string;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number) => string;
  barColor?: string;
  className?: string;
};

export const BarChartComponent = ({
  data,
  height = 300,
  dataKey = 'displayAmount',
  yAxisFormatter = (value) => (value === 2 ? '' : `N$${value / 1000}k`),
  tooltipFormatter,
  barColor = 'var(--primary-500)',
  className = '',
}: BarChartComponentProps) => {
  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          barCategoryGap="20%"
        >
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
              fill: 'var(--black-300)',
              fontSize: 11,
              fontFamily: 'var(--font-sans)',
            }}
            padding={{ left: 0, right: 20 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: 'var(--black-400)',
              fontSize: 11,
              fontFamily: 'var(--font-sans)',
            }}
            tickFormatter={yAxisFormatter}
            width={60}
          />
          <Tooltip
            content={<CustomTooltip valueFormatter={tooltipFormatter} />}
            cursor={{ fill: 'transparent' }}
          />
          <Bar
            dataKey={dataKey}
            fill={barColor}
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};