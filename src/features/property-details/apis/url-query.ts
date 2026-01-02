import { env } from '@/config';

export const url = {
  resendVerification: (propertyId: number) =>
    `${env.API_BASE_URL}/properties/${propertyId}/resend-verification/`,
};

export const queryKey = {
  all: ['property-details'] as const,
};
