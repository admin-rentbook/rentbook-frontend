type VerticalDottedLineProps = {
  height?: string;
  strokeWidth?: number;
  dash?: string;

};
export const VerticalDottedLine = ({
  height = '100%',
  strokeWidth = 2,
  dash = '6 6', // dot size and gap
}: VerticalDottedLineProps) => {
  return (
    <svg
      width={strokeWidth}
      height={height}
      viewBox={`0 0 ${strokeWidth} 100`}
      preserveAspectRatio="none"
      className={`absolute left-4 top-8`}
    >
      <line
        x1={strokeWidth / 2}
        y1="0"
        x2={strokeWidth / 2}
        y2="100"
        strokeWidth={strokeWidth}
        strokeDasharray={dash}
        strokeLinecap="round"
        className="stroke-custom-neutral-300"
      />
    </svg>
  );
};
