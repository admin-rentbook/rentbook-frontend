import z from 'zod';

export const completionCodeSchema = z.object({
  completionCode: z.string().min(1, 'Please enter completion code'),
});
