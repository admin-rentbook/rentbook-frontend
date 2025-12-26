import { formatDateForInput } from '@/shared/utils';
import { BookViewingTypes, ViewingTypes } from '../../constants';
import type {
  AdditionalFeeDTO,
  DiscountDTO,
  ListingDescriptionDTO,
  ViewingDTO,
} from '../listing.dtos';
import type {
  AdditionalFeeFormValues,
  DaySchedule,
  DiscountFormValues,
  RentalPriceFormValues,
  TimeSlot,
  ViewFeeFormValues,
  ViewTimesData,
} from '../listingTypes';

export const mapListingDescriptionDtoToDraft = (
  dto?: ListingDescriptionDTO
) => {
  if (!dto) return undefined;

  return {
    listingTitle: dto.title,
    listingType: dto.listing_type,
    listingDescription: dto.description,
    noOfBeds: dto.beds,
    noOfBathrooms: dto.bathrooms,
    sizeSqFt: dto.size_sqft,
    blockId: dto.complex?.id,
    blockName: dto.complex?.name,
    isAddListingToComplex: Boolean(dto.complex),
  };
};

export const transformFormToDTO = (
  fees: AdditionalFeeFormValues[]
): { fees: AdditionalFeeDTO[] } => {
  return {
    fees: fees.map((fee) => ({
      name: fee.feeName,
      amount: fee.amount?.toString() || '0',
      frequency: fee.paymentFrequency.toLowerCase(),
      condition: fee.feeRequirement.toLowerCase().replace(/_/g, ' '),
    })),
  };
};

export function transformAdditionalFeesDTOToFormValues(
  fees: AdditionalFeeDTO[]
): AdditionalFeeFormValues[] {
  if (!fees || fees.length === 0) {
    return [];
  }

  return fees.map((fee) => ({
    feeName: fee.name,
    amount: parseFloat(fee.amount),
    paymentFrequency:
      fee.frequency.toUpperCase() as AdditionalFeeFormValues['paymentFrequency'],
    feeRequirement: fee.condition
      .toUpperCase()
      .replace(/ /g, '_') as AdditionalFeeFormValues['feeRequirement'],
  }));
}

export const transformDiscountFormToDTO = (
  discount: DiscountFormValues
): { discounts: DiscountDTO[] } => {
  return {
    discounts: [
      {
        percent: discount.discount.toString(),
        end_date: new Date(discount.duration as Date).toISOString(),
      },
    ],
  };
};

export function transformDiscountDTOToFormValues(
  data: DiscountDTO[] | DiscountDTO
): DiscountFormValues | null {
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return null;
    }
    const firstDiscount = data[0];
    return {
      discount:
        typeof firstDiscount.percent === 'string'
          ? parseFloat(firstDiscount.percent)
          : firstDiscount.percent,
      duration: formatDateForInput(firstDiscount.end_date),
    };
  }

  if (data) {
    return {
      discount:
        typeof data.percent === 'string'
          ? parseFloat(data.percent)
          : data.percent,
      duration: formatDateForInput(data.end_date),
    };
  }

  return null;
}

export const transformRentalPriceFormToDTO = (
  data: RentalPriceFormValues
): any => {
  const paymentMethod = data.selectType === 'FIXED_PRICE' ? 'fixed' : 'timed_auction';

  const rentPeriod = data.year.toLowerCase();

  const basePayload = {
    payment_method: paymentMethod,
    rent_duration: data.rentDuration as number,
    rent_period: rentPeriod,
    security_deposit: data.securityDeposit as number,
  };

  if (data.selectType === 'FIXED_PRICE') {
    return {
      ...basePayload,
      fixed_config: {
        rental_price: data.rentalPrice as number,
      },
    };
  } else {
    return {
      ...basePayload,
      auction_config: {
        minimum_bid: (data.bidPrice as number) || 0,
        bid_start: data.bidStartDate as string,
        bid_end: data.bidEndDate as string,
      },
      bidding_rules: {
        auto_accept_highest: data.autoAcceptHighestBidder || false,
        extend_if_bid_in_last_24h: data.extendLastMinuteBid || false,
      },
    };
  }
};

