import z from 'zod';
import { LISTING_TYPE } from './constants';

export const propertyInfoSchema = z.object({
  propertyName: z
    .string()
    .min(2, 'Property name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  lat: z.number(),
  lng: z.number(),
  placeId: z.string().optional(),
});

export const ownerListingSchema = z.object({
  listedBy: z.literal(LISTING_TYPE.OWNER),
});

export const agentListingSchema = z.object({
  listedBy: z.literal(LISTING_TYPE.AGENT),
  ownerName: z.string().min(2, 'Owner name must be at least 2 characters'),
  ownerEmail: z.email('Please enter a valid email address'),
  ownerPhone: z.string().min(10, 'Please enter a valid phone number'),
  agentCommission: z.number().min(0).max(100).optional(),
});

export const listingTypeSchema = z.discriminatedUnion('listedBy', [
  //discriminatedUnion handles the check for matching listing type
  ownerListingSchema,
  agentListingSchema,
]);

export const createPropertySchema = propertyInfoSchema.and(listingTypeSchema);
