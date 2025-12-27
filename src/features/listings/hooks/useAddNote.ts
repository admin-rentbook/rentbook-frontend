import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import {
  useGetAdditionalDetails,
  useUpdateAdditionalDetails,
} from '../apis/requests/additionalDetails';
import { addNoteSchema } from '../constants';
import { useListingDraft } from '../providers';
import type { AddNoteFormValues, Note } from '../types';
import { transformAdditionalDetailsDTOToFormValues } from '../types/mappedTypes';

export const useAddNote = (
  listingId: number,
  onNext: (() => void) | undefined
) => {
  const { updateStepData, markStepComplete, markMainStepComplete, draft } =
    useListingDraft();

  const [notes, setNotes] = useState<Note[]>(draft?.finalDetails?.notes ?? []);

  const {
    data: additionalDetailsData,
    isPending,
    isFetching,
  } = useGetAdditionalDetails(listingId);
  const additionalDetails = additionalDetailsData?.data;

  const updateAdditionalDetailsMutation = useUpdateAdditionalDetails();

  useEffect(() => {
    if (additionalDetails) {
      const formValues = transformAdditionalDetailsDTOToFormValues(additionalDetails);

      const currentDraft = draft?.finalDetails || {};
      updateStepData('finalDetails', {
        ...currentDraft,
        notes: formValues,
      });

      setNotes(formValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [additionalDetails]);

  const form = useForm<AddNoteFormValues>({
    resolver: zodResolver(addNoteSchema),
    mode: 'onChange',
    defaultValues: {
      noteTitle: '',
      noteDescription: '',
    },
  });

  const handleAddNote = () => {
    const values = form.getValues();
    if (values.noteTitle.trim() && values.noteDescription.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        noteTitle: values.noteTitle.trim(),
        noteDescription: values.noteDescription.trim(),
      };
      const updatedNotes = [...notes, newNote];

      setNotes(updatedNotes);

      const currentDraft = draft?.finalDetails || {};
      updateStepData('finalDetails', {
        ...currentDraft,
        notes: updatedNotes,
      });
      form.reset({
        noteTitle: '',
        noteDescription: '',
      });
    }
  };

  const handleRemoveNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);

    const currentDraft = draft?.finalDetails || {};
    updateStepData('finalDetails', {
      ...currentDraft,
      notes: updatedNotes,
    });
  };

  const clearAllNotes = () => {
    setNotes([]);
    const currentDraft = draft?.finalDetails || {};
    updateStepData('finalDetails', {
      ...currentDraft,
      notes: [],
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && form.formState.isValid) {
      e.preventDefault();
      handleAddNote();
    }
  };

  const hasNotes = notes.length > 0;
  const canSubmit = notes.length > 0;

  function onSubmit(data: z.input<typeof addNoteSchema>) {
    console.log(data);
    onNext?.();
  }

  const isButtonDisabled = !form.formState.isValid;

  const handleSubmit = () => {
    updateAdditionalDetailsMutation.mutate(
      {
        data: notes,
        listingId: listingId as number,
      },
      {
        onSuccess: () => {
          // Update draft with saved data
          const currentDraft = draft?.finalDetails || {};
          updateStepData('finalDetails', {
            ...currentDraft,
            notes: notes,
          });

          markStepComplete(3, 1);
          markMainStepComplete(3);
          onNext?.();
        },
      }
    );
  };

  return {
    form,
    onSubmit,
    isButtonDisabled,
    notes,
    handleAddNote,
    handleRemoveNote,
    clearAllNotes,
    handleKeyDown,
    hasNotes,
    canSubmit,
    handleSubmit,
    isUpdateLoading: updateAdditionalDetailsMutation.isPending,
    isPending: isPending && !additionalDetails,
    isFetching,
  };
};