import {
  Calendar04Icon,
  ChartIncreaseIcon,
  Comment02Icon,
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
  CALENDAR: '/calendar',
  MESSAGES: '/messages',
  PROPERTIES: '/properties',
  LEASES: '/leases',
  PAYMENT: '/payment',
  SETTINGS: '/settings',
  SUPPORT: '/support',
  LISTING_GET_STARTED: '/get-started',
  CREATE_PROPERTY: '/properties/create',
} as const;
export type LinkType = (typeof Links)[keyof typeof Links];

export const PROPERTY_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',
} as const;
export type PropertyStatusType =
  (typeof PROPERTY_STATUS)[keyof typeof PROPERTY_STATUS];

export const LISTING_TYPE = {
  OWNER: 'OWNER',
  AGENT: 'AGENT',
};
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
    name: 'Calendar',
    link: Links.CALENDAR,
  },
  {
    icon: Comment02Icon,
    name: 'Messages',
    link: Links.MESSAGES,
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
