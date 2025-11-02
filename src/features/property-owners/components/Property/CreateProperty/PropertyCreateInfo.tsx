import type { PropertyInfoData } from '@/features/property-owners/types/property';
import { Form, FormInput } from '@/shared/components/Form';
import type { UseFormReturn } from 'react-hook-form';
import { Address } from './Address';

type PropertyCreateInfoProps = {
  form: UseFormReturn<PropertyInfoData>;
  onSubmit: (data: PropertyInfoData) => void;
};

export const PropertyCreateInfo = ({
  form,
  onSubmit,
}: PropertyCreateInfoProps) => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <Form form={form} onSubmit={onSubmit}>
          <div className="flex flex-col gap-20">
            <div className="flex flex-col">
              <h2 className="text-heading-xl text-neutral-600">
                What would you like to call your property
              </h2>
              <p className="text-body-base text-black-400 pt-4">
                Property seekers will not see this name. It is solely to help
                you group listings
              </p>
              <div className="pt-10">
                <FormInput
                  control={form.control}
                  name="propertyName"
                  label="Property name"
                  size="lg"
                />
              </div>
            </div>
            <FormInput
              control={form.control}
              name="address"
              type="hidden"
            />
            <FormInput
              control={form.control}
              name="lat"
              type="hidden"
            />
            <FormInput
              control={form.control}
              name="lng"
              type="hidden"
            />
            <FormInput
              control={form.control}
              name="placeId"
              type="hidden"
            />
            <div className="flex flex-col">
              <h2 className="text-heading-xl text-neutral-600">
                What would you like to call your property
              </h2>
              <p className="text-body-base text-black-400 pt-4">
                Property seekers will not see this name. It is solely to help
                you group listings
              </p>
              <div className="pt-10">
                <Address form={form} />
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
