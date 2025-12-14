import type { Note } from '@/features/listings/types';

export type ThingsToNoteProps = {
  notes: Note[];
};

export const ThingsToNote = ({ notes }: ThingsToNoteProps) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-heading text-black-500">Things to note</h2>

      <div className="flex flex-col md:flex-row gap-2 w-full xl:w-2/3">
        {notes.map((note) => (
          <div className="border border-custom-neutral-100 flex flex-col gap-3 rounded-[1.25em] px-4 py-4 pb-6">
            <h4 className="text-body-medium text-neutral-600">
              {note.noteTitle}
            </h4>
            <p className="text-body-small text-black-300">
              {note.noteDescription}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
