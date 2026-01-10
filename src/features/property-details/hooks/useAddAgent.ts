import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import { addAgentSchema } from '../constants';

const fakeApiRequest = <T>(data: T, delay = 1500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const useAddAgent = () => {
  const [openAddAgent, setOpenAddAgent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<{ agentEmail: string }>({
    resolver: zodResolver(addAgentSchema),
    mode: 'onChange',
    defaultValues: {
      agentEmail: '',
    },
  });

  async function onSubmit(data: z.infer<typeof addAgentSchema>) {
    try {
      setIsLoading(true);
      await fakeApiRequest(data);
      setOpenAddAgent(false);
      toast.success(`${data.agentEmail} added successfully`);
      form.reset();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  const isButtonDisabled = !form.formState.isValid;

  return {
    addAgentForm:form,
    isAddAgentBtnDisabled: isButtonDisabled,
    addAgentSubmit: onSubmit,
    openAddAgent,
    setOpenAddAgent,
    isAddingAgent: isLoading
  };
};
