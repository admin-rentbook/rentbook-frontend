import { useCreatePropertyStore } from '@/features/property-owners/store';
import { Button, Separator } from '@/shared/components';
import { Cancel01Icon } from 'hugeicons-react';
import { PropertyCreateInfo } from './PropertyCreateInfo';
import { PropertyListingType } from './PropertyListingType';
export const CreateProperty = () => {
  const step = useCreatePropertyStore((s) => s.step);
  return (
    <div>
      <div className=" border-b-gray-50 border-b">
        <div className="flex items-center p-5 text-heading-4 text-black-400 gap-4">
          <Button variant="icon">
            <Cancel01Icon className="size-6" />
          </Button>
          <Separator
            orientation="vertical"
            className="border-custom-gray-500 h-8"
          />
          <h5 className="text-black-400">Create property</h5>
        </div>
      </div>
      <div className="px-5 py-10">
        {step === 1 && <PropertyCreateInfo />}
        {step === 2 && <PropertyListingType />}
      </div>
    </div>
  );
};
