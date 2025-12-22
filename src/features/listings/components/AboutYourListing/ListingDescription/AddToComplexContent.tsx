import { Button } from '@/shared/components';
import type { ComplexDTO } from '../../../types';

type AddToComplexContentProps = {
  complexItems?: ComplexDTO[];
  onBlockClick: (blockId: number, blockName: string) => void;
  onCreateNew: () => void;
  onClose: () => void;
};
export const AddToComplexContent = ({
  // complexItems,
  // onBlockClick,
  onCreateNew,
  onClose,
}: AddToComplexContentProps) => (
  <>
    {/* <div className="grid gap-4 grid-cols-2">
      {complexItems.map((complexItem) => (
        <Block
          key={complexItem.complexName}
          block={complexItem}
          onBlockClick={onBlockClick}
        />
      ))}
    </div> */}

    <div className="flex items-center justify-end gap-4 pt-4">
      <Button variant="tertiary" onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={onCreateNew}>Create new complex</Button>
    </div>
  </>
);
