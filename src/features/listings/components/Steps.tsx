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
        apiStepName: 'listings',
        component: ({ onNext }) => <ListingDescription onNext={onNext} />,
      },
      {
        id: 1,
        title: 'Amenities',
        apiStepName:'amenities',
        component: ({ onNext, onPrev }) => (
          <Amenities onNext={onNext} onPrev={onPrev} />
        ),
      },
      {
        id: 2,
        title: 'Add media',
        apiStepName: 'media',
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
        apiStepName: 'pricing',
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
        apiStepName: 'viewing',
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
        apiStepName: 'availability',
        component: ({ onNext, onPrev }) => (
          <RentAvailability onNext={onNext} onPrev={onPrev} />
        ),
      },
      {
        id: 1,
        title: 'Additional details',
        apiStepName: 'additional_details',
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
        apiStepName: 'review',
        component: ({ onNext, onPrev, goToStep }) => (
          <ReviewListing onNext={onNext} onPrev={onPrev} goToStep={goToStep} />
        ),
      },
    ],
  },
];
