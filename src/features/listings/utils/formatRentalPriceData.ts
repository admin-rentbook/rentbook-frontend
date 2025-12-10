import {
  formatForDateInput,
  isFixedPrice,
  isTimedAuction,
} from '@/shared/utils';
import { RentalPayType, type RentalPay } from '../constants';
import type { RentalPriceData, RentalPriceFormValues } from '../types';

export function formatRentalPriceForForm(data: RentalPriceFormValues) {
  const commonFields = {
    rentDuration: data.rentDuration,
    year: data.year,
    securityDeposit: data.securityDeposit,
  };
  if (data.selectType === RentalPayType.TIMED_AUCTION) {
    return {
      selectType: data.selectType,
      ...commonFields,
      bidPrice: data.bidPrice,
      bidStartDate: formatForDateInput(data.bidStartDate),
      bidEndDate: formatForDateInput(data.bidEndDate),
    };
  }
  return {
    selectType: data.selectType,
    ...commonFields,
    rentalPrice: data.rentalPrice,
  };
}

export const getDefaultRentalPriceValues = (
  type: RentalPay,
  preservedFields?: Partial<RentalPriceFormValues>,
  value?: RentalPriceData | undefined
) => {
  const commonFields = {
    rentDuration: preservedFields?.rentDuration,
    year: preservedFields?.year || '',
    securityDeposit: preservedFields?.securityDeposit,
  };
  const savedData = value?.rentPriceData;
  if (type === RentalPayType.TIMED_AUCTION) {
    const auctionDefaults =
      savedData && isTimedAuction(savedData)
        ? {
            ...commonFields,
            bidPrice: savedData.bidPrice,
            bidStartDate: savedData.bidStartDate,
            bidEndDate: savedData.bidEndDate ?? '',
            autoAcceptHighestBidder: savedData.autoAcceptHighestBidder,
            extendLastMinuteBid: savedData.extendLastMinuteBid,
          }
        : {
            bidPrice: undefined,
            bidStartDate: '',
            bidEndDate: '',
            autoAcceptHighestBidder: false,
            extendLastMinuteBid: false,
          };
    return {
      selectType: type,
      ...commonFields,
      ...auctionDefaults,
    } as RentalPriceFormValues;
  }
  const rentalPrice =
    savedData && isFixedPrice(savedData) ? savedData.rentalPrice : undefined;

  return {
    selectType: type,
    ...commonFields,
    rentalPrice,
  } as RentalPriceFormValues;
};
