import type z from 'zod';
import type { loginSchema, signupSchema, verifyEmailSchema } from '../constants';

export type LoginDTO = z.infer<typeof loginSchema>;
export type SignupDTO = z.infer<typeof signupSchema>;
export type VerifyEmailDTO = z.infer<typeof verifyEmailSchema>

export type TestimonialInfo = {
  testimony: string;
  image: string;
  fullName: string;
  location: string;
};
