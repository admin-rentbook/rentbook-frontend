import type { Step } from '@/shared/types';
import { AddImages, Amenities, ListingDescription } from './AboutYourListing';
import { CostAndFees } from './CostAndFees';

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
  
];
