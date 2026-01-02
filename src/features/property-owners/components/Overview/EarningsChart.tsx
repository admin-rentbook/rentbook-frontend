import {
  Chart,
  ChartTypeToggle,
  PeriodFilter,
} from '@/shared/components/Chart';
import { TooltipComp } from '@/shared/components/Tooltip/Tooltip';
import { InformationCircleIcon } from 'hugeicons-react';
import { useEarningsChart } from '../../hooks';

export const EarningsChart = () => {
  const {
    period,
    handlePeriodChange,
    chartType,
    handleChartTypeChange,
    currentData,
    totalAmount,
  } = useEarningsChart();

  return (
    <div className="flex flex-col p-3 lg:p-6 border border-custom-gray-100 rounded-[1.25em]">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-body text-black-300">Total earnings</p>
          <TooltipComp
            tooltipTrigger={
              <InformationCircleIcon className="size-4 text-black-400/50 cursor-help" />
            }
            children={
              <p className="text-11 text-black-300">
                Track your earnings over different time periods
              </p>
            }
          />
        </div>

        <div className="flex items-center gap-3">
          <PeriodFilter
            periods={['D', 'M']}
            activePeriod={period}
            onPeriodChange={handlePeriodChange}
          />
          <ChartTypeToggle
            activeType={chartType}
            onTypeChange={handleChartTypeChange}
          />
        </div>
      </div>

      <div className='pb-2'>
        <p className="text-heading text-black-500">
          N${totalAmount.toLocaleString()}
        </p>
      </div>

      <Chart
        data={currentData}
        type={chartType}
        height={300}
        dataKey="amount"
        yAxisFormatter={(value) =>
          value === 2 ? '' : `N$${(value / 1000).toFixed(0)}k`
        }
        tooltipFormatter={(value) => `N$${value.toLocaleString()}`}
        barColor="var(--primary-500)"
        lineColor="var(--primary-500)"
        lineStrokeWidth={1}
      />
    </div>
  );
};
