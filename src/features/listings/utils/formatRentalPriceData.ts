import {
  formatForDateInput,
  isFixedPrice,
  isTimedAuction,
} from '@/shared/utils';
import { RentalPayType, type RentalPay } from '../constants';
import type { RentalPricingDTO } from '../types/listing.dtos';
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

export function transformDTOToFormValues(
  dto: RentalPricingDTO
): RentalPriceFormValues {
  const paymentMethod = dto.payment_method.toLowerCase();

  const toNumber = (value: number | string | undefined): number => {
    if (value === undefined) return 0;
    return typeof value === 'string' ? parseFloat(value) : value;
  };

  const commonFields = {
    rentDuration: dto.rent_duration,
    year: dto.rent_period.toUpperCase(),
    securityDeposit: toNumber(dto.security_deposit),
  };

  if (paymentMethod === 'fixed' && dto.fixed_config) {
    return {
      selectType: RentalPayType.FIXED_PRICE,
      ...commonFields,
      rentalPrice: toNumber(dto.fixed_config.rental_price),
    };
  } else if ((paymentMethod === 'timed' || paymentMethod === 'timed_auction') && dto.auction_config) {
    return {
      selectType: RentalPayType.TIMED_AUCTION,
      ...commonFields,
      bidPrice: toNumber(dto.auction_config.minimum_bid),
      bidStartDate: formatForDateInput(dto.auction_config.bid_start),
      bidEndDate: formatForDateInput(dto.auction_config.bid_end),
      autoAcceptHighestBidder: dto.bidding_rules?.auto_accept_highest || false,
      extendLastMinuteBid: dto.bidding_rules?.extend_if_bid_in_last_24h || false,
    };
  }

  return {
    selectType: RentalPayType.FIXED_PRICE,
    rentDuration: dto.rent_duration,
    year: dto.rent_period.toUpperCase(),
    securityDeposit: toNumber(dto.security_deposit),
    rentalPrice: toNumber(dto.fixed_config?.rental_price),
  } as RentalPriceFormValues;
}
