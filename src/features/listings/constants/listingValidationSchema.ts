import z from 'zod';

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
