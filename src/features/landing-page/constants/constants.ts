import { FavouriteIcon, GuestHouseIcon, HelpCircleIcon } from 'hugeicons-react';

export const Links = {
  FAVORITES: '/favorites',
  PROPERTIES: '/properties',
  MY_INTERESTS: '/my-interests',
} as const;
export type LinkType = (typeof Links)[keyof typeof Links];
export const landingPageSidebarItems = [
  {
    icon: FavouriteIcon,
    name: 'Favorites',
    link: Links.MY_INTERESTS,
  },
  {
    icon: GuestHouseIcon,
    name: 'Properties',
    link: '/',
  },
];

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
