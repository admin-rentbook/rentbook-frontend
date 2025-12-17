import type { LocationResult } from '@/shared/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { useCreatePropertyMutation } from '../apis';
import {
  createPropertySchema,
  LISTING_TYPE,
  type ListingTypes,
} from '../constants';
import { useCreatePropertyStore } from '../store';
import type { CreatePropertyData, PropertyDataDTO } from '../types/property';

export const useCreateProperty = () => {
  const propertyData = useCreatePropertyStore(
    (s) => s.propertyData
  ) as PropertyDataDTO;
  const [locationResult, setLocationResult] = useState<LocationResult | null>(
    null
  );

  const createPropertyMutation = useCreatePropertyMutation();

  const form = useForm<CreatePropertyData>({
    resolver: zodResolver(createPropertySchema),
    mode: 'onChange',
    defaultValues: {
      propertyName: propertyData.propertyName || '',
      address: propertyData.address || '',
      lat: propertyData.lat || 6.5244,
      lng: propertyData.lng || 3.3792,
      placeId: propertyData.placeId || '',

      listedBy: (propertyData.listedBy || LISTING_TYPE.OWNER) as ListingTypes,

      ...(propertyData.listedBy === LISTING_TYPE.AGENT && {
        ownerName: propertyData.ownerName || '',
        ownerEmail: propertyData.ownerEmail || '',
        ownerPhone: propertyData.ownerPhone || '',
        agentCommission: propertyData.agentCommission,
      }),
    },
  });
  const listedBy = form.watch('listedBy');

  useEffect(() => {
    if (listedBy === LISTING_TYPE.OWNER) {
      form.unregister([
        'ownerName',
        'ownerEmail',
        'ownerPhone',
        'agentCommission',
      ]);
    }
  }, [listedBy, form]);

  const [isOpen, setIsOpen] = useState(false);

  function onSubmit(data: z.infer<typeof createPropertySchema>) {

    if (!locationResult) {
      return;
    }
    createPropertyMutation.mutate(
      { data, locationResult },
      {
        onSuccess: () => {
          setIsOpen(true);
        },
      }
    );
  }

  const isButtonDisabled = !form.formState.isValid;

  return {
    form,
    onSubmit,
    isButtonDisabled,
    listedBy,
    isOpen,
    setIsOpen,
    locationResult,
    setLocationResult,
    isLoading: createPropertyMutation.isPending,
  };
};
