type AvailabilityBadgeProps = {
  days: number;
  label?: string;
};

export const AvailabilityBadge = ({ days, label = 'Available in' }: AvailabilityBadgeProps) => {
  if (days <= 0) return null;

  return (
    <div className="rounded-full grid place-items-center bg-sidebar-accent p-2">
      <p className="text-caption text-black-500">
        {label} {days} {days === 1 ? 'day' : 'days'}
      </p>
    </div>
  );
};
