import { useMemo } from 'react';
import { BarChartComponent } from './BarChartComponent';
import { LineChartComponent } from './LineChartComponent';

type ChartDataPoint = {
  name: string;
  amount: number;
  displayAmount?: number;
  actualAmount?: number;
  [key: string]: any;
};

type ChartProps = {
  data: ChartDataPoint[];
  type: 'line' | 'bar';
  height?: number;
  dataKey?: string;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number) => string;
  barColor?: string;
  lineColor?: string;
  lineStrokeWidth?: number;
  className?: string;
};

export const Chart = ({
  data,
  type,
  height = 300,
  dataKey = 'amount',
  yAxisFormatter = (value) => (value === 2 ? '' : `N$${value / 1000}k`),
  tooltipFormatter,
  barColor = 'var(--primary-500)',
  lineColor = 'var(--primary-500)',
  lineStrokeWidth = 1,
  className = '',
}: ChartProps) => {
  // For bar charts, format data to show minimum bar height for zero values
  const formattedData = useMemo(() => {
    if (type === 'bar') {
      return data.map((item) => ({
        ...item,
        displayAmount: item.amount === 0 ? 2 : item.amount,
        actualAmount: item.amount,
      }));
    }
    return data;
  }, [data, type]);

  const chartDataKey = type === 'bar' ? 'displayAmount' : dataKey;

  if (type === 'bar') {
    return (
      <BarChartComponent
        data={formattedData}
        height={height}
        dataKey={chartDataKey}
        yAxisFormatter={yAxisFormatter}
        tooltipFormatter={tooltipFormatter}
        barColor={barColor}
        className={className}
      />
    );
  }

  return (
    <LineChartComponent
      data={formattedData}
      height={height}
      dataKey={dataKey}
      yAxisFormatter={yAxisFormatter}
      tooltipFormatter={tooltipFormatter}
      lineColor={lineColor}
      lineStrokeWidth={lineStrokeWidth}
      className={className}
    />
  );
};