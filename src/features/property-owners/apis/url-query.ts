import { env } from '@/config';
import type { PropertyStatusType } from '../constants';

export const url = {
  createProperty: env.API_BASE_URL + '/properties/create/',
  updateProperty: (propertyId: number) =>
    env.API_BASE_URL + `/properties/${propertyId}/`,
  getProperties: env.API_BASE_URL + '/properties/my-properties/',
  getPropertyDetails: env.API_BASE_URL + '/',
  getPropertyDetailsById: (propertyId: number) =>
    env.API_BASE_URL + `/properties/${propertyId}/`,
  kyc: env.API_BASE_URL + '/kyc',
  kycStatus: env.API_BASE_URL + '/kyc/status/',
  storage: env.API_BASE_URL + '/storage',
};

export const queryKey = {
  all: ['property'] as const,
  lists: () => [...queryKey.all, 'list'] as const,
  list: (filter: PropertyStatusType, page: number, pageSize: number) =>
    [...queryKey.lists(), filter, page, pageSize] as const,
  kyc: ['kyc'] as const,
  kycStatus: () => [...queryKey.kyc, 'status'] as const,
};
