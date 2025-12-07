import { SelectCard } from '@/shared/components';
import { Form, FormInput } from '@/shared/components/Form';
import { currencyFormatter } from '@/shared/utils';
import { bookViewingTypes } from '../../constants';
import type { UseViewingFee } from '../../hooks';

type ViewingFeeProps = {
  viewFeeHook: UseViewingFee;
};

export const ViewingFee = ({ viewFeeHook }: ViewingFeeProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 pt-4">
        <div className="flex flex-col">
          <h1 className="text-heading-3-semibold text-black-500 leading-snug">
            Viewing fee
          </h1>
          <p className="text-body-base-normal text-black-400">
            How much would you like to charge for each viewing
          </p>
        </div>
        <Form form={viewFeeHook.form} onSubmit={viewFeeHook.onSubmit}>
          <FormInput
            label="Viewing fee"
            control={viewFeeHook.form.control}
            name="viewingFee"
            size="4xl"
            className="placeholder:font-semibold text-center text-icons-black/50"
            placeholder="N$10"
            formatter={currencyFormatter}
            descriptionNode={
              <p className="text-body text-black-400">
                Viewers pays N$11.75 (Addition of %5 service fee){' '}
                <span className="underline cursor-pointer">
                  Learn about pricing
                </span>
              </p>
            }
          />
        </Form>
      </div>
      <div className="flex flex-col gap-6 pt-4">
        <div className="flex flex-col">
          <h1 className="text-heading-3-semibold text-black-500 leading-snug">
            Choose a way to book viewing
          </h1>
          <p className="text-body-base-normal text-black-400">
            You can change your settings anytime
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {bookViewingTypes.map((bookViewType) => (
            <SelectCard
              key={bookViewType.value}
              subHeaderClassName="text-primary-500"
              type={bookViewType}
              isSelected={viewFeeHook.isSelected(bookViewType.value)}
              isHovered={viewFeeHook.isHovered(bookViewType.value)}
              onSelect={() =>
                viewFeeHook.handleSelectBookViewTypeChange(bookViewType.value)
              }
              onMouseEnter={() =>
                viewFeeHook.handleMouseEnter(bookViewType.value)
              }
              onMouseLeave={viewFeeHook.handleMouseLeave}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
