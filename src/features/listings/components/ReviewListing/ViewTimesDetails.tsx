import {
  AccordionComponent,
  type AccordionItemType,
} from '@/shared/components/Accordion';
import { convertUnderscoreToSpace, currencyFormatter } from '@/shared/utils';
import React from 'react';
import type { ViewTimesData } from '../../types';
import { ReviewTrigger } from '../shared';

type ViewingTimesDetailsProps = {
  viewingTimes: ViewTimesData;
};

export const ViewingTimesDetails = ({
  viewingTimes,
}: ViewingTimesDetailsProps) => {
  const { viewingFee, viewingTimesData, viewingType } = viewingTimes;

  const items = [
    {
      name: 'Viewing type',
      value: viewingType,
    },
    {
      name: 'Booking type',
      value: convertUnderscoreToSpace(viewingFee?.bookViewingType),
    },
    {
      name: 'Viewing fee',
      value: currencyFormatter.format(viewingFee?.viewingFee),
    },
  ];

  const accordionItems: AccordionItemType = {
    trigger: <ReviewTrigger name="Viewings" />,
    value: 'paymentDetails',
    content: (
      <>
        <div className="grid grid-cols-[35%_1fr] gap-4 pt-6">
          {items.map((item) => (
            <React.Fragment key={item.name}>
              <div className="text-body-small text-black-400 min-w-0">
                {item.name}
              </div>
              <div className="text-body text-black-500 break-words whitespace-norma min-w-0">
                {item.value}
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="flex flex-col pt-4">
          <div className="text-body-small text-black-400 min-w-0">
            Time slots:
          </div>
          <div className="space-y-4">
            {Object.entries(viewingTimesData || {}).map(([day, timeSlots]) => (
              <div key={day} className="space-y-2">
                <h3 className="text-body text-black-500">{day}</h3>

                <div className="space-y-1">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center text-body text-black-400 gap-2 text-sm"
                    >
                      <span>{slot.startTime}</span>
                      <span>-</span>
                      <span>{slot.endTime}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    ),
  };
  return (
    <div className="flex flex-col gap-2 border border-custom-neutral-50 rounded-[1.25em] p-4">
      <AccordionComponent
        type="single"
        defaultValue="viewingTimes"
        items={[accordionItems]}
      />
    </div>
  );
};
