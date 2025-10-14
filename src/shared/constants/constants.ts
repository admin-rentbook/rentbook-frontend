export const UserRole = {
  PROPERTY_OWNER: 'PROPERTY_OWNER',
  TENANT: 'TENANT',
} as const;
export type UserType = (typeof UserRole)[keyof typeof UserRole];
