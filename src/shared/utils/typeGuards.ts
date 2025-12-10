
import { RentalPayType, RentAvailabilityTypes } from "@/features/listings/constants";
import type { RentalPriceFormValues, RentAvailabilityFormValues } from "@/features/listings/types";


export function isFixedPrice(
  data: RentalPriceFormValues
): data is Extract<RentalPriceFormValues, { selectType: 'FIXED_PRICE' }> {
  return data.selectType === RentalPayType.FIXED_PRICE;
}

export function isTimedAuction(
  data: RentalPriceFormValues
): data is Extract<RentalPriceFormValues, { selectType: 'TIMED_AUCTION' }> {
  return data.selectType === RentalPayType.TIMED_AUCTION;
}

export function isAvailableNow(
  data: RentAvailabilityFormValues
): data is Extract<RentAvailabilityFormValues, { rentAvailability: 'AVAILABLE_NOW' }> {
  return data.rentAvailability === RentAvailabilityTypes.AVAILABLE_NOW;
}

export function isAvailableLater(
  data: RentAvailabilityFormValues
): data is Extract<RentAvailabilityFormValues, { rentAvailability: 'AVAILABLE_LATER' }> {
  return data.rentAvailability === RentAvailabilityTypes.AVAILABLE_LATER;
}

