import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import { createBlockSchema } from '../constants';
type SetOpenBlock = React.Dispatch<React.SetStateAction<boolean>>;
export const useBlock = (setOpenBlock: SetOpenBlock) => {
  const [blockState, setBlockState] = useState<'ADD_TO_BLOCK' | 'CREATE_BLOCK'>(
    'ADD_TO_BLOCK'
  );
  const form = useForm<{ blockName: string }>({
    resolver: zodResolver(createBlockSchema),
    mode: 'onChange',
    defaultValues: {
      blockName: '',
    },
  });

  function onSubmit(data: z.infer<typeof createBlockSchema>) {
    toast.success(`Block: ${data.blockName} created successfully`, {
      id: 'block-success',
    });

    setOpenBlock(false);
    form.reset();
    setBlockState('ADD_TO_BLOCK');
  }

  const isButtonDisabled = !form.formState.isValid;

  return {
    formBlock: form,
    isBlockBtnDisabled: isButtonDisabled,
    onBlockSubmit: onSubmit,
    blockState,
    setBlockState,
  };
};
