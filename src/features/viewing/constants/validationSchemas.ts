import z from 'zod';

export const completionCodeSchema = z.object({
  completionCode: z.string().min(1, 'Please enter completion code'),
});

export const cancelReasonSchema = z.object({
  reason: z.string().min(10, 'Please provide a reason (minimum 10 characters)'),
});

export const reportIssueSchema = z.object({
  issue: z.string().min(1, 'Please select an issue'),
});

export const reportDetailsSchema = z.object({
  description: z.string().min(10, 'Please provide a description (minimum 10 characters)'),
  evidence: z.any().optional(),
});
