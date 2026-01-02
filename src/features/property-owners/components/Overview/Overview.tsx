import { EarningsChart } from './EarningsChart';
import { OverviewHeader } from './OverviewHeader';

export const Overview = () => {
  return (
    <div>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-50 blur-[200px] bg-gradient-to-b from-primary-500 to-warning-600" />
        <div className="relative z-10">
          <OverviewHeader />
        </div>
      </div>
      <div className="px-3 pt-3 lg:px-5 lg:pt-5">
        <h1 className="text-heading-5 text-icons-black">Good morning</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[70%_30%] gap-6 p-3 lg:p-5">
        <EarningsChart />
      </div>
    </div>
  );
};
