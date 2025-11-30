import { Check } from 'lucide-react';

type CircularProgressLoaderProps = {
  percentage: number;
  isCompleted: boolean;
  stepNumber: number;
  strokeWidth?: number;
  size?: number;
};

export const CircularProgressLoader = (props: CircularProgressLoaderProps) => {
  const { size = 48, strokeWidth = 3 } = props;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (props.percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="white"
          strokeWidth={strokeWidth}
          strokeDasharray={props.percentage > 0 ? '1' : '4 4'}
          className="stroke-custom-neutral-300"
        />

        {props.percentage > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out stroke-primary-500"
          />
        )}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        {props.isCompleted && (
          <div className="w-full h-full rounded-full bg-red-500 flex items-center justify-center">
            <Check className="w-6 h-6 text-white" />
          </div>
        )} 
      </div>
    </div>
  );
};
