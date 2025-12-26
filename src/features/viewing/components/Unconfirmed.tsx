import { useViewingDetails } from '../hooks';
import type { Viewings } from '../types';
import { ViewingCard } from './ViewingCard';

const unconfirmedViewingsData: Viewings[] = [
  {
    date: '22 Nov Friday',
    viewings: [
      {
        startDate: '1:00 PM',
        endDate: '2:00 PM',
        status: 'unconfirmed',
        viewer: {
          name: 'Emily Davis',
          email: 'emily.davis@example.com',
          image: '',
        },
        listing: {
          title: 'BA-30',
          listing_type: 'apartment',
          description: 'Beautiful apartment with great view',
          beds: 2,
          bathrooms: 1,
          size_sqft: 950,
          status: 'available',
        },
      },
    ],
  },
  {
    date: '23 Nov Saturday',
    viewings: [
      {
        startDate: '10:00 AM',
        endDate: '11:00 AM',
        status: 'unconfirmed',
        viewer: {
          name: 'Robert Wilson',
          email: 'robert.wilson@example.com',
          image: '',
        },
        listing: {
          title: 'BA-35',
          listing_type: 'house',
          description: 'Spacious house with garden',
          beds: 4,
          bathrooms: 3,
          size_sqft: 2200,
          status: 'available',
        },
      },
    ],
  },
];

export const Unconfirmed = () => {
  const {
    form,
    // isOpenAccept,
    // isOpenDecline,
    setIsOpenAccept,
    setIsOpenDecline,
    onSubmit,
  } = useViewingDetails();

  const handleAccept = () => {
    setIsOpenAccept(true);
    // Modal logic will be implemented later
  };

  const handleDecline = () => {
    setIsOpenDecline(true);
    // Modal logic will be implemented later
  };

  return (
    <div className="py-6">
      {unconfirmedViewingsData.map((viewingGroup, groupIndex) => (
        <div key={groupIndex} className="relative">
          {groupIndex < unconfirmedViewingsData.length - 1 && (
            <div className="absolute left-[5px] top-[15px] bottom-0 w-[1px] bg-custom-gray-100" />
          )}

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 size-3 rounded-full bg-black/20 flex items-center justify-center z-10"></div>
            <h4 className="text-heading-4 text-neutral-600">
              {viewingGroup.date}
            </h4>
          </div>

          <div className="ml-4 lg:ml-11 flex flex-col gap-4 mb-6">
            {viewingGroup.viewings.map((viewing, viewingIndex) => (
              <ViewingCard
                key={viewingIndex}
                viewing={viewing}
                onAccept={handleAccept}
                onDecline={handleDecline}
                form={form}
                onSubmit={onSubmit}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};