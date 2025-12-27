import {
  AccordionComponent,
  type AccordionItemType,
} from '@/shared/components/Accordion';
import {
  convertUnderscoreToSpace,
  currencyFormatter,
  percentageFormatter,
} from '@/shared/utils';
import React from 'react';
import type {
  AdditionalFeeDTO,
  DiscountDTO,
  RentalPricingDTO,
} from '../../types';
import { AdditionalFeeBox, ReviewTrigger } from '../shared';

type PaymentDetailsProps = {
  rentalPricing?: RentalPricingDTO;
  additionalFees?: AdditionalFeeDTO[];
  discount?: DiscountDTO[];
  onEdit?: () => void;
};

export const PaymentDetails = ({
  rentalPricing,
  additionalFees,
  discount,
  onEdit,
}: PaymentDetailsProps) => {
  if (!rentalPricing) return null;

  const isFixedPrice = rentalPricing.payment_method === 'FIXED_PRICE';
  const isTimedAuction = rentalPricing.payment_method === 'TIMED_AUCTION';

  const items: { name: string; value: string | number | boolean }[] = [
    {
      name: 'Rental Payment type',
      value: convertUnderscoreToSpace(rentalPricing.payment_method),
    },
    {
      name: 'Rent duration',
      value: rentalPricing.rent_duration,
    },
    {
      name: 'Rent period',
      value: convertUnderscoreToSpace(rentalPricing.rent_period),
    },
  ];

  if (discount && discount.length > 0) {
    items.push(
      {
        name: 'Discount',
        value: percentageFormatter.format(Number(discount[0].percent)),
      },
      {
        name: 'Discount end date',
        value: discount[0].end_date,
      }
    );
  }

  if (isFixedPrice && rentalPricing.fixed_config) {
    items.push({
      name: 'Rental price',
      value: currencyFormatter.format(
        Number(rentalPricing.fixed_config.rental_price)
      ),
    });
  }

  if (isTimedAuction && rentalPricing.auction_config) {
    items.push(
      {
        name: 'Minimum Bid',
        value: currencyFormatter.format(
          Number(rentalPricing.auction_config.minimum_bid)
        ),
      },
      {
        name: 'Bid start date',
        value: rentalPricing.auction_config.bid_start,
      },
      {
        name: 'Bid end date',
        value: rentalPricing.auction_config.bid_end,
      }
    );

    if (rentalPricing.bidding_rules) {
      items.push(
        {
          name: 'Auto accept highest bidder',
          value: rentalPricing.bidding_rules.auto_accept_highest ? 'Yes' : 'No',
        },
        {
          name: 'Extend last minute bid',
          value: rentalPricing.bidding_rules.extend_if_bid_in_last_24h
            ? 'Yes'
            : 'No',
        }
      );
    }
  }

  const filteredItems = items.filter((item) => !!item.value);

  const accordionItems: AccordionItemType = {
    trigger: <ReviewTrigger name="Payment details" onEdit={onEdit} />,
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
                {item.value.toString()}
              </div>
            </React.Fragment>
          ))}
        </div>

        {additionalFees && additionalFees.length > 0 && (
          <div className="flex flex-col gap-2 pt-6">
            <div className="text-body-small text-black-400 min-w-0">
              Additional fees:
            </div>
            <div className="flex flex-col gap-3 w-full">
              {additionalFees.map((fee) => (
                <AdditionalFeeBox
                  key={fee.id || fee.name}
                  additionalFee={{
                    feeName: fee.name,
                    amount: Number(fee.amount),
                    paymentFrequency: fee.frequency,
                    feeRequirement: fee.condition,
                  }}
                />
              ))}
            </div>
          </div>
        )}
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
