import { useEffect, useState } from 'react';
import { useGetAdditionalFees, useUpdateAdditionalFees } from '../apis';
import type { AdditionalFeeFormValues } from '../types';
import { transformAdditionalFeesDTOToFormValues } from '../types/mappedTypes';
import { FeeTypes, PaymentFrequency } from '../constants';

type OptionalFeeKey = 'water' | 'levies' | 'cooperative' | 'electricity';

type OptionalFeesState = Record<OptionalFeeKey, boolean>;

export const useOptionalFees = (listingId: number) => {
  const [optionalFeesState, setOptionalFeesState] = useState<OptionalFeesState>({
    water: false,
    levies: false,
    cooperative: false,
    electricity: false,
  });
  const [isTogglingFee, setIsTogglingFee] = useState<OptionalFeeKey | null>(null);

  const { data: additionalFeesData } = useGetAdditionalFees(listingId);
  const updateAdditionalFeesMutation = useUpdateAdditionalFees();

  // Initialize state from API data
  useEffect(() => {
    if (additionalFeesData?.data) {
      const formValues = transformAdditionalFeesDTOToFormValues(
        additionalFeesData.data
      );

      const newState: OptionalFeesState = {
        water: false,
        levies: false,
        cooperative: false,
        electricity: false,
      };

      formValues.forEach((fee) => {
        const lowerName = fee.feeName.toLowerCase();
        if (lowerName === 'water') newState.water = true;
        else if (lowerName === 'levies') newState.levies = true;
        else if (lowerName.includes('co-operative') || lowerName.includes('cooperative'))
          newState.cooperative = true;
        else if (lowerName === 'electricity') newState.electricity = true;
      });

      setOptionalFeesState(newState);
    }
  }, [additionalFeesData]);

  const toggleOptionalFee = (key: OptionalFeeKey, feeName: string) => {
    const isCurrentlyEnabled = optionalFeesState[key];
    setIsTogglingFee(key);

    // Get current additional fees
    const currentFees = additionalFeesData?.data
      ? transformAdditionalFeesDTOToFormValues(additionalFeesData.data)
      : [];

    let updatedFees: AdditionalFeeFormValues[];

    if (isCurrentlyEnabled) {
      // Remove the fee
      updatedFees = currentFees.filter(
        (fee) => fee.feeName.toLowerCase() !== feeName.toLowerCase()
      );
    } else {
      // Add the fee
      const newFee: AdditionalFeeFormValues = {
        feeName,
        paymentFrequency: PaymentFrequency.ONE_TIME,
        amount: undefined,
        feeRequirement: FeeTypes.INCLUDED_IN_BASE_RENT,
      };
      updatedFees = [...currentFees, newFee];
    }

    // Call API to update fees
    updateAdditionalFeesMutation.mutate(
      {
        fees: updatedFees,
        listingId,
      },
      {
        onSuccess: () => {
          // Update local state
          setOptionalFeesState((prev) => ({
            ...prev,
            [key]: !isCurrentlyEnabled,
          }));
          setIsTogglingFee(null);
        },
        onError: () => {
          setIsTogglingFee(null);
        },
      }
    );
  };

  return {
    optionalFeesState,
    toggleOptionalFee,
    isTogglingFee,
  };
};