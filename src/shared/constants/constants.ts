import { Links } from "@/features/landing-page/constants";
import { GuestHouseIcon, HelpCircleIcon } from "hugeicons-react";

export const UserRole = {
  PROPERTY_OWNER: 'PROPERTY_OWNER',
  TENANT: 'TENANT',
} as const;
export type UserType = (typeof UserRole)[keyof typeof UserRole];

export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  AVAILABLE: 'available',
  DRAFT: 'draft',
  UNAVAILABLE: 'unavailable',
  SUBMITTED: 'submitted'
} as const
export type Status = (typeof STATUS)[keyof typeof STATUS];

export const menuItems = [
  {
    name: 'List on rentbook',
    icon: GuestHouseIcon,
    link: Links.PROPERTIES,
  },
  {
    name: 'Help',
    icon: HelpCircleIcon,
    link: Links.PROPERTIES,
  },
];