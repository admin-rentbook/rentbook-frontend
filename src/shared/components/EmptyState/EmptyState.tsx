import { FileX } from 'lucide-react';
import { Button } from '../ui';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState = ({
  title = 'No properties found',
  description = 'Try adjusting your filters or create a new property',
  actionLabel = 'Create Property',
  onAction,
  icon,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon || <FileX className="h-12 w-12 text-muted-foreground mb-4" />}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        {description}
      </p>
      {onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
};
