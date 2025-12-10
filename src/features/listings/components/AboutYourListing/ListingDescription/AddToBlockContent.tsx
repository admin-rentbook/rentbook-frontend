import { Button } from '@/shared/components';
import type { BlockDTO } from '../../../types';
import { Block } from './Block';

type AddToBlockContentProps = {
  blockItems: BlockDTO[];
  onBlockClick: (blockId: number, blockName: string) => void;
  onCreateNew: () => void;
  onClose: () => void;
};
export const AddToBlockContent = ({
  blockItems,
  onBlockClick,
  onCreateNew,
  onClose,
}: AddToBlockContentProps) => (
  <>
    <div className="grid gap-4 grid-cols-2">
      {blockItems.map((blockItem) => (
        <Block
          key={blockItem.blockName}
          block={blockItem}
          onBlockClick={onBlockClick}
        />
      ))}
    </div>

    <div className="flex items-center justify-end gap-4 pt-4">
      <Button variant="tertiary" onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={onCreateNew}>Create new block</Button>
    </div>
  </>
);
