import { Button } from '@/shared/components';
import { useNavigate } from '@tanstack/react-router';
import { Add01Icon } from 'hugeicons-react';
import { Links } from '../../constants';

export const PropertyHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="border-b-gray-50 border-b">
      <div className="flex items-center justify-between p-5">
        <h3 className="text-heading-3 text-neutral.600">Property</h3>
        <Button onClick={() => navigate({ to: Links.CREATE_PROPERTY })}>
          <Add01Icon className="size-4" />
          <p className="text-body">New Property</p>
        </Button>
      </div>
    </div>
  );
};
