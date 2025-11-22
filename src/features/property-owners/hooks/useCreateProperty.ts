import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { createPropertySchema, LISTING_TYPE } from '../constants';
import { useCreatePropertyStore } from '../store';
import type { CreatePropertyData, PropertyDataDTO } from '../types/property';

export const useCreateProperty = () => {
  const propertyData = useCreatePropertyStore(
    (s) => s.propertyData
  ) as PropertyDataDTO;

  const form = useForm<CreatePropertyData>({
    resolver: zodResolver(createPropertySchema),
    mode: 'onChange',
    defaultValues: {
      propertyName: propertyData.propertyName || '',
      address: propertyData.address || '',
      lat: propertyData.lat || 6.5244,
      lng: propertyData.lng || 3.3792,
      placeId: propertyData.placeId || '',

      listingType: propertyData.listingType || LISTING_TYPE.OWNER,

      ...(propertyData.listingType === LISTING_TYPE.AGENT && {
        ownerName: propertyData.ownerName || '',
        ownerEmail: propertyData.ownerEmail || '',
        ownerPhone: propertyData.ownerPhone || '',
        agentCommission: propertyData.agentCommission,
      }),
    },
  });
  const listingType = form.watch('listingType');

  useEffect(() => {
    if (listingType === LISTING_TYPE.OWNER) {
      form.unregister([
        'ownerName',
        'ownerEmail',
        'ownerPhone',
        'agentCommission',
      ]);
    }
  }, [listingType, form]);

  const [isOpen, setIsOpen] = useState(false);

  function onSubmit(data: z.infer<typeof createPropertySchema>) {
    console.log(data);
    setIsOpen(true);
  }

  const isButtonDisabled = !form.formState.isValid;

  return {
    form,
    onSubmit,
    isButtonDisabled,
    listingType,
    isOpen,
    setIsOpen,
  };
};
