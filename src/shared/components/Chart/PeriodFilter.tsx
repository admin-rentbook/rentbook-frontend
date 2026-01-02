type PeriodFilterProps<T extends string> = {
  periods: T[];
  activePeriod: T;
  onPeriodChange: (period: T) => void;
};

const PeriodButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 text-body-small transition-all ${
      active
        ? 'bg-sidebar text-black-500 rounded-full'
        : 'text-black-400/50 hover:text-black-400'
    }`}
  >
    {children}
  </button>
);

export const PeriodFilter = <T extends string>({
  periods,
  activePeriod,
  onPeriodChange,
}: PeriodFilterProps<T>) => {
  return (
    <div className="inline-flex items-center rounded-full border border-custom-gray-100 p-1">
      {periods.map((period) => (
        <PeriodButton
          key={period}
          active={activePeriod === period}
          onClick={() => onPeriodChange(period)}
        >
          {period}
        </PeriodButton>
      ))}
    </div>
  );
};
