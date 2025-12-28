import { PropertyInfo } from '@/shared/components/PropertyInfo';
import type { ListingDTO } from '@/shared/types';
import { useLocation } from '@tanstack/react-router';
import { JoinWaitlist } from './JoinWaitlist';

export const ListingDetails = () => {
  const location = useLocation();
  const property = location.state.property;
  console.log('ListingDetails rendered with property:', property);
  return (
    <PropertyInfo
      property={property ?? ({} as ListingDTO)}
      actionItem={<JoinWaitlist property={property || ({} as ListingDTO)} />}
    />
  );
};
