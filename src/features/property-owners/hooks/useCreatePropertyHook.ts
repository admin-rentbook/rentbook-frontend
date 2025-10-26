import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { createPropertyValSchema } from '../constants';

export const useCreateProperty = () => {
  const form = useForm<z.infer<typeof createPropertyValSchema>>({
    resolver: zodResolver(createPropertyValSchema),
    defaultValues: {
      propertyName: '',
      address: '',
    },
  });

  function onSubmit(data: z.infer<typeof createPropertyValSchema>) {
    console.log(data);
  }

  

  return { form, onSubmit };
};
