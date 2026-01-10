import { useState } from 'react';
import { toast } from 'sonner';

const fakeApiRequest = <T>(data: T, delay = 1500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const useDeactivateProperty = () => {
  const [openDeactivateProperty, setOpenDeactivateProperty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeactivateProperty = async () => {
    try {
      setIsLoading(true);
      await fakeApiRequest(1);
      toast.success('Property deactivated successfully', { id: 'toast-suc-d' });
      setOpenDeactivateProperty(false);
    } catch (error) {
      toast.error('Error deactivating property', { id: 'toast-err-d' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    openDeactivateProperty,
    setOpenDeactivateProperty,
    isDeactivatingProperty: isLoading,
    handleDeactivateProperty
  };
};
