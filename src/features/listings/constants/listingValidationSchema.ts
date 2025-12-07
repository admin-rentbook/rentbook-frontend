import z from 'zod';
import {
  BookViewingTypes,
  FeeTypes,
  PaymentFrequency,
  RentalPayType,
  RentAvailabilityTypes,
} from './constants';

export const listingDescriptionSchema = z.object({
  listingTitle: z.string().min(5, 'Title must be at least 5 characters'),
  listingType: z.string().min(1, 'Select listing type'),
  noOfBeds: z
    .number()
    .int()
    .min(1, 'Number of beds must be at least 1')
    .optional(),

  noOfBathrooms: z
    .number()
    .int()
    .min(1, 'Number of baths must be at least 1')
    .optional(),
  sizeSqFt: z.number().min(1, 'Size must be at least 1 sq.ft').optional(),
  listingDescription: z
    .string()
    .min(5, 'Description must be at least 5 characters'),
});

export const createBlockSchema = z.object({
  blockName: z.string().min(1),
});

export const fixedPriceSchema = z.object({
  selectType: z.literal(RentalPayType.FIXED_PRICE),
  rentalPrice: z
    .number()
    .min(1, 'Bid Price must be at least N$1.00')
    .optional()
    .or(z.literal(undefined)),
  rentDuration: z
    .number()
    .int()
    .min(1, 'Rent duration must be at least 1')
    .optional()
    .or(z.literal(undefined)),
  year: z.string().min(1, 'Year is required'),
  securityDeposit: z
    .number()
    .int()
    .min(1, 'Size.sq.ft must be at least 1')
    .optional()
    .or(z.literal(undefined)),
});

export const timedAuctionSchema = z
  .object({
    selectType: z.literal(RentalPayType.TIMED_AUCTION),
    bidPrice: z
      .number()
      .min(1, 'Bid Price must be at least N$1.00')
      .optional()
      .or(z.literal(undefined)),
    rentDuration: z
      .number()
      .int()
      .min(1, 'Rent duration must be at least 1')
      .optional()
      .or(z.literal(undefined)),
    year: z.string().min(1, 'Year is required'),
    securityDeposit: z.number().min(0, 'Deposit cannot be negative').optional(),
    bidStartDate: z.coerce.date(),
    bidEndDate: z.coerce.date(),
    autoAcceptHighestBidder: z.boolean().default(false),
    extendLastMinuteBid: z.boolean().default(false),
  })
  .refine((data) => data.bidEndDate > data.bidStartDate, {
    message: 'End date must be after start date',
    path: ['bidEndDate'],
  });

export const rentalPriceSchema = z.discriminatedUnion('selectType', [
  fixedPriceSchema,
  timedAuctionSchema,
]);
export const additionalFeeValSchema = z.object({
  feeName: z.string().min(1, 'Fee name is required'),
  paymentFrequency: z.enum(
    [
      PaymentFrequency.WEEKLY,
      PaymentFrequency.MONTHLY,
      PaymentFrequency.ANNUALLY,
    ],
    { message: 'Payment Frequency is required' }
  ),
  amount: z
    .number()
    .int()
    .min(1, 'Amount must be at least N$1.00')
    .optional()
    .or(z.literal(undefined)),
  feeRequirement: z.enum(
    [FeeTypes.INCLUDED_IN_BASE_RENT, FeeTypes.OPTIONAL, FeeTypes.REQUIRED],
    { message: 'Fee requirement is required' }
  ),
});

export const discountValidationSchema = z.object({
  discount: z
    .number()
    .min(0, 'Discount cannot be negative')
    .max(100, 'Discount cannot exceed 100%'),
  duration: z.coerce.date(),
});

export const viewFeeSchema = z.object({
  bookViewingType: z.enum([
    BookViewingTypes.BOOK_INSTANTLY,
    BookViewingTypes.REVIEW_AND_CONFIRM,
  ]),
  viewingFee: z
    .number()
    .min(1, 'Viewing fee must be at least N$1.00')
    .optional()
    .or(z.literal(undefined)),
});

export const rentAvailabilitySchema = z.discriminatedUnion('rentAvailability', [
  z.object({
    rentAvailability: z.literal(RentAvailabilityTypes.AVAILABLE_NOW),
  }),
  z.object({
    rentAvailability: z.literal(RentAvailabilityTypes.AVAILABLE_LATER),
    listingDate: z.coerce.date(),
  }),
]);

export const addNoteSchema = z.object({
  noteTitle: z.string().min(3, 'Title must be at least 3 characters'),
  noteDescription: z.string().min(5, 'Description must be at least 5 characters'),
});