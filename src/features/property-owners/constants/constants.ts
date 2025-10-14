import {
  Calendar04Icon,
  Comment02Icon,
  GuestHouseIcon,
  HelpCircleIcon,
  Home01Icon,
  LegalDocument01Icon,
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
} as const;
export type LinkType = (typeof Links)[keyof typeof Links];

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
] as const;
