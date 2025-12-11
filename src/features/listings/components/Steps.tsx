import type { Step } from '@/shared/types';
import { AddImages, Amenities, ListingDescription } from './AboutYourListing';
import { CostAndFees } from './CostAndFees';
import { AdditionalDetails, RentAvailability } from './RentAvailability';
import { ReviewListing } from './ReviewListing';
import { Viewing } from './Viewing';

export const steps: Step[] = [
  {
    id: 0,
    title: 'About your listing',
    subSteps: [
      {
        id: 0,
        title: 'Listing description',
        component: ({ onNext }) => <ListingDescription onNext={onNext} />,
      },
      {
        id: 1,
        title: 'Amenities',
        component: ({ onNext, onPrev }) => (
          <Amenities onNext={onNext} onPrev={onPrev} />
        ),
      },
      {
        id: 2,
        title: 'Add media',
        component: ({ onNext, onPrev }) => (
          <AddImages onNext={onNext} onPrev={onPrev} />
        ),
      },
    ],
  },
  {
    id: 1,
    title: 'Cost & fees',
    subSteps: [
      {
        id: 0,
        title: 'Set your price',
        component: ({ onNext, onPrev }) => (
          <CostAndFees onNext={onNext} onPrev={onPrev} />
        ),
      },
    ],
  },
  {
    id: 2,
    title: 'Viewing',
    subSteps: [
      {
        id: 0,
        title: 'Set viewing',
        component: ({ onNext, onPrev }) => (
          <Viewing onNext={onNext} onPrev={onPrev} />
        ),
      },
    ],
  },
  {
    id: 3,
    title: 'Final details',
    subSteps: [
      {
        id: 0,
        title: 'Set final details',
        component: ({ onNext, onPrev }) => (
          <RentAvailability onNext={onNext} onPrev={onPrev} />
        ),
      },
      {
        id: 1,
        title: 'Additional details',
        component: ({ onNext, onPrev }) => (
          <AdditionalDetails onNext={onNext} onPrev={onPrev} />
        ),
      },
    ],
  },
  {
    id: 4,
    title: 'Review your listing',
    subSteps: [
      {
        id: 0,
        title: 'Review listing',
        component: ({ onNext, onPrev }) => (
          <ReviewListing onNext={onNext} onPrev={onPrev} />
        ),
      },
    ],
  },
];
