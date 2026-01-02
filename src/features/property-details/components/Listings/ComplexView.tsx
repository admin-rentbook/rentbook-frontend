import { ComplexCard } from '@/features/listings/components/AboutYourListing/ListingDescription/Complex';
import type { ComplexDTO } from '@/features/listings/types';
import { EmptyState } from '@/shared/components/EmptyState';
import { ErrorState } from '@/shared/components/ErrorState';
import { useNavigate } from '@tanstack/react-router';
import { PropertyDetailsLinks } from '../../constants';

type ComplexViewProps = {
  complexData: ComplexDTO[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  searchTerm: string;
  reset: () => void;
};

export const ComplexView = ({
  complexData,
  isLoading,
  isFetching,
  isError,
  error,
  searchTerm,
  reset,
}: ComplexViewProps) => {
  const navigate = useNavigate();

  const handleComplexClick = (complexId: number, complexName: string) => {
    navigate({
      to: PropertyDetailsLinks.COMPLEX_VIEW,
      params: { complexId: complexId.toString() },
      search: (prev) => ({
        ...prev,
        complexName,
      }),
    });
  };

  if (isError) {
    return (
      <div className="p-6">
        <ErrorState error={error} onRetry={reset} />
      </div>
    );
  }

  if (isLoading || isFetching) {
    return <div className="p-6">Loading complexes...</div>;
  }

  if (!complexData || complexData.length === 0) {
    return (
      <EmptyState
        title="No complexes found"
        description={
          searchTerm
            ? `No complexes matching "${searchTerm}"`
            : 'No complexes at the moment'
        }
        actionLabel="Clear Search"
        onAction={reset}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {complexData.map((complex) => (
        <ComplexCard
          key={complex.id}
          complex={complex}
          onComplexClick={handleComplexClick}
        />
      ))}
    </div>
  );
};
