import propImg from '@/assets/images/property-6.jpg';
import { Button } from '@/shared/components';
import { useMobile } from '@/shared/hooks';
import { currencyFormatter, squareMeterFormatter } from '@/shared/utils';
import {
  Bathtub01Icon,
  BedSingle02Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
  DashedLine02Icon,
} from 'hugeicons-react';

type RescheduleContentProps = {
  selectedDate: string | null;
  selectedTimeSlot: {
    id: string;
    startTime: string;
    endTime: string;
  } | null;
  onBack: () => void;
  onConfirm: () => void;
  onClose: () => void;
};

export const RescheduleContent = ({
  selectedDate,
  selectedTimeSlot,
  onBack,
  onConfirm,
  onClose,
}: RescheduleContentProps) => {
  const { isMobile } = useMobile();

  // Sample viewing data - replace with actual data from props
  const sampleViewing = {
    listing: {
      title: 'BA-12',
      beds: 3,
      bathrooms: 2,
      size_sqft: 1200,
    },
  };

  const propItems = [
    {
      value: `${sampleViewing.listing.beds}`,
      icon: BedSingle02Icon,
    },
    {
      value: `${sampleViewing.listing.bathrooms}`,
      icon: Bathtub01Icon,
    },
    {
      value: `${squareMeterFormatter.format(sampleViewing.listing.size_sqft)}`,
      icon: DashedLine02Icon,
    },
  ];

  // Parse the selected date to get month and day
  const getFormattedDate = () => {
    if (!selectedDate)
      return {
        month: 'Nov',
        day: '17',
        fullDate: '17 Nov',
        dayOfWeek: 'Monday',
      };

    const date = new Date(selectedDate);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    return {
      month: months[date.getMonth()],
      day: date.getDate().toString(),
      fullDate: `${date.getDate()} ${months[date.getMonth()]}`,
      dayOfWeek: daysOfWeek[date.getDay()],
    };
  };

  const dateInfo = getFormattedDate();

  return (
    <div className="p-6 space-y-6 h-full lg:h-auto flex flex-col justify-between">
      <div className="space-y-6">
        <div className="mb-6 flex justify-between">
          <h2 className="text-heading-5 text-neutral-600">
            Reschedule viewing
          </h2>
          {!isMobile && (
            <Button variant="icon" className="text-black-300" onClick={onClose}>
              <Cancel01Icon className="size-6" />
            </Button>
          )}
        </div>

{/**Approval required */}
        <div className="bg-primary-100 rounded-[1.25em] p-4 space-y-2">
          <div className="flex items-center gap-2 text-red-400">
            <CheckmarkCircle01Icon className="size-5" />
            <p className="text-body-18 font-medium">Approval required</p>
          </div>
          <p className="text-body-small text-red-400">
            Rescheduling this viewing is subject to approval by the renters.
            Renters who decline will be refunded back their viewing fee.{' '}
            <span className="underline cursor-pointer">Learn more</span>
          </p>
        </div>
        {/* Property Details Section */}
        <div className="relative">
          <img
            src={propImg}
            alt={sampleViewing.listing.title}
            className="object-cover rounded-[1.25em] h-[200px] w-full"
          />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 text-white p-3 bg-gradient-to-t from-black/60 to-transparent rounded-b-[1.25em]">
            <p className="text-body-medium">{sampleViewing.listing.title}</p>
            <p className="text-body-small">Windhoek, Khomas Region</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center flex-wrap">
                {propItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-1 items-center text-white"
                  >
                    <item.icon className="size-4 text-white" />
                    <p className="text-body-small">{item.value}</p>
                  </div>
                ))}
                <p>{currencyFormatter.format(20000, false)}/yr</p>
              </div>
            </div>
          </div>
        </div>
        {/* Date & Time Section */}
        <div className="flex items-start space-x-3">
          <div className="size-[54px] flex flex-col justify-center rounded-[12px] border border-custom-neutral-100/40 bg-white flex-shrink-0">
            <div className="flex justify-center rounded-t-[12px] bg-custom-neutral-50/50 h-[30%]">
              <p className="text-11 text-black-300/50">{dateInfo.month}</p>
            </div>
            <div className="flex items-end justify-center h-[70%]">
              <p className="text-heading-lg">{dateInfo.day}</p>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-heading-lg text-black-500">
              {dateInfo.fullDate}{' '}
              <span className="text-black-300/50">{dateInfo.dayOfWeek}</span>
            </p>
            <p className="text-body-medium text-black-400">
              {selectedTimeSlot
                ? `${selectedTimeSlot.startTime} - ${selectedTimeSlot.endTime}`
                : '10:00 AM - 11:00 AM'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 lg:h-auto pb-10 lg:pb-4">
        <Button
          variant="tertiary"
          size="lg"
          className="lg:w-auto w-1/2"
          onClick={onBack}
        >
          Back
        </Button>
        <Button size="lg" onClick={onConfirm} className="lg:w-auto w-1/2">
          Reschedule
        </Button>
      </div>
    </div>
  );
};
