import type { CreatePropertyData } from '@/features/property-owners/types/property';
import { FormInput } from '@/shared/components/Form';
import type { UseFormReturn } from 'react-hook-form';

type OwnerFormProps = {
  form: UseFormReturn<CreatePropertyData>;
};
export const OwnerForm = ({ form }: OwnerFormProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-body-medium text-black-500">
        Who is the property owner?
      </p>
      <FormInput
        control={form.control}
        name="ownerName"
        label="Name of property owner"
        size="md"
        showErrorMessage
      />
      <FormInput
        control={form.control}
        name="ownerEmail"
        label="Email address"
        size="md"
        showErrorMessage
      />
      <FormInput
        control={form.control}
        name="ownerPhone"
        label="Phone number"
        size="md"
        showErrorMessage
      />
      <p className="text-body-small text-black-400">
        An email will be sent to the property owner to confirm this listing
        before it is live
      </p>
    </div>
  );
};
