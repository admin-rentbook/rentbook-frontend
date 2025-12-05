import z from 'zod';
import { FeeTypes, PaymentFrequency, RentalPayType } from './constants';

export const listingDescriptionSchema = z.object({
  listingTitle: z.string().min(5, 'Title must be at least 5 characters'),
  listingType: z.string().min(1, 'Select listing type'),
  noOfBeds: z
    .string()
    .min(1, 'Number of beds is required')
    .refine(
      (val) => !isNaN(Number(val)),
      'Number of beds must be a valid number'
    ),

  noOfBathrooms: z
    .string()
    .min(1, 'Number of bathrooms is required')
    .refine(
      (val) => !isNaN(Number(val)),
      'Number of bathrooms must be a valid number'
    ),

  sizeSqFt: z.string().min(1, 'Add size.sq.ft'),
  listingDescription: z
    .string()
    .min(5, 'Description must be at least 5 characters'),
});

export const createBlockSchema = z.object({
  blockName: z.string().min(1),
});

export const fixedPriceSchema = z.object({
  selectType: z.literal(RentalPayType.FIXED_PRICE),
  rentDuration: z.number().int().min(0, 'Rent duration must be at least 0'),
  year: z.string().min(1, 'Year is required'),
  securityDeposit: z.string().min(1, 'Security deposit is required'),
});

export const timedAuctionSchema = z
  .object({
    selectType: z.literal(RentalPayType.TIMED_AUCTION),
    rentDuration: z.number().int().min(1, 'Rent duration must be at least 0'),
    year: z.string().min(1, 'Year is required'),
    securityDeposit: z.string().min(1, 'Security deposit is required'),
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
  amount: z.string().min(1, 'Amount is required'),
  feeRequirement: z.enum(
    [FeeTypes.INCLUDED_IN_BASE_RENT, FeeTypes.OPTIONAL, FeeTypes.REQUIRED],
    { message: 'Fee requirement is required' }
  ),
});

export const discountValidationSchema = z.object({
  discount: z.string().min(1),
  duration: z.coerce.date(),
});
