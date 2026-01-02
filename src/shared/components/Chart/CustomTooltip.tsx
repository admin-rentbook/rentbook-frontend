type CustomTooltipProps = {
  active?: boolean;
  payload?: any[];
  labelFormatter?: (value: any) => string;
  valueFormatter?: (value: number) => string;
};

export const CustomTooltip = ({
  active,
  payload,
  labelFormatter,
  valueFormatter = (value) => `N$${value.toLocaleString()}`,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const label = labelFormatter
      ? labelFormatter(data.payload.name)
      : data.payload.name;
    const value =
      data.payload.actualAmount !== undefined
        ? data.payload.actualAmount
        : data.value;

    return (
      <div className="bg-white border border-custom-gray-100 rounded-lg p-3 shadow-lg">
        <p className="text-body-small text-black-400 mb-1">{label}</p>
        <p className="text-body-base-bold text-black-500">
          {valueFormatter(value)}
        </p>
      </div>
    );
  }
  return null;
};