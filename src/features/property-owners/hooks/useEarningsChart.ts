import { useCallback, useMemo, useState } from 'react';

export type Period = 'D' | 'M';
export type ChartType = 'line' | 'bar';

type ChartDataPoint = {
  name: string;
  amount: number;
};

// Dummy data for different periods
const DAILY_DATA: ChartDataPoint[] = [
  { name: 'MON', amount: 4500 },
  { name: 'TUE', amount: 3200 },
  { name: 'WED', amount: 0 },
  { name: 'THU', amount: 5800 },
  { name: 'FRI', amount: 4200 },
  { name: 'SAT', amount: 6100 },
  { name: 'SUN', amount: 3900 },
];

const MONTHLY_DATA: ChartDataPoint[] = [
  { name: 'JAN', amount: 4500 },
  { name: 'FEB', amount: 52000 },
  { name: 'MAR', amount: 0 },
  { name: 'APR', amount: 61000 },
  { name: 'MAY', amount: 55000 },
  { name: 'JUN', amount: 67000 },
  { name: 'JUL', amount: 0 },
  { name: 'AUG', amount: 72000 },
  { name: 'SEP', amount: 68000 },
  { name: 'OCT', amount: 59000 },
  { name: 'NOV', amount: 63000 },
  { name: 'DEC', amount: 71000 },
];

const DATA_MAP: Record<Period, ChartDataPoint[]> = {
  D: DAILY_DATA,
  M: MONTHLY_DATA,
};

export const useEarningsChart = () => {
  const [period, setPeriod] = useState<Period>('D');
  const [chartType, setChartType] = useState<ChartType>('bar');

  const currentData = useMemo(() => DATA_MAP[period], [period]);

  const totalAmount = useMemo(
    () => currentData.reduce((sum, item) => sum + item.amount, 0),
    [currentData]
  );

  const handlePeriodChange = useCallback((newPeriod: Period) => {
    setPeriod(newPeriod);
  }, []);

  const handleChartTypeChange = useCallback((newType: ChartType) => {
    setChartType(newType);
  }, []);

  return {
    period,
    handlePeriodChange,
    chartType,
    handleChartTypeChange,
    currentData,
    totalAmount,
  };
};