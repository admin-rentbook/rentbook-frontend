import { convertUnderscoreToSpace } from '@/shared/utils';
import {
  Calendar04Icon,
  ChartIncreaseIcon,
  GuestHouseIcon,
  HelpCircleIcon,
  Home01Icon,
  LegalDocument01Icon,
  MicrosoftAdminIcon,
  Notification02Icon,
  Settings01Icon,
  Wallet01Icon,
} from 'hugeicons-react';

export const Links = {
  OVERVIEW: '/overview',
  NOTIFICATIONS: '/notifications',
  VIEWING: '/viewing',
  PROPERTIES: '/properties',
  LEASES: '/leases',
  PAYMENT: '/payment',
  SETTINGS: '/settings',
  SUPPORT: '/support',
  PROPERTY_GET_STARTED: '/properties/get-started',
  CREATE_PROPERTY: '/properties/create',
  KYC: '/verify-your-account',
} as const;
export type LinkType = (typeof Links)[keyof typeof Links];

export const PROPERTY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;
export type PropertyStatusType =
  (typeof PROPERTY_STATUS)[keyof typeof PROPERTY_STATUS];
export const propertyStatusOptions = Object.values(PROPERTY_STATUS).map(
  (status) => ({
    label: convertUnderscoreToSpace(status),
    value: status,
  })
);
export const UNIT_FILTER = {
  IS_EQUAL_TO: 'IS_EQUAL_TO',
  IS_LESS_THAN: 'IS_LESS_THAN',
  IS_GREATER_THAN: 'IS_GREATER_THAN',
  PARTIALLY_LISTED: 'PARTIALLY_LISTED',
  FULLY_LISTED: 'FULLY_LISTED',
};
export const unitFilterOptions = Object.values(UNIT_FILTER).map(
  (unitFilter) => ({
    label: convertUnderscoreToSpace(unitFilter),
    value: unitFilter,
  })
);
export const LISTING_TYPE = {
  OWNER: 'owner',
  AGENT: 'agent',
} as const;
export type ListingTypes = (typeof LISTING_TYPE)[keyof typeof LISTING_TYPE];

export const sidebarItems = [
  {
    icon: Home01Icon,
    name: 'Overview',
    link: Links.OVERVIEW,
  },
  {
    icon: Notification02Icon,
    name: 'Notifications',
    link: Links.NOTIFICATIONS,
  },
  {
    icon: Calendar04Icon,
    name: 'Viewing',
    link: Links.VIEWING,
  },
  {
    icon: GuestHouseIcon,
    name: 'Properties',
    link: Links.PROPERTIES,
  },
  {
    icon: LegalDocument01Icon,
    name: 'Leases',
    link: Links.LEASES,
  },
  {
    icon: Wallet01Icon,
    name: 'Payment',
    link: Links.PAYMENT,
  },
  {
    icon: Settings01Icon,
    name: 'Settings',
    link: Links.SETTINGS,
  },
  {
    icon: HelpCircleIcon,
    name: 'Help',
    link: Links.SUPPORT,
  },
];

export const getStartedItems = [
  {
    icon: GuestHouseIcon,
    title: 'List any type of property',
    description: `Sell,rent — you’re in control of how your property works for you.`,
    color: 'text-custom-blue-400',
  },
  {
    icon: Calendar04Icon,
    title: 'Receive and manage all requests',
    description:
      'Manage viewing bookings and rental inquiries — handle it all in one place.',
    color: 'text-warning-600',
  },
  {
    icon: ChartIncreaseIcon,
    title: 'Track earnings and performance',
    description:
      'Get insights on reservations, rent, and sales — and manage your payouts easily.',
    color: 'text-success-300',
  },
  {
    icon: MicrosoftAdminIcon,
    title: `We've got your back`,
    description:
      'Fair policies, renters management tools, and secure transactions help you stay protected.',
    color: 'text-red-600',
  },
];
