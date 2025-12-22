import { useViewingDetails } from '../hooks';
import type { Viewings } from '../types';
import { ViewingCard } from './ViewingCard';

// Sample data for past viewings
const pastViewingsData: Viewings[] = [
  {
    date: '10 Nov Monday',
    viewings: [
      {
        startDate: '10:00 AM',
        endDate: '11:00 AM',
        status: 'past',
        viewer: {
          name: 'Alice Cooper',
          email: 'alice.cooper@example.com',
          image: '',
        },
        listing: {
          title: 'BA-08',
          listing_type: 'apartment',
          description: 'Modern apartment in city center',
          beds: 2,
          bathrooms: 1,
          size_sqft: 900,
          status: 'available',
        },
      },
      {
        startDate: '3:00 PM',
        endDate: '4:00 PM',
        status: 'past',
        viewer: {
          name: 'David Lee',
          email: 'david.lee@example.com',
          image: '',
        },
        listing: {
          title: 'BA-10',
          listing_type: 'apartment',
          description: 'Cozy studio apartment',
          beds: 1,
          bathrooms: 1,
          size_sqft: 600,
          status: 'available',
        },
      },
    ],
  },
  {
    date: '12 Nov Wednesday',
    viewings: [
      {
        startDate: '2:00 PM',
        endDate: '3:00 PM',
        status: 'past',
        viewer: {
          name: 'Susan Martinez',
          email: 'susan.martinez@example.com',
          image: '',
        },
        listing: {
          title: 'BA-18',
          listing_type: 'house',
          description: 'Family house with backyard',
          beds: 3,
          bathrooms: 2,
          size_sqft: 1800,
          status: 'available',
        },
      },
    ],
  },
];

export const Past = () => {
  const { form, onSubmit } = useViewingDetails();

  return (
    <div className="py-6">
      {pastViewingsData.map((viewingGroup, groupIndex) => (
        <div key={groupIndex} className="relative">
          {groupIndex < pastViewingsData.length - 1 && (
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