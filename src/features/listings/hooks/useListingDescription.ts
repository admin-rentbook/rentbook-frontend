import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import { listingDescriptionSchema, ListingLinks } from '../constants';
import type { BlockDTO, ListingDescriptionFormValues } from '../types';

export const useListingDescription = (onNext: (() => void) | undefined) => {
  const [openBlock, setOpenBlock] = useState(false);
  const [isAddListingToBlock, setIsAddListingToBlock] = useState(false);
  const navigate = useNavigate();
  const form = useForm<ListingDescriptionFormValues>({
    resolver: zodResolver(listingDescriptionSchema),
    mode: 'onChange',
    defaultValues: {
      listingTitle: '',
      listingType: '',
      noOfBeds: undefined,
      noOfBathrooms: undefined,
      sizeSqFt: undefined,
      listingDescription: '',
    },
  });

  function onSubmit(data: z.infer<typeof listingDescriptionSchema>) {
    console.log(data);
    onNext?.();
  }

  const handleAddToBlock = (block: BlockDTO) => {
    toast.success(`'Listing added to Block: ${block.blockName}`);
    navigate({
      to: ListingLinks.LISTINGS,
      search: { blockName: block.blockName },
    });
    setOpenBlock(false);
  };

  const isButtonDisabled = !form.formState.isValid;

  return {
    form,
    onSubmit,
    isButtonDisabled,
    openBlock,
    setOpenBlock,
    isAddListingToBlock,
    setIsAddListingToBlock,
    handleAddToBlock,
  };
};
