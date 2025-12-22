import { useViewingDetails } from '../hooks';
import type { Viewings } from '../types';
import { ViewingCard } from './ViewingCard';

// Sample data for cancelled viewings
const cancelledViewingsData: Viewings[] = [
  {
    date: '14 Nov Thursday',
    viewings: [
      {
        startDate: '11:00 AM',
        endDate: '12:00 PM',
        status: 'cancelled',
        viewer: {
          name: 'Tom Anderson',
          email: 'tom.anderson@example.com',
          image: '',
        },
        listing: {
          title: 'BA-22',
          listing_type: 'apartment',
          description: 'Luxury penthouse apartment',
          beds: 3,
          bathrooms: 2,
          size_sqft: 1400,
          status: 'available',
        },
      },
    ],
  },
  {
    date: '15 Nov Friday',
    viewings: [
      {
        startDate: '4:00 PM',
        endDate: '5:00 PM',
        status: 'cancelled',
        viewer: {
          name: 'Linda Green',
          email: 'linda.green@example.com',
          image: '',
        },
        listing: {
          title: 'BA-28',
          listing_type: 'house',
          description: 'Charming family home',
          beds: 4,
          bathrooms: 3,
          size_sqft: 2100,
          status: 'available',
        },
      },
    ],
  },
];

export const Cancelled = () => {
  const { form, onSubmit } = useViewingDetails();

  return (
    <div className="py-6">
      {cancelledViewingsData.map((viewingGroup, groupIndex) => (
        <div key={groupIndex} className="relative">
          {groupIndex < cancelledViewingsData.length - 1 && (
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