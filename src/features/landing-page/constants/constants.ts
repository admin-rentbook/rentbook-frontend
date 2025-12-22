import profileImg from '@/assets/images/avatar.jpg';
import propertyImage from '@/assets/images/property-image.jpg';
import type { PropertyDTO } from '@/shared/types';
import {
  FavouriteIcon,
  GuestHouseIcon,
  HelpCircleIcon,
  Search01Icon,
} from 'hugeicons-react';

export const Links = {
  FAVORITES: '/favorites',
  PROPERTIES: '/properties',
  MY_INTERESTS: '/my-interests',
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
    link: Links.MY_INTERESTS,
  },
  {
    icon: GuestHouseIcon,
    name: 'Properties',
    link: '/',
  },
];

export const propertyCards: PropertyDTO[] = [
  {
    id: '1',
    propertyName: 'The Palm Residence',
    location: 'Windhoek, Khomas Region',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: [
      'SWIMMING_POOL',
      'BAR',
      'JACUZZI',
      'GYM',
      'dryer',
      'free_parking',
      'pool',
      'gym',
      'elevator',
      'security_system',
      'balcony',
      'garden',
      'pet_friendly',
      'wheelchair_accessible',
    ],
    amount: 20000,
    bedrooms: 3,
    bathrooms: 2,
    square: 25,
    propertyType: 'APARTMENT',
    description:
      'Spacious 3-bedroom apartment with modern amenities, located in a secure neighborhood. Features include a fully equipped kitchen, ensuite master bedroom, ample parking, and 24/7 security. Spacious 3-bedroom apartment with modern amenities, located in a secure neighborhood. Features include a fully equipped kitchen, ensuite master bedroom, ample parking, and 24/7 security. ',
    locationResult: {
      lat: -22.5609,
      lng: 17.0658,
      address: 'Windhoek, Khomas Region, Namibia',
      placeId: 'ChIJYbC6o9iSvB4RqfVdYlGbKCk',
      street: '',
      city: 'Windhoek',
      state: 'Khomas Region',
      country: 'Namibia',
      postalCode: '',
    },
    reviews: {
      id: 1,
      averageRating: 4.3,
      totalReviews: 5,
      reviews: [
        {
          reviewerName: 'John Doe',
          rating: 5,
          comment: `I recently stayed at a shortlet managed by Raymond,
           and I must say, it was a fantastic experience! The place was not 
           only cozy but also impeccably clean. Raymond's attention to detail
            and warm hospitality made me feel right at home. Highly recommend 
            for anyone looking for a comfortable stay!`,
          date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          image: profileImg,
        },
        {
          reviewerName: 'Mike Johnson',
          rating: 5,
          comment:
            "Exceeded expectations! The photos don't do it justice. Highly recommend this property to anyone looking for a comfortable stay.",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
          image: profileImg,
        },
        {
          reviewerName: 'Sarah Williams',
          rating: 3,
          comment:
            'Decent property but had a few maintenance issues. The location is convenient though.',
          date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 1 month ago
          image: profileImg,
        },
      ],
    },
    notes: [
      {
        id: '1',
        noteTitle: 'Renter preference',
        noteDescription:
          'This property is exclusively for hardworking professionals who maintain a clean record, ensuring a safe and respectful community for all residents.',
      },
      {
        id: '2',
        noteTitle: 'Renter preference',
        noteDescription:
          'This property is exclusively for hardworking professionals who maintain a clean record, ensuring a safe and respectful community for all residents.',
      },
    ],
  },
  {
    id: '2',
    propertyName: 'Skyline Apartments',
    location: 'Swakopmund, Erongo Region',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: ['SWIMMING_POOL', 'ELEVATOR', 'SECURITY'],
    amount: 24000,
    bedrooms: 3,
    bathrooms: 2,
    square: 30,
    propertyType: 'APARTMENT',
  },
  {
    id: '3',
    propertyName: 'Greenview Estate',
    location: 'Walvis Bay, Erongo Region',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: ['BASKETBALL_COURT', 'PLAYGROUND', 'SECURITY'],
    amount: 10000,
    bedrooms: 3,
    bathrooms: 2,
    square: 20,
    propertyType: 'HOUSE',
  },
  {
    id: '4',
    propertyName: 'The Residence',
    location: 'Windhoek, Khomas Region',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: ['GYM', 'BAR', 'SECURITY'],
    amount: 20000,
    bedrooms: 3,
    bathrooms: 2,
    square: 28,
    propertyType: 'TOWNHOUSE',
  },
  {
    propertyName: 'Peach Beach Apartments',
    location: 'Swakopmund, Erongo Region',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: ['SWIMMING_POOL', 'BEACH_ACCESS', 'BAR'],
    amount: 24000,
    bedrooms: 3,
    bathrooms: 2,
    square: 32,
    propertyType: 'APARTMENT',
  },
  {
    propertyName: 'Hilltop View Estate',
    location: 'Otjiwarongo, Otjozondjupa Region',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: ['JACUZZI', 'GYM', 'SECURITY'],
    amount: 10000,
    bedrooms: 3,
    bathrooms: 2,
    square: 22,
    propertyType: 'HOUSE',
  },
  {
    propertyName: 'Skye View Estates',
    location: 'Rundu, Kavango East',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: ['BASKETBALL_COURT', 'PLAYGROUND'],
    amount: 10000,
    bedrooms: 3,
    bathrooms: 2,
    square: 24,
    propertyType: 'HOUSE',
  },
  {
    propertyName: 'Skye Estate',
    location: 'Keetmanshoop, ǁKaras Region',
    images: [propertyImage, propertyImage, propertyImage],
    amenities: ['SWIMMING_POOL', 'GYM'],
    amount: 10000,
    bedrooms: 3,
    bathrooms: 2,
    square: 20,
    propertyType: 'TOWNHOUSE',
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
