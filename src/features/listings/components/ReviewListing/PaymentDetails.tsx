import {
  AccordionComponent,
  type AccordionItemType,
} from '@/shared/components/Accordion';
import {
  convertUnderscoreToSpace,
  currencyFormatter,
  isFixedPrice,
  isTimedAuction,
  percentageFormatter,
} from '@/shared/utils';
import React from 'react';
import type { RentalPriceData } from '../../types';
import { AdditionalFeeBox, ReviewTrigger } from '../shared';

type PaymentDetailsProps = {
  rentals: RentalPriceData;
};

export const PaymentDetails = ({ rentals }: PaymentDetailsProps) => {
  const { rentPriceData, additionalPrice, discount } = rentals;

  const items: { name: string; value: string | number | boolean }[] = [
    {
      name: 'Rental Payment type',
      value: convertUnderscoreToSpace(rentPriceData.selectType),
    },

    {
      name: 'Rent duration',
      value: rentPriceData.rentDuration,
    },
    {
      name: 'Year',
      value: convertUnderscoreToSpace(rentPriceData.year),
    },

    {
      name: 'Discount',
      value: percentageFormatter.format(discount?.discount),
    },
    {
      name: 'Discount duration',
      value: discount?.duration as unknown as number,
    },
  ];

  if (isFixedPrice(rentPriceData)) {
    items.push({
      name: 'Rental price',
      value: currencyFormatter.format(rentPriceData?.rentalPrice),
    });
  }
  if (isTimedAuction(rentPriceData)) {
    items.push(
      {
        name: 'Bid Price',
        value: currencyFormatter.format(rentPriceData?.bidPrice),
      },
      {
        name: 'Bid start date',
        value: rentPriceData?.bidStartDate,
      },
      {
        name: 'Bid end date',
        value: rentPriceData?.bidEndDate,
      },
      {
        name: 'Auto accept highest bidder',
        value: rentPriceData?.autoAcceptHighestBidder ?? false,
      },
      {
        name: 'Extend last minute bid',
        value: rentPriceData?.extendLastMinuteBid ?? false,
      }
    );
  }
  const filteredItems = items.filter((item) => !!item.value) as {
    name: string;
    value: string | number;
  }[];
  const additionalPriceItems = [
    {
      name: 'Additional price: ',
      value: additionalPrice,
    },
  ];

  const accordionItems: AccordionItemType = {
    trigger: <ReviewTrigger name="Payment details" />,
    value: 'paymentDetails',
    content: (
      <>
        <div className="grid grid-cols-[35%_1fr] gap-4 pt-6">
          {filteredItems.map((item) => (
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
        <div className="flex flex-col gap-2 pt-6">
          {additionalPriceItems.map((item) => (
            <React.Fragment key={item.name}>
              <div className="text-body-small text-black-400 min-w-0">
                {item.name}
              </div>
              <div className="flex flex-col gap-3 w-full">
                {item.value?.map((fee) => (
                  <AdditionalFeeBox additionalFee={fee} key={fee.feeName} />
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </>
    ),
  };
  return (
    <div className="flex flex-col gap-2 border border-custom-neutral-50 rounded-[1.25em] p-4">
      <AccordionComponent
        type="single"
        defaultValue="rentalPrice"
        items={[accordionItems]}
      />
    </div>
  );
};
