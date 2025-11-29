import type { Step } from '@/shared/types';
import { ListingDescription } from './AboutYourListing';

export const steps: Step[] = [
  {
    id: 0,
    title: 'About your listing',
    subSteps: [
      {
        id: 0,
        title: 'Listing description',
        component: ({ onNext }) => (
          <ListingDescription onNext={onNext} />
        ),
      },
      {
        id: 1,
        title: 'Amenities',
        component: ({ onNext }) => (
          <div>
            Amenities <button onClick={onNext}>Next</button>
          </div>
        ),
      },
      {
        id: 2,
        title: 'Add media',
        component: ({ onNext }) => (
          <div>
            Add Media <button onClick={onNext}>Next</button>
          </div>
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
        component: ({ onNext }) => (
          <div>
            Payment Details <button onClick={onNext}>Next</button>
          </div>
        ),
      },
    ],
  },
  
];
