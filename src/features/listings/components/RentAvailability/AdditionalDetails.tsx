import { useSearch } from '@tanstack/react-router';
import { Button } from '@/shared/components';
import { Form, FormInput, FormTextarea } from '@/shared/components/Form';
import { Add01Icon } from 'hugeicons-react';
import { useAddNote } from '../../hooks';
import { ListingTitle, NavigateButtons } from '../shared';
import { NoteDetails } from './NoteDetails';

type AdditionalDetailsProps = {
  onPrev: (() => void) | undefined;
  onNext: (() => void) | undefined;
};
export const AdditionalDetails = ({
  onNext,
  onPrev,
}: AdditionalDetailsProps) => {
  const { listingId } = useSearch({ from: '/listings-start' });
  const addNoteHook = useAddNote(listingId as number, onNext);
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-6 xl:w-3/5 pb-10">
        <div className="flex flex-col">
          <div className="flex justify-start px-[10px] rounded-10 bg-red-400/5 w-fit py-[5px]">
            <p className="text-body text-red-400">Optional</p>
          </div>
          <ListingTitle
            description="You can add notes or requirements that will guide renters."
            title="Additional details for renters to note"
          />
        </div>
        <Form form={addNoteHook.form} onSubmit={addNoteHook.onSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 p-6 rounded-[1.25em] bg-sidebar">
              <h3 className="text-heading-xl-semi text-black-500">Note</h3>
              <FormInput
                control={addNoteHook.form.control}
                name="noteTitle"
                label="Title"
                size="sm"
                showErrorMessage
                onKeyDown={addNoteHook.handleKeyDown}
              />
              <FormTextarea
                control={addNoteHook.form.control}
                name="noteDescription"
                label="Description"
                onKeyDown={addNoteHook.handleKeyDown}
              />
            </div>
            <Button
              disabled={addNoteHook.isButtonDisabled}
              variant="tertiary"
              size="md"
              onClick={addNoteHook.handleAddNote}
            >
              <Add01Icon /> {addNoteHook.hasNotes ? 'Add Another' : 'Add'}
            </Button>
          </div>
        </Form>
        {addNoteHook.hasNotes && (
          <div className="space-y-3">
            <h4 className="text-body-medium text-black-500">
              Added Notes ({addNoteHook.notes.length})
            </h4>
            {addNoteHook.notes.map((note, index) => (
              <NoteDetails
                key={index}
                note={note}
                handleRemoveNote={addNoteHook.handleRemoveNote}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
      <NavigateButtons
        onBack={() => onPrev?.()}
        onContinue={addNoteHook.handleSubmit}
        isLoading={addNoteHook.isUpdateLoading}
      />
    </div>
  );
};
