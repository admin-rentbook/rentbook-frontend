import { convertUnderscoreToSpace } from '@/shared/utils';
import {
  CalendarBlock01Icon,
  CalendarCheckOut01Icon,
  CalendarFavorite01Icon,
  CalendarLock01Icon,
  CheckmarkCircle01Icon,
  EnergyIcon,
  MoneyBag02Icon,
  Time04Icon,
} from 'hugeicons-react';

export const ListingLinks = {
  LISTINGS_GET_STARTED: '/listings/get-started',
  LISTINGS: '/listings-start',
} as const;
export type ListingLinkType = (typeof ListingLinks)[keyof typeof ListingLinks];

export const ListingTypes = {
  HOUSE: 'HOUSE',
  APARTMENT: 'APARTMENT',
  TOWNHOUSE: 'TOWNHOUSE',
};
export type ListingType = (typeof ListingTypes)[keyof typeof ListingTypes];
export const listingTypeOptions = Object.values(ListingTypes).map(
  (listing) => ({
    label: convertUnderscoreToSpace(listing),
    value: listing,
  })
);

export const FeeTypes = {
  INCLUDED_IN_BASE_RENT: 'INCLUDED_IN_BASE_RENT',
  REQUIRED: 'REQUIRED',
  OPTIONAL: 'OPTIONAL',
};
export const PaymentFrequency = {
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  ANNUALLY: 'ANNUALLY',
};
export const RentalPayType = {
  FIXED_PRICE: 'FIXED_PRICE',
  TIMED_AUCTION: 'TIMED_AUCTION',
} as const;
export type RentalPay = (typeof RentalPayType)[keyof typeof RentalPayType];

export const ViewingTypes = {
  VIEWING_AVAILABLE: 'VIEWING_AVAILABLE',
  VIEWING_NOT_AVAILABLE: 'VIEWING_NOT_AVAILABLE',
} as const;
export type ViewingType = (typeof ViewingTypes)[keyof typeof ViewingTypes];

export const BookViewingTypes = {
  BOOK_INSTANTLY: 'BOOK_INSTANTLY',
  REVIEW_AND_CONFIRM: 'REVIEW_AND_CONFIRM',
} as const;
export type BookViewingType =
  (typeof BookViewingTypes)[keyof typeof BookViewingTypes];

export const RentAvailabilityTypes = {
  AVAILABLE_NOW: 'AVAILABLE_NOW',
  AVAILABLE_LATER: 'AVAILABLE_LATER',
} as const;
export type RentAvailabilityType =
  (typeof RentAvailabilityTypes)[keyof typeof RentAvailabilityTypes];



export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
];

export const DEFAULT_AMENITIES = [
  'POOL',
  'PARKING_LOT',
  'FITNESS_CENTER',
  'TENNIS_COURT',
  'BASKETBALL_COURT',
  'ATTACHED_GARAGE',
  'BALCONY_OR_DECK',
  'EV_CHARGING_STATION',
  'FURNISHED',
];

export const rentalPaymentTypes = [
  {
    icon: MoneyBag02Icon,
    name: 'Fixed Price',
    value: RentalPayType.FIXED_PRICE,
    description:
      'Set how much tenants will pay and how often — monthly, yearly, or short-term.',
    bgColor: 'bg-orange-100',
    color: 'text-orange-500',
  },
  {
    icon: Time04Icon,
    name: 'Timed auction',
    value: RentalPayType.TIMED_AUCTION,
    description: 'Let tenants bid for this property within a set period',
    bgColor: 'bg-primary-100',
    color: 'text-primary-500',
  },
];

export const viewingTypes = [
  {
    icon: CalendarCheckOut01Icon,
    name: 'Viewing is available',
    value: ViewingTypes.VIEWING_AVAILABLE,
    description: 'Renters will be able to book viewings based on your schedule',
    bgColor: 'bg-orange-100',
    color: 'text-orange-500',
  },
  {
    icon: CalendarBlock01Icon,
    name: 'Viewing is not available',
    value: ViewingTypes.VIEWING_NOT_AVAILABLE,
    description: 'Renters will not be able to book for viewings',
    bgColor: 'bg-primary-100',
    color: 'text-primary-500',
  },
];
export const bookViewingTypes = [
  {
    icon: EnergyIcon,
    name: 'Book instantly',
    value: BookViewingTypes.BOOK_INSTANTLY,
    subHeader: 'Recommended',
    description:
      'Renters directly book a time from the availability provided on your listing without approval',
    bgColor: 'bg-orange-100',
    color: 'text-orange-500',
  },
  {
    icon: CheckmarkCircle01Icon,
    name: 'Review and confirm',
    value: BookViewingTypes.REVIEW_AND_CONFIRM,
    description:
      'Renters request a time from the availability on your listing, then you confirm or decline.',
    bgColor: 'bg-primary-100',
    color: 'text-primary-500',
  },
];

export const rentAvailabilityItems = [
  {
    icon: CalendarFavorite01Icon,
    name: 'Available now',
    value: RentAvailabilityTypes.AVAILABLE_NOW,
    description:
      'Renters will be able to book, tours and make payment for this listing',
    bgColor: 'bg-orange-100',
    color: 'text-orange-500',
  },
  {
    icon: CalendarLock01Icon,
    name: 'Available later',
    value: RentAvailabilityTypes.AVAILABLE_LATER,
    description:
      'Renters will be able to see this property and add join a waitlist',
    bgColor: 'bg-primary-100',
    color: 'text-primary-500',
  },
];

export const feeTypes = [
  {
    label: 'Included in base rent',
    value: FeeTypes.INCLUDED_IN_BASE_RENT,
  },
  {
    label: 'Required',
    value: FeeTypes.REQUIRED,
  },
  {
    label: 'Optional',
    value: FeeTypes.OPTIONAL,
  },
];

export const paymentFreqOptions = [
  {
    label: 'Weekly',
    value: PaymentFrequency.WEEKLY,
  },
  {
    label: 'Monthly',
    value: PaymentFrequency.MONTHLY,
  },
  {
    label: 'Annually',
    value: PaymentFrequency.ANNUALLY,
  },
];

export const bidRuleSwitchItems = [
  {
    title: 'Automatically accept highest bidder when bidding ends',
    name: 'autoAcceptHighestBidder',
  },
  {
    title:
      'If a bid is placed within the last 24 hours, extend the duration by 30 days',
    name: 'extendLastMinuteBid',
  },
];
