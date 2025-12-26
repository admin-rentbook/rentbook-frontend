import { useViewingDetails } from '../hooks';
import type { Viewings } from '../types';
import { CancelModal } from './CancelModal';
import { RescheduleModal } from './RescheduleModal';
import { ViewingCard } from './ViewingCard';

const upcomingViewingsData: Viewings[] = [
  {
    date: '17 Nov Sunday',
    viewings: [
      {
        startDate: '10:00 AM',
        endDate: '11:00 AM',
        status: 'upcoming',
        viewer: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          image: '',
        },
        listing: {
          title: 'BA-12',
          listing_type: 'apartment',
          description: 'Luxury apartment with modern amenities',
          beds: 3,
          bathrooms: 2,
          size_sqft: 1200,
          status: 'available',
        },
      },
      {
        startDate: '2:00 PM',
        endDate: '3:00 PM',
        status: 'upcoming',
        viewer: {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          image: '',
        },
        listing: {
          title: 'BA-15',
          listing_type: 'apartment',
          description: 'Cozy studio in downtown',
          beds: 2,
          bathrooms: 1,
          size_sqft: 850,
          status: 'available',
        },
      },
    ],
  },
  {
    date: '18 Nov Monday',
    viewings: [
      {
        startDate: '9:00 AM',
        endDate: '10:00 AM',
        status: 'upcoming',
        viewer: {
          name: 'Michael Brown',
          email: 'michael.brown@example.com',
          image: '',
        },
        listing: {
          title: 'BA-20',
          listing_type: 'apartment',
          description: 'Spacious family home',
          beds: 4,
          bathrooms: 3,
          size_sqft: 2000,
          status: 'available',
        },
      },
    ],
  },
  {
    date: '20 Nov Wednesday',
    viewings: [
      {
        startDate: '11:00 AM',
        endDate: '12:00 PM',
        status: 'upcoming',
        viewer: {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@example.com',
          image: '',
        },
        listing: {
          title: 'BA-25',
          listing_type: 'house',
          description: 'Modern penthouse with city views',
          beds: 3,
          bathrooms: 2,
          size_sqft: 1500,
          status: 'available',
        },
      },
    ],
  },
];

export const Upcoming = () => {
  const {
    form,
    isOpenReschedule,
    isOpenCancel,
    setIsOpenReschedule,
    setIsOpenCancel,
    onSubmit,
    isButtonDisabled,
    handleReschedule,
    handleCancel,
  } = useViewingDetails();

  return (
    <>
      <div className="py-6">
        {upcomingViewingsData.map((viewingGroup, groupIndex) => (
          <div key={groupIndex} className="relative">
            {groupIndex < upcomingViewingsData.length - 1 && (
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
                  onReschedule={handleReschedule}
                  onCancel={handleCancel}
                  form={form}
                  onSubmit={onSubmit}
                  isButtonDisabled={isButtonDisabled}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <RescheduleModal
        isOpen={isOpenReschedule}
        setIsOpen={setIsOpenReschedule}
      />

      <CancelModal isOpen={isOpenCancel} setIsOpen={setIsOpenCancel} />
    </>
  );
};
