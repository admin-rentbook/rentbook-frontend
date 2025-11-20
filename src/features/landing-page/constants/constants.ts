import propertyImage from '@/assets/images/property-image.jpg';
import type { PropertyDTO } from '@/shared/types';
import {
  Bathtub01Icon,
  BedSingle02Icon,
  DashedLine02Icon,
  FavouriteIcon,
  GuestHouseIcon,
  HelpCircleIcon,
  Search01Icon,
} from 'hugeicons-react';

export const Links = {
  FAVORITES: '/favorites',
  PROPERTIES: '/properties',
} as const;
export type LinkType = (typeof Links)[keyof typeof Links];
export const landingPageSidebarItems = [
  {
    icon: Search01Icon,
    name: 'Search',
  },
  {
    icon: FavouriteIcon,
    name: 'Favorites',
    link: Links.FAVORITES,
  },
  {
    icon: GuestHouseIcon,
    name: 'Properties',
    link: Links.PROPERTIES,
  },
];

export const propertyCards: PropertyDTO[] = [
  {
    propertyName: 'The Palm Residence',
    location: 'Windhoek, Khomas Region',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: [
      { icon: BedSingle02Icon, count: 3, label: 'Bedrooms' },
      { icon: Bathtub01Icon, count: 2, label: 'Bathrooms' },
      { icon: DashedLine02Icon, count: 1, label: 'Garage' },
    ],
    amount: 20000,
  },
  {
    propertyName: 'Skyline Apartments',
    location: 'Swakopmund, Erongo Region',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: [
      { icon: BedSingle02Icon, count: 3, label: 'Bedrooms' },
      { icon: Bathtub01Icon, count: 2, label: 'Bathrooms' },
      { icon: DashedLine02Icon, count: 1, label: 'Garage' },
    ],
    amount: 24000,
  },
  {
    propertyName: 'Greenview Estate',
    location: 'Walvis Bay, Erongo Region',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: [
      { icon: BedSingle02Icon, count: 3, label: 'Bedrooms' },
      { icon: Bathtub01Icon, count: 2, label: 'Bathrooms' },
      { icon: DashedLine02Icon, count: 1, label: 'Garage' },
    ],
    amount: 10000,
  },
  {
    propertyName: 'The Residence',
    location: 'Windhoek, Khomas Region',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: [
      { icon: BedSingle02Icon, count: 3, label: 'Bedrooms' },
      { icon: Bathtub01Icon, count: 2, label: 'Bathrooms' },
      { icon: DashedLine02Icon, count: 1, label: 'Garage' },
    ],
    amount: 20000,
  },
  {
    propertyName: 'Peach Beach Apartments',
    location: 'Swakopmund, Erongo Region',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: [
      { icon: BedSingle02Icon, count: 3, label: 'Bedrooms' },
      { icon: Bathtub01Icon, count: 2, label: 'Bathrooms' },
      { icon: DashedLine02Icon, count: 1, label: 'Garage' },
    ],
    amount: 24000,
  },
  {
    propertyName: 'Hilltop View Estate',
    location: 'Otjiwarongo, Otjozondjupa Region',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: [
      { icon: BedSingle02Icon, count: 3, label: 'Bedrooms' },
      { icon: Bathtub01Icon, count: 2, label: 'Bathrooms' },
      { icon: DashedLine02Icon, count: 1, label: 'Garage' },
    ],
    amount: 10000,
  },
  {
    propertyName: 'Skye View Estate',
    location: 'Rundu, Kavango East',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: [
      { icon: BedSingle02Icon, count: 3, label: 'Bedrooms' },
      { icon: Bathtub01Icon, count: 2, label: 'Bathrooms' },
      { icon: DashedLine02Icon, count: 1, label: 'Garage' },
    ],
    amount: 10000,
  },
  {
    propertyName: 'Skye View Estate',
    location: 'Keetmanshoop, ǁKaras Region',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: [
      { icon: BedSingle02Icon, count: 3, label: 'Bedrooms' },
      { icon: Bathtub01Icon, count: 2, label: 'Bathrooms' },
      { icon: DashedLine02Icon, count: 1, label: 'Garage' },
    ],
    amount: 10000,
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
