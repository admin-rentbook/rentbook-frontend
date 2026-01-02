import type { ListingDTO } from '@/shared/types';
import { ListingActionCard } from './ListingActionCard';

type RequestViewingProps = {
  property: ListingDTO;
};

export const RequestViewing = ({ property }: RequestViewingProps) => {
  return <ListingActionCard property={property} mode="viewing" />;
};