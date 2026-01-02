import { ErrorState } from '@/shared/components/ErrorState';
import { useSearch } from '@tanstack/react-router';
import { PropertyDetailsLinks } from '../../constants';
import { useComplex } from '../../hooks';
import { ComplexHeader } from './ComplexHeader';
import { ComplexTable } from './ComplexTable';

export const Complex = () => {
  const complex = useComplex();
  const { complexName } = useSearch({
    from: PropertyDetailsLinks.COMPLEX_VIEW,
  });

  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit complex');
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log('Delete complex');
  };

  if (complex.isError) {
    return (
      <div className="p-6">
        <ErrorState error={complex.error} onRetry={complex.reset} />
      </div>
    );
  }

  if (complex.isLoading) {
    return <div className="p-6">Loading complex...</div>;
  }

  if (!complex.complexData) {
    return (
      <div className="p-6">
        <ErrorState
          error={new Error('Complex not found')}
          onRetry={() => window.history.back()}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <ComplexHeader {...complex} complexName={complexName} onEdit={handleEdit} onDelete={handleDelete} />
      <ComplexTable {...complex} listings={complex.listings} />
    </div>
  );
};