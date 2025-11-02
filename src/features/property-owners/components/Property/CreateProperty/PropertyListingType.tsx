import SuccessIcon from '@/assets/icons/success-icon.svg?react';
import { LISTING_TYPE } from '@/features/property-owners/constants';
import type { CreatePropertyData } from '@/features/property-owners/types/property';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@/shared/components';
import { Form } from '@/shared/components/Form';
import { NotificationModal } from '@/shared/components/NotificationModal';
import { cn } from '@/shared/lib/utils';
import type { UseFormReturn } from 'react-hook-form';
import { OwnerForm } from './OwnerForm';

type PropertyListingTypeProps = {
  form: UseFormReturn<CreatePropertyData>;
  onSubmit: (data: CreatePropertyData) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const PropertyListingType = ({
  form,
  onSubmit,
  isOpen,
  setIsOpen,
}: PropertyListingTypeProps) => {
  const listingType = form.watch('listingType');
  // const
  return (
    <div>
      <NotificationModal
        modalOptions={{ open: isOpen, onOpenChange: setIsOpen }}
        title="Property created!"
        description="You have successfully created a new property. You can create multiple listings under this property"
        icon={SuccessIcon}
        actions={
          <div className="flex gap-2 w-full justify-end px-4">
            <Button variant="tertiary">Go to dashboard</Button>
            <Button>Next: Create listing</Button>
          </div>
        }
      />
      <div className="flex items-center justify-center">
        <Form form={form} onSubmit={onSubmit}>
          <div className="flex flex-col gap-20">
            <div className="flex flex-col">
              <h2 className="text-heading-xl text-neutral-600">
                Who is listing this property on Rentbook?
              </h2>
              <p className="text-body-base text-black-400 pt-4">
                Select which applies
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-body-medium text-black-500">Listed by</p>
              <FormField
                control={form.control}
                name="listingType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col gap-3"
                      >
                        {listingItems.map((item) => {
                          const isActive = field.value === item.value;
                          return (
                            <Label
                              key={item.id}
                              htmlFor={item.id}
                              className={cn(
                                'flex items-center gap-[10px] border rounded-10 p-[10px] cursor-pointer transition-colors',
                                isActive
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-neutral-200 hover:border-neutral-300'
                              )}
                            >
                              <RadioGroupItem
                                value={item.value}
                                id={item.id}
                                className={
                                  !isActive ? 'border-neutral-200' : ''
                                }
                              />
                              <span className="text-body-medium text-black-500">
                                {item.title}
                              </span>
                            </Label>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {listingType === LISTING_TYPE.AGENT && <OwnerForm form={form} />}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

const listingItems = [
  {
    id: 'r1',
    title: 'Property owner',
    value: LISTING_TYPE.OWNER,
  },
  {
    id: 'r2',
    title: 'Agent',
    value: LISTING_TYPE.AGENT,
  },
];
