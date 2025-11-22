export const UserRole = {
  PROPERTY_OWNER: 'PROPERTY_OWNER',
  TENANT: 'TENANT',
} as const;
export type UserType = (typeof UserRole)[keyof typeof UserRole];

export const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',
} as const
export type Status = (typeof STATUS)[keyof typeof STATUS];