import {
  useAddToWishlist,
  useGetWishlists,
  useRemoveFromWishlist,
} from '@/features/landing-page/apis';
import { transformWishlistItemToListingDTO } from '@/features/landing-page/utils';
import { useMemo, useState } from 'react';

const ITEMS_PER_PAGE = 12;

export const useWishlist = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: wishlistData,
    isLoading,
    error,
    refetch,
    isError,
  } = useGetWishlists(currentPage, ITEMS_PER_PAGE);

  const addMutation = useAddToWishlist();
  const removeMutation = useRemoveFromWishlist();

  // Extract and transform wishlist items from API response
  const wishlists = useMemo(() => {
    if (!wishlistData?.data) return [];
    return wishlistData?.data?.map(transformWishlistItemToListingDTO);
  }, [wishlistData]);

  const totalCount = wishlistData?.data.length || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const isWishlisted = (listingId: number) => {
    return wishlists?.some((listing) => listing.id === listingId);
  };

  const toggleWishlist = (listingId: number) => {
    if (isWishlisted(listingId)) {
      removeMutation.mutate(listingId);
    } else {
      addMutation.mutate(listingId);
    }
  };

  const addToWishlist = (listingId: number) => {
    addMutation.mutate(listingId);
  };

  const removeFromWishlist = (listingId: number) => {
    removeMutation.mutate(listingId);
  };

  return {
    wishlists,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    handlePageChange,
    refetch,
    isWishlisted,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
    isError,
  };
};
