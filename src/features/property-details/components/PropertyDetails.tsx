import { ListingLiveModal } from '@/features/listings/components/ListingLiveModal';
import { ListingLinks } from '@/features/listings/constants';
import { Links } from '@/features/property-owners/constants';
import {
  Button,
  StatusBox,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components';
import { convertUnderscoreToSpace } from '@/shared/utils';
import { returnStatus } from '@/shared/utils/helpers';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  Add01Icon,
  ArrowLeft01Icon,
  GridViewIcon,
  GuestHouseIcon,
  LegalDocument01Icon,
  UserIcon,
} from 'hugeicons-react';
import { useListingLiveModal } from '../hooks';
import { Agents } from './Agents';
import { Leases } from './Leases';
import { Listings } from './Listings';
import { PropertyMenu } from './PropertyMenu';
import { Summary } from './Summary';

export const PropertyDetails = () => {
  const navigate = useNavigate();

  const {
    propertyName,
    propertyCity,
    propertyStreet,
    propertyStatus,
    showListingLiveModal,
    listingId,
  } = useSearch({
    from: '/property-details',
  });

  const {
    isModalOpen,
    listingData,
    handleShareListing,
    handleModalClose,
  } = useListingLiveModal({
    listingId,
    showListingLiveModal,
  });

  const displayName = propertyName
    ? `Apartment in ${propertyCity || 'Unknown City'}`
    : 'Apartment in Windhoek';
  const displayAddress =
    propertyStreet || '123 Independence Avenue Central Business district';
  const status = (propertyStatus as any) || 'active';
  const { bgColor, textColor, fillColor } = returnStatus(status);

  return (
    <div>
      <div className="border-b-gray-50 border-0 lg:border-b">
        <div className="flex items-center justify-between p-5">
          <div
            className="flex items-center gap-3  text-black-300 hover:cursor-pointer"
            onClick={() => navigate({ to: Links.PROPERTIES })}
          >
            <ArrowLeft01Icon className="size-4" />
            <p className="text-body">Properties</p>
          </div>
        </div>
      </div>

      <div className="px-3 lg:p-5 flex flex-col gap-3 lg:gap-0 lg:flex-row lg:justify-between items-center">
        <div className="w-full lg:w-auto">
          <div className="flex gap-3 pb-2">
            <h4 className="text-heading-4 text-neutral-600">{displayName}</h4>
            <StatusBox
              bgColor={bgColor}
              textColor={textColor}
              text={convertUnderscoreToSpace(status)}
              fillColor={fillColor}
            />
          </div>
          <p className="text-body-small text-black-300">{displayAddress}</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-2 w-full lg:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="w-full lg:w-auto"
            onClick={() =>
              navigate({
                to: ListingLinks.LISTINGS_GET_STARTED,
                search: (prev) => ({
                  propertyId: prev.propertyId!,
                }),
              })
            }
          >
            <Add01Icon />
            Add listing
          </Button>
          <Button variant="outline" size="sm">
            Create lease
          </Button>
          <PropertyMenu />
        </div>
      </div>

      <div className="px-2 lg:px-4 pt-5 lg:pt-0">
        <Tabs className="w-full" defaultValue="SUMMARY">
          <TabsList className="inline-flex gap-5 w-full max-w-md overflow-x-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.name}
                value={tab.value}
                className="data-[state=active]:bg-transparent
                 data-[state=active]:text-primary-500
                  data-[state=active]:border-b-2 rounded-none
                  data-[state=active]:border-b-primary-500 
                  text-black-400
                  "
              >
                <tab.icon />
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.name} value={tab.value} className="px-2">
              <tab.content />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Listing Live Modal */}
      {listingId && (
        <ListingLiveModal
          listing={listingData}
          modalOptions={{
            open: isModalOpen,
            onOpenChange: handleModalClose,
          }}
          onShareListing={handleShareListing}
        />
      )}
    </div>
  );
};

const tabs = [
  {
    name: 'Summary',
    icon: GridViewIcon,
    value: 'SUMMARY',
    content: Summary,
  },
  {
    name: 'Listings',
    icon: GuestHouseIcon,
    value: 'LISTINGS',
    content: Listings,
  },
  {
    name: 'Leases',
    icon: LegalDocument01Icon,
    value: 'LEASES',
    content: Leases,
  },
  {
    name: 'Agents',
    icon: UserIcon,
    value: 'AGENTS',
    content: Agents,
  },
];
