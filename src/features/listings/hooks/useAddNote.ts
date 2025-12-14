import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { addNoteSchema } from '../constants';
import { useListingDraft } from '../providers';
import type { AddNoteFormValues, Note } from '../types';

export const useAddNote = (onNext: (() => void) | undefined) => {
  const { updateStepData, markStepComplete, markMainStepComplete, draft } =
    useListingDraft();

  const [notes, setNotes] = useState<Note[]>(draft?.finalDetails?.notes ?? []);
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
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const clearAllNotes = () => {
    setNotes([]);
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
      markStepComplete(3, 1);
      markMainStepComplete(3);
      onNext?.();
    
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
  };
};
