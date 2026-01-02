import { ChartColumnIcon, ChartLineData01Icon } from 'hugeicons-react';

type ChartType = 'line' | 'bar';

type ChartTypeToggleProps = {
  activeType: ChartType;
  onTypeChange: (type: ChartType) => void;
};

const ChartTypeButton = ({
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
    className={`p-1.5 transition-all ${
      active
        ? 'bg-sidebar text-black-500 rounded-full'
        : 'text-black-400/50 hover:text-black-400'
    }`}
  >
    {children}
  </button>
);

export const ChartTypeToggle = ({
  activeType,
  onTypeChange,
}: ChartTypeToggleProps) => {
  return (
    <div className="inline-flex items-center rounded-full border border-custom-gray-100 p-1">
      <ChartTypeButton
        active={activeType === 'line'}
        onClick={() => onTypeChange('line')}
      >
        <ChartLineData01Icon className="size-4" />
      </ChartTypeButton>
      <ChartTypeButton
        active={activeType === 'bar'}
        onClick={() => onTypeChange('bar')}
      >
        <ChartColumnIcon className="size-4" />
      </ChartTypeButton>
    </div>
  );
};
