import type { LocationResult } from '@/shared/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearch } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { useGetPropertyDetailsById, useUpdatePropertyMutation } from '../apis';
import {
  createPropertySchema,
  LISTING_TYPE,
  type ListingTypes,
} from '../constants';
import type { CreatePropertyData } from '../types/property';

export const useEditProperty = () => {
  const { propertyId } = useSearch({ from: '/properties/edit' });
  const [locationResult, setLocationResult] = useState<LocationResult | null>(
    null
  );

  // Fetch existing property data
  const {
    data: propertyData,
    isLoading: isLoadingProperty,
    error,
    isError,
    refetch,
  } = useGetPropertyDetailsById(propertyId!);

  const updatePropertyMutation = useUpdatePropertyMutation();

  const form = useForm<CreatePropertyData>({
    resolver: zodResolver(createPropertySchema),
    mode: 'onChange',
    defaultValues: {
      propertyName: '',
      address: '',
      lat: 6.5244,
      lng: 3.3792,
      placeId: '',
      listedBy: propertyData?.listed_by || LISTING_TYPE.OWNER as ListingTypes,
      ...(propertyData?.listed_by === LISTING_TYPE.AGENT && {
        ownerName: propertyData.owner?.full_name || '',
        ownerEmail: propertyData.owner?.email || '',
        ownerPhone: propertyData.owner_phone || '',
        
      }),
    },
  });

  const listedBy = form.watch('listedBy');

  // Populate form with existing property data
  useEffect(() => {
    if (propertyData) {
      let formData: CreatePropertyData;

      if (propertyData.listed_by === LISTING_TYPE.AGENT) {
        formData = {
          propertyName: propertyData.property_name || '',
          address: propertyData.address?.formatted_address || '',
          lat: propertyData.address?.latitude || 6.5244,
          lng: propertyData.address?.longitude || 3.3792,
          placeId: propertyData.address?.place_id || '',
          listedBy: LISTING_TYPE.AGENT,
          ownerEmail: propertyData.owner_email || '',
          ownerName: propertyData.owner?.full_name || '',
          ownerPhone: propertyData.owner_phone || '',
          agentCommission: 0, // Backend doesn't return this, so default to 0
        };
      } else {
        formData = {
          propertyName: propertyData.property_name || '',
          address: propertyData.address?.formatted_address || '',
          lat: propertyData.address?.latitude || 6.5244,
          lng: propertyData.address?.longitude || 3.3792,
          placeId: propertyData.address?.place_id || '',
          listedBy: LISTING_TYPE.OWNER,
        };
      }

      form.reset(formData, { keepDefaultValues: false });

      // Set initial location result from existing data
      if (propertyData.address) {
        setLocationResult({
          placeId: propertyData.address.place_id || '',
          address: propertyData.address.formatted_address,
          lat: propertyData.address.latitude,
          lng: propertyData.address.longitude,
          street: propertyData.address.street_name || '',
          city: propertyData.address.city || '',
          state: propertyData.address.state || '',
          country: propertyData.address.country || '',
          postalCode: propertyData.address.postal_code || '',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyData]);

  // Handle listedBy change - unregister agent fields if switching to owner
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
    if (!locationResult || !propertyId) {
      return;
    }

    updatePropertyMutation.mutate(
      {
        propertyId,
        data,
        locationResult,
      },
      {
        onSuccess: () => {
          setIsOpen(true);
        },
      }
    );
  }

  const isButtonDisabled = !form.formState.isValid || !locationResult;

  return {
    form,
    onSubmit,
    isButtonDisabled,
    listedBy,
    isOpen,
    setIsOpen,
    locationResult,
    setLocationResult,
    propertyId,
    propertyData,
    isLoadingProperty,
    error,
    isError,
    refetch,
    isLoading: updatePropertyMutation.isPending,
  };
};
