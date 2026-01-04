import {
  useAddToWaitlist,
  useGetUserWaitlists,
  useRemoveFromWaitlist,
} from '@/features/landing-page/apis';
import { transformWaitlistItemToListingDTO } from '@/features/landing-page/utils';
import { useMemo } from 'react';

export const useWaitlist = () => {
  const {
    data: waitlistData,
    isLoading,
    error,
    refetch,
    isError,
  } = useGetUserWaitlists();

  const addMutation = useAddToWaitlist();
  const removeMutation = useRemoveFromWaitlist();

  // Extract and transform waitlist items from API response
  const waitlists = useMemo(() => {
    if (!waitlistData?.data) return [];
    return waitlistData.data.map(transformWaitlistItemToListingDTO);
  }, [waitlistData]);

  const totalCount = waitlists.length;

  const isWaitlisted = (listingId: number) => {
    return waitlists.some((listing) => listing.id === listingId);
  };

  const toggleWaitlist = (listingId: number) => {
    if (isWaitlisted(listingId)) {
      removeMutation.mutate(listingId);
    } else {
      addMutation.mutate(listingId);
    }
  };

  const addToWaitlist = (listingId: number) => {
    addMutation.mutate(listingId);
  };

  const removeFromWaitlist = (listingId: number) => {
    removeMutation.mutate(listingId);
  };

  return {
    waitlists,
    isLoading,
    error,
    isError,
    totalCount,
    refetch,
    isWaitlisted,
    toggleWaitlist,
    addToWaitlist,
    removeFromWaitlist,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
  };
};