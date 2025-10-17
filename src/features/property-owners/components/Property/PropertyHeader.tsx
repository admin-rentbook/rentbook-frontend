import { Button } from '@/shared/components';
import { Add01Icon } from 'hugeicons-react';

export const PropertyHeader = () => {
  return (
    <div className="border-b-gray-50 border-b">
      <div className="flex items-center justify-between p-5">
        <h3 className="text-heading-3 text-neutral.600">Property</h3>
        <Button>
          <Add01Icon className="size-4" />
          <p className="text-body">New Property</p>
        </Button>
      </div>
    </div>
  );
};

