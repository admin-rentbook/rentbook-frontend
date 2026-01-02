import { env } from '@/config';

export const url = {
  signup: env.API_BASE_URL + '/auth/register/',
  login: env.API_BASE_URL + '/auth/login/',
  verifyEmail: env.API_BASE_URL + '/auth/verify_otp/',
  forgotPassword: env.API_BASE_URL + '/auth/request_reset_otp/',
  verifyForgotPasswordEmailOtp: env.API_BASE_URL +'/auth/verify_reset_otp/',
  resetPassword: env.API_BASE_URL + '/auth/reset_password_with_otp/',
  sendOtp: env.API_BASE_URL + '/auth/send_otp/',
  googleAuth: env.API_BASE_URL + '/auth/google_login/',
  refreshToken: env.API_BASE_URL + '/auth/token/refresh/',
};
