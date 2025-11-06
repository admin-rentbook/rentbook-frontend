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
    location: 'Lekki Phase 1, Lagos',
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
    location: 'Victoria Island, Lagos',
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
    location: 'Abuja, Nigeria',
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
    location: 'Lekki Phase 1, Lagos',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: [
      { icon: BedSingle02Icon, count: 3, label: 'Bedrooms' },
      { icon: Bathtub01Icon, count: 2, label: 'Bathrooms' },
      { icon: DashedLine02Icon, count: 1, label: 'Garage' },
    ],
    amount: 20000,
  },
  {
    propertyName: 'Peach brach Apartments',
    location: 'Victoria Island, Lagos',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: [
      { icon: BedSingle02Icon, count: 3, label: 'Bedrooms' },
      { icon: Bathtub01Icon, count: 2, label: 'Bathrooms' },
      { icon: DashedLine02Icon, count: 1, label: 'Garage' },
    ],
    amount: 24000,
  },
  {
    propertyName: 'Skye view Estate',
    location: 'Abuja, Nigeria',
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
