import { useGetPropertyDetailsById } from '@/features/property-owners/apis/requests';
import { Links } from '@/features/property-owners/constants';
import { convertUnderscoreToSpace } from '@/shared/utils';
import { returnStatus } from '@/shared/utils/helpers';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';

type SetOpenComplex = React.Dispatch<React.SetStateAction<boolean>>;

export const usePropertyDetails = (
  setOpenCreateComplex: SetOpenComplex,
  setOpenAddAgent: SetOpenComplex,
  setOpenDeactivateProperty: SetOpenComplex
) => {
  const navigate = useNavigate();

  const { propertyId, showListingLiveModal, listingId } = useSearch({
    from: '/property-details',
  });

  const {
    data: propertyData,
    isLoading,
    error,
    isError,
    refetch,
  } = useGetPropertyDetailsById(propertyId!);

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
    setOpenCreateComplex(true);
  }, [propertyId]);

  const handleAddAgent = useCallback(() => {
    setOpenAddAgent(true);
  }, [propertyId]);

  const handleEditProperty = useCallback(() => {
    navigate({
      to: Links.EDIT_PROPERTY,
      search: (prev) => ({
        propertyId: prev.propertyId as number,
      }),
    });
  }, [propertyId, navigate]);

  const handleDeactivateProperty = useCallback(() => {
    setOpenDeactivateProperty(true);
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
    isError,
    refetch,
    handlers: {
      handleCreateComplex,
      handleAddAgent,
      handleEditProperty,
      handleDeactivateProperty,
      handleBackToProperties,
    },
  };
};
