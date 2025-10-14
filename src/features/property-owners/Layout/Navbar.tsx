import { Button } from '@/shared/components';
import { Add01Icon } from 'hugeicons-react';

export const Navbar = () => {
  return (
    <div className="border border-gray-50 py-6">
      <div className="flex justify-between">
        <h4 className="text-heading-3">Property</h4>
        <Button>
          <Add01Icon />
          Property
        </Button>
      </div>
    </div>
  );
};
