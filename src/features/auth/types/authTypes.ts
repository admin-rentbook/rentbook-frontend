import type z from 'zod';
import type {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  verifyEmailSchema,
} from '../constants';

export type LoginDTO = z.infer<typeof loginSchema>;
export type SignupDTO = z.infer<typeof signupSchema>;
export type VerifyEmailDTO = z.infer<typeof verifyEmailSchema>;
export type ForgotPasswordDTO = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>;
export type UserDTO = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  kyc_status: 'active' | null
};
export type AuthUser = {
  tokens: {
    access: string;
    refresh: string;
  };
  user: UserDTO;
};

export type TestimonialInfo = {
  testimony: string;
  image: string;
  fullName: string;
  location: string;
};
