import { useSearch } from '@tanstack/react-router';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/shared/components';
import { useAdditionalFee, useDiscount } from '../../hooks';
import { AdditionalFeeBox } from '../shared';
import { AdditionalPriceSetting } from './AdditinalPriceSettings';
import { AdditionalFeeCard } from './AdditionalFeeCard';
import { DiscountCard } from './Discount';

export const AdditionalPrice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDiscount, setIsOpenDiscount] = useState(false);
  const { listingId } = useSearch({ strict: false }) as { listingId?: number };
  const {
    form,
    onSubmit,
    isButtonDisabled,
    additionalFees,
    isLoadingAddFee,
    isLoadingFees,
    isFetchingFees,
    handleDeleteAllFees,
    isDeleting,
  } = useAdditionalFee(setIsOpen, listingId as number);
  const {
    formDiscount,
    isButtonDisabledDiscount,
    onSubmitDiscount,
    isLoadingAddDis,
    isLoadingDiscount,
    isFetchingDiscount,
  } = useDiscount(setIsOpenDiscount, listingId as number);

  return (
    <>
      <div className="flex flex-col gap-6 pt-4">
        <div className="flex flex-col">
          <h1 className="text-heading-3-semibold text-black-500 leading-snug">
            Additional price settings
          </h1>
          <p className="text-body-base-normal text-black-400">
            Add additional cost. These details help renters know the real cost
            of renting your property before they apply.
          </p>
        </div>
        <AdditionalFeeCard setIsOpen={setIsOpen} />

        {/* Loading state for fetching discount */}
        {isLoadingDiscount || isFetchingDiscount ? (
          <div className="flex items-center justify-center py-8 rounded-[1.25em] bg-sidebar">
            <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
            <p className="ml-2 text-body text-black-400">Loading discount...</p>
          </div>
        ) : (
          <DiscountCard
            isButtonDisabled={isButtonDisabledDiscount}
            form={formDiscount}
            isOpen={isOpenDiscount}
            onSubmit={onSubmitDiscount}
            setIsOpen={setIsOpenDiscount}
            isLoadingAddDis={isLoadingAddDis}
          />
        )}
      </div>
      <div className="flex flex-col gap-6">
        <AdditionalPriceSetting
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          form={form}
          onSubmit={onSubmit}
          isButtonDisabled={isButtonDisabled}
          isLoadingAddFee={isLoadingAddFee}
        />
        <div className="w-full h-[1px] bg-custom-gray-600" />

        {isLoadingFees || isFetchingFees ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
            <p className="ml-2 text-body text-black-400">
              Loading additional fees...
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {additionalFees.length > 0 ? (
              <>
                <div className="flex justify-between items-center">
                  <p className="text-body-medium text-black-500">
                    Added Fees ({additionalFees.length})
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeleteAllFees}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-2" />
                      </>
                    )}
                  </Button>
                </div>
                {additionalFees.map((fee) => (
                  <AdditionalFeeBox additionalFee={fee} key={fee.feeName} />
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-body text-black-400">
                  No additional fees added yet
                </p>
                <p className="text-body-sm text-black-300">
                  Click "Add fee" to get started
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
