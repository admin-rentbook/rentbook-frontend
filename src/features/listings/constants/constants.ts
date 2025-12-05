import { convertUnderscoreToSpace } from '@/shared/utils';
import { MoneyBag02Icon, Time04Icon } from 'hugeicons-react';

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

export type ListingType = (typeof ListingTypes)[keyof typeof ListingTypes];
export const listingTypeOptions = Object.values(ListingTypes).map(
  (listing) => ({
    label: convertUnderscoreToSpace(listing),
    value: listing,
  })
);

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
