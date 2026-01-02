import { useGetPropertyDetailsById } from '@/features/property-owners/apis/requests';
import { Links } from '@/features/property-owners/constants';
import { convertUnderscoreToSpace } from '@/shared/utils';
import { returnStatus } from '@/shared/utils/helpers';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';

export const usePropertyDetails = () => {
  const navigate = useNavigate();

  const { propertyId, showListingLiveModal, listingId } = useSearch({
    from: '/property-details',
  });

  const { data: propertyData, isLoading, error } = useGetPropertyDetailsById(propertyId!);

  const displayData = useMemo(() => {
    if (!propertyData) {
      return {
        displayName: '',
        displayAddress: '',
        status: 'active',
        statusText: '',
        statusDetails: {
          bgColor: '',
          textColor: '',
          fillColor: '',
        },
      };
    }

    const displayName = propertyData.property_name;
    const displayAddress = propertyData.address?.street_name
      ? `${propertyData.address.street_name}, ${propertyData.address.city || ''}`
      : propertyData.address?.formatted_address || '';
    const status = propertyData.approval_status || 'active';
    const statusDetails = returnStatus(status);

    return {
      displayName,
      displayAddress,
      status,
      statusDetails,
      statusText: convertUnderscoreToSpace(status),
    };
  }, [propertyData]);

  const handleCreateComplex = useCallback(() => {
    console.log('Create complex for property:', propertyId);
  }, [propertyId]);

  const handleAddAgent = useCallback(() => {
    console.log('Add agent for property:', propertyId);
    // TODO: Navigate to add agent page or open modal
  }, [propertyId]);

  const handleEditProperty = useCallback(() => {
    navigate({
      to: Links.PROPERTIES,
      search: { propertyId },
    });
  }, [propertyId, navigate]);

  const handleDeactivateProperty = useCallback(() => {
    console.log('Deactivate property:', propertyId);
    // TODO: Show confirmation modal and call deactivate API
  }, [propertyId]);

  const handleBackToProperties = useCallback(() => {
    navigate({ to: Links.PROPERTIES });
  }, [navigate]);

  return {
    propertyData,
    isLoading,
    error,
    propertyId,
    listingId,
    showListingLiveModal,
    displayData,
    handlers: {
      handleCreateComplex,
      handleAddAgent,
      handleEditProperty,
      handleDeactivateProperty,
      handleBackToProperties,
    },
  };
};
