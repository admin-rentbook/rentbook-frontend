import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import { completionCodeSchema } from '../constants';

export const useViewingDetails = () => {
  const [isOpenReschedule, setIsOpenReschedule] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isOpenAccept, setIsOpenAccept] = useState(false);
  const [isOpenDecline, setIsOpenDecline] = useState(false);

  const form = useForm<{ completionCode: string }>({
    resolver: zodResolver(completionCodeSchema),
    mode: 'onChange',
    defaultValues: {
      completionCode: '',
    },
  });

  function onSubmit(data: z.infer<typeof completionCodeSchema>) {
    console.log(data);
    toast.success('code validated', { id: 'code-success' });
  }

  const isButtonDisabled = !form.formState.isValid;

  const handleReschedule = () => {
    setIsOpenReschedule(true);
  };

  const handleCancel = () => {
    setIsOpenCancel(true);
  };

  const handleAccept = () => {
    setIsOpenAccept(true);
  };

  const handleDecline = () => {
    setIsOpenDecline(true);
  };

  return {
    isButtonDisabled,
    form,
    isOpenCancel,
    isOpenDetails,
    isOpenReschedule,
    setIsOpenCancel,
    setIsOpenDetails,
    setIsOpenReschedule,
    isOpenAccept,
    isOpenDecline,
    setIsOpenAccept,
    setIsOpenDecline,
    onSubmit,
    handleReschedule,
    handleCancel,
    handleAccept,
    handleDecline,
  };
};
