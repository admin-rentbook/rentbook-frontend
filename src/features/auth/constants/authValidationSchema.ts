import z from 'zod';

export const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string(),
});

export const signupSchema = z.object({
  email: z.email('Please enter a valid email address'),
  fullName: z.string().min(5, 'Please enter a valid full name'),
  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const verifyEmailSchema = z.object({
  verificationCode: z
    .string()
    .regex(/^\d{6}$/, 'Verification code must be exactly 6 digits'),
});