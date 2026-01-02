import type { ListingDTO } from '@/shared/types';
import { ListingActionCard } from './ListingActionCard';

type JoinWaitlistProps = {
  property: ListingDTO;
};

export const JoinWaitlist = ({ property }: JoinWaitlistProps) => {
  return <ListingActionCard property={property} mode="waitlist" />;
};
