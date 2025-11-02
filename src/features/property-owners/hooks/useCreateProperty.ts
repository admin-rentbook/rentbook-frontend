import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { createPropertySchema, LISTING_TYPE } from '../constants';
import { useCreatePropertyStore } from '../store';
import type { CreatePropertyData, ListingTypeData } from '../types/property';

export const useCreateProperty = () => {
  const listingInfo = useCreatePropertyStore((s) => s.listingInfo);
  const propertyInfo = useCreatePropertyStore((s) => s.propertyInfo);

  type AgentInfo = Partial<{
    listingType: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
    agentCommission: number;
  }>;
  const info = listingInfo as AgentInfo;

  const form = useForm<CreatePropertyData>({
    resolver: zodResolver(createPropertySchema),
    mode: 'all',
    defaultValues: {
      propertyName: propertyInfo.propertyName,
      address: propertyInfo.address,
      lat: propertyInfo.lat,
      lng: propertyInfo.lng,
      placeId: propertyInfo.placeId ?? '',
      listingType: info.listingType || LISTING_TYPE.OWNER,
      ...(info.listingType === LISTING_TYPE.AGENT
        ? {
            ownerName: info.ownerName || '',
            ownerEmail: info.ownerEmail || '',
            ownerPhone: info.ownerPhone || '',
            agentCommission: info.agentCommission ?? undefined,
          }
        : {}),
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
    setIsOpen(true)
    useCreatePropertyStore.getState().setListingInfo(data as ListingTypeData);
    useCreatePropertyStore.getState().next();
  }

  const isButtonDisabled = !form.formState.isValid;

  return {
    formCreate: form,
    onSubmitCreate: onSubmit,
    isCreateButtonDisabled: isButtonDisabled,
    listingType,
    isOpen,
    setIsOpen
  };
};