// Helper to convert ISO time string to HH:mm format
const formatTimeFromISO = (isoTime: string): string => {
  if (!isoTime) return '';
  const date = new Date(isoTime);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Helper to convert day abbreviation from backend to frontend format
const mapDayFromBackend = (day: string): string => {
  const dayMap: Record<string, string> = {
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    sun: 'Sun',
  };
  return dayMap[day.toLowerCase()] || day;
};

// Helper to convert day from frontend to backend format
const mapDayToBackend = (day: string): string => {
  return day.toLowerCase().substring(0, 3);
};

export function transformViewingDTOToFormValues(
  dto: ViewingDTO
): ViewTimesData {
  const toNumber = (value: number | string | undefined): number => {
    if (value === undefined) return 0;
    return typeof value === 'string' ? parseFloat(value) : value;
  };

  // Transform availability array to DaySchedule object
  const viewingTimesData: DaySchedule = {};

  if (dto.availability && Array.isArray(dto.availability)) {
    dto.availability.forEach((slot, index) => {
      const day = mapDayFromBackend(slot.day);
      if (!viewingTimesData[day]) {
        viewingTimesData[day] = [];
      }
      viewingTimesData[day].push({
        id: `${day}-${index}`,
        startTime: formatTimeFromISO(slot.start_time),
        endTime: formatTimeFromISO(slot.end_time),
      });
    });
  }

  // Map booking_mode to BookViewingType
  const bookingModeMap: Record<string, typeof BookViewingTypes[keyof typeof BookViewingTypes]> = {
    instant: BookViewingTypes.BOOK_INSTANTLY,
    review: BookViewingTypes.REVIEW_AND_CONFIRM,
  };

  const viewingFee: ViewFeeFormValues = {
    bookViewingType: bookingModeMap[dto.booking_mode] || BookViewingTypes.REVIEW_AND_CONFIRM,
    viewingFee: toNumber(dto.viewing_fee),
  };

  // Map is_available to ViewingType
  const viewingType = dto.is_available
    ? ViewingTypes.VIEWING_AVAILABLE
    : ViewingTypes.VIEWING_NOT_AVAILABLE;

  return {
    viewingTimesData,
    viewingType,
    viewingFee,
  };
}

export const transformViewingFormToDTO = (data: ViewTimesData): any => {
  // Convert DaySchedule to availability array
  const availability: Array<{
    day: string;
    start_time: string;
    end_time: string;
  }> = [];

  if (data.viewingTimesData) {
    Object.entries(data.viewingTimesData).forEach(([day, slots]) => {
      slots.forEach((slot: TimeSlot) => {
        // Convert HH:mm to ISO time string (using today's date as base)
        const today = new Date().toISOString().split('T')[0];
        availability.push({
          day: mapDayToBackend(day),
          start_time: `${today}T${slot.startTime}:00.000Z`,
          end_time: `${today}T${slot.endTime}:00.000Z`,
        });
      });
    });
  }

  // Map BookViewingType to booking_mode
  const bookingModeMap: Record<string, 'instant' | 'review'> = {
    [BookViewingTypes.BOOK_INSTANTLY]: 'instant',
    [BookViewingTypes.REVIEW_AND_CONFIRM]: 'review',
  };

  const bookingMode = data.viewingFee?.bookViewingType
    ? bookingModeMap[data.viewingFee.bookViewingType]
    : 'review';

  return {
    is_available: data.viewingType === ViewingTypes.VIEWING_AVAILABLE,
    time_zone: 'Africa/Windhoek', // Default timezone
    viewing_fee: data.viewingFee?.viewingFee || 0,
    booking_mode: bookingMode,
    availability,
  };
};
