import z from 'zod';

export const createPropertyValSchema = z.object({
  propertyName: z
    .string()
    .min(2, 'Property name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
});
