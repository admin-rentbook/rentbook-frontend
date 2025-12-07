import { Button } from '@/shared/components';
import { Cancel01Icon } from 'hugeicons-react';
import type { Note } from '../../types';

type NoteDetailsProps = {
  note: Note;
  index: number;
  handleRemoveNote: (id: string) => void;
};

export const NoteDetails = ({
  note,
  handleRemoveNote,
  index,
}: NoteDetailsProps) => {
  return (
    <div className="flex gap-3 items-center border border-custom-gray-100 rounded-2xl p-4">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="font-medium text-sm mb-1 break-words">
          {note.noteTitle}
        </h5>
        <p className="text-xs text-muted-foreground break-words whitespace-pre-wrap">
          {note.noteDescription}
        </p>
      </div>
      <Button
        type="button"
        variant="ghost"
        className="flex-shrink-0 h-8 w-8 text-red-500 hover:text-red-600"
        onClick={() => handleRemoveNote(note.id)}
      >
        <Cancel01Icon />
      </Button>
    </div>
  );
};
