import { useCreateProperty } from '@/features/property-owners/hooks';
import { Form, FormInput } from '@/shared/components/Form';
import { Address } from './Address';

export const PropertyCreateInfo = () => {
  const { form, onSubmit } = useCreateProperty();
  return (
    <div className="flex items-center justify-center">
      <Form form={form} onSubmit={onSubmit}>
        <div className="flex flex-col gap-20">
          <div className="flex flex-col">
            <h2 className="text-heading-xl text-neutral-600">
              What would you like to call your property
            </h2>
            <p className="text-body-base text-black-400 pt-4">
              Property seekers will not see this name. It is solely to help you
              group listings
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
          <div className="flex flex-col">
            <h2 className="text-heading-xl text-neutral-600">
              What would you like to call your property
            </h2>
            <p className="text-body-base text-black-400 pt-4">
              Property seekers will not see this name. It is solely to help you
              group listings
            </p>
            <div className="pt-10">
              <Address />
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
