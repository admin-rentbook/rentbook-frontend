import propertyImage from '@/assets/images/property-image.jpg';
import {
  useGetListingSummary,
  useGetMedia,
} from '@/features/listings/apis';
import type { ListingDTO } from '@/shared/types';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type UseListingLiveModalProps = {
  listingId: number | undefined;
  showListingLiveModal: boolean | undefined;
};

export const useListingLiveModal = ({
  listingId,
  showListingLiveModal,
}: UseListingLiveModalProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use summary endpoint as primary source for all data
  const { data: summaryData } = useGetListingSummary(listingId as number, {
    enabled: !!listingId && !!showListingLiveModal,
  });

  // Only fetch full media list separately (summary only has primary_media)
  const { data: mediaData } = useGetMedia(listingId as number, {
    enabled: !!listingId && !!showListingLiveModal,
  });

  // Show modal when flag is present
  useEffect(() => {
    if (showListingLiveModal && listingId) {
      setIsModalOpen(true);
    }
  }, [showListingLiveModal, listingId]);

  const handleShareListing = () => {
    toast.info('Share functionality coming soon!');
  };

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      navigate({
        to: '/property-details',
        search: (prev) => ({
          ...prev,
          showListingLiveModal: undefined,
          propertyId: prev.propertyId,
          listingId: prev.listingId
        }),
        replace: true,
      });
    }
  };

  // Transform listing data for modal
  const summary = summaryData?.data;
  const pricing = summary?.pricing;

  const listingData: ListingDTO = {
    id: summary?.id,
    title: summary?.title || 'New Listing',
    location: summary?.complex?.name
      ? `${summary.complex.name}, Windhoek`
      : 'Windhoek, Khomas Region',
    images:
      mediaData?.data && mediaData.data.length > 0
        ? mediaData.data.map(
            (m) =>
              m.signed_url ||
              m.thumb_medium ||
              m.thumb_large ||
              m.file_url ||
              propertyImage
          )
        : summary?.primary_media?.signed_url
          ? [summary.primary_media.signed_url]
          : [propertyImage],
    amenities: summary?.amenities || [],
    amount: pricing?.fixed_config?.rental_price
      ? Number(pricing.fixed_config.rental_price)
      : pricing?.auction_config?.minimum_bid
        ? Number(pricing.auction_config.minimum_bid)
        : 20000,
    beds: summary?.beds || 3,
    bathrooms: summary?.bathrooms || 2,
    size_sqft: summary?.size_sqft ? Number(summary.size_sqft) : 25,
    description: summary?.description || '',
    listing_type: summary?.listing_type,
  };

  return {
    isModalOpen,
    listingData,
    handleShareListing,
    handleModalClose,
  };
};