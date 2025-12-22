import { Button } from '@/shared/components';
import type { ComplexDTO } from '../../../types';
import { ComplexCard } from './Complex';

type AddToComplexContentProps = {
  complexItems?: ComplexDTO[];
  onComplexClick: (complexId: number, complexName: string) => void;
  onCreateNew: () => void;
  onClose: () => void;
  isLoading?: boolean;
};

export const AddToComplexContent = ({
  complexItems,
  onComplexClick,
  onCreateNew,
  onClose,
  isLoading = false,
}: AddToComplexContentProps) => (
  <>
    {isLoading ? (
      <div className="flex items-center justify-center py-8">
        <p className="text-body text-black-400">Loading complexes...</p>
      </div>
    ) : complexItems && complexItems.length > 0 ? (
      <div className="grid gap-4 grid-cols-2">
        {complexItems.map((complexItem) => (
          <ComplexCard
            key={complexItem.id}
            complex={complexItem}
            onComplexClick={onComplexClick}
          />
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-body text-black-400">No complexes found</p>
        <p className="text-body-sm text-black-300">Create one to get started</p>
      </div>
    )}

    <div className="flex items-center justify-end gap-4 pt-4">
      <Button variant="tertiary" onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={onCreateNew}>Create new complex</Button>
    </div>
  </>
);
