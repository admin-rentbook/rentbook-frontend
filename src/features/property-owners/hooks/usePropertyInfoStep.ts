import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { propertyInfoSchema } from '../constants';
import { useCreatePropertyStore } from '../store';
import type { PropertyInfoData } from '../types/property';

export const usePropertyInfoStep = () => {
  const propertyInfo = useCreatePropertyStore((s) => s.propertyInfo);
  const setPropertyInfo = useCreatePropertyStore((s) => s.setPropertyInfo);
  const next = useCreatePropertyStore((s) => s.next);

  const form = useForm<PropertyInfoData>({
    resolver: zodResolver(propertyInfoSchema),
    defaultValues: {
      propertyName: propertyInfo.propertyName ?? '',
      address: propertyInfo.address ?? '',
      lat: propertyInfo.lat || 6.5244,
      lng: propertyInfo.lng || 3.3792,
      placeId: propertyInfo.placeId || '',
    },
  });

  const onSubmit = (data: PropertyInfoData) => {
    console.log('data', data);
    setPropertyInfo(data);
    next();
  };

  const isButtonDisabled = !form.formState.isValid;

  return {
    form,
    onSubmit,
    isButtonDisabled,
  };
};
