import { useSearch } from '@tanstack/react-router';
import {
  useGetAdditionalDetails,
  useGetAdditionalFees,
  useGetAmenities,
  useGetDiscount,
  useGetFinalDetails,
  useGetListingDescription,
  useGetMedia,
  useGetRentalPricing,
  useGetViewing,
} from '../apis';

export const useReviewListing = (onNext: (() => void) | undefined) => {
  const { listingId } = useSearch({ from: '/listings-start' });

  // Fetch all listing data
  const {
    data: listingDescriptionData,
    isPending: isLoadingDescription,
    isFetching: isFetchingDescription,
  } = useGetListingDescription(listingId as number);

  const {
    data: amenitiesData,
    isPending: isLoadingAmenities,
    isFetching: isFetchingAmenities,
  } = useGetAmenities(listingId as number);

  const {
    data: mediaData,
    isPending: isLoadingMedia,
    isFetching: isFetchingMedia,
  } = useGetMedia(listingId as number);

  const {
    data: rentalPricingData,
    isPending: isLoadingRentalPricing,
    isFetching: isFetchingRentalPricing,
  } = useGetRentalPricing(listingId as number);

  const {
    data: viewingData,
    isPending: isLoadingViewing,
    isFetching: isFetchingViewing,
  } = useGetViewing(listingId as number);

  const {
    data: additionalFeesData,
    isPending: isLoadingAdditionalFees,
    isFetching: isFetchingAdditionalFees,
  } = useGetAdditionalFees(listingId as number);

  const {
    data: discountData,
    isPending: isLoadingDiscount,
    isFetching: isFetchingDiscount,
  } = useGetDiscount(listingId as number);

  const {
    data: finalDetailsData,
    isPending: isLoadingFinalDetails,
    isFetching: isFetchingFinalDetails,
  } = useGetFinalDetails(listingId as number);

  const {
    data: additionalDetailsData,
    isPending: isLoadingAdditionalDetails,
    isFetching: isFetchingAdditionalDetails,
  } = useGetAdditionalDetails(listingId as number);

  // Calculate overall loading states
  const isLoading =
    isLoadingDescription ||
    isLoadingAmenities ||
    isLoadingMedia ||
    isLoadingRentalPricing ||
    isLoadingViewing ||
    isLoadingAdditionalFees ||
    isLoadingDiscount ||
    isLoadingFinalDetails ||
    isLoadingAdditionalDetails;

  const isFetching =
    isFetchingDescription ||
    isFetchingAmenities ||
    isFetchingMedia ||
    isFetchingRentalPricing ||
    isFetchingViewing ||
    isFetchingAdditionalFees ||
    isFetchingDiscount ||
    isFetchingFinalDetails ||
    isFetchingAdditionalDetails;

  const handleReviewSubmit = () => {
    onNext?.();
  };

  return {
    // Return raw API data
    listingDescription: listingDescriptionData?.data,
    amenities: amenitiesData?.data,
    media: mediaData?.data,
    rentalPricing: rentalPricingData?.data,
    viewing: viewingData?.data,
    additionalFees: additionalFeesData?.data,
    discount: discountData?.data,
    finalDetails: finalDetailsData?.data,
    additionalDetails: additionalDetailsData?.data,
    
    isLoading,
    isFetching,
    handleReviewSubmit,
    
    // Return individual loading states for granular control
    loadingStates: {
      description: isLoadingDescription || isFetchingDescription,
      amenities: isLoadingAmenities || isFetchingAmenities,
      media: isLoadingMedia || isFetchingMedia,
      rentalPrice: isLoadingRentalPricing || isFetchingRentalPricing,
      viewing: isLoadingViewing || isFetchingViewing,
      additionalFees: isLoadingAdditionalFees || isFetchingAdditionalFees,
      discount: isLoadingDiscount || isFetchingDiscount,
      finalDetails: isLoadingFinalDetails || isFetchingFinalDetails,
      additionalDetails: isLoadingAdditionalDetails || isFetchingAdditionalDetails,
    },
  };
};
