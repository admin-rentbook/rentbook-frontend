import SuccessIcon from '@/assets/icons/success-icon.svg?react';
import { Links } from '@/features/property-owners/constants';
import { useCreateProperty } from '@/features/property-owners/hooks';
import { Button, Separator } from '@/shared/components';
import { Form } from '@/shared/components/Form';
import { NotificationModal } from '@/shared/components/NotificationModal';
import { useNavigate } from '@tanstack/react-router';
import { Cancel01Icon } from 'hugeicons-react';
import { PropertyCreateInfo } from './PropertyCreateInfo';
import { PropertyListingType } from './PropertyListingType';

export const CreateProperty = () => {
  const { form, isButtonDisabled, onSubmit, isOpen, setIsOpen } =
    useCreateProperty();
  const navigate = useNavigate();
  return (
    <>
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
      <div className="h-screen flex flex-col justify-between relative">
        <div className="fixed top-0 left-0 right-0 border-b-gray-50 z-1 bg-white border-b">
          <div className="flex items-center p-5 text-heading-4 text-black-400 gap-4">
            <Button
              variant="icon"
              onClick={() => navigate({ to: Links.PROPERTIES })}
            >
              <Cancel01Icon className="size-6" />
            </Button>
            <Separator
              orientation="vertical"
              className="border-custom-gray-500 h-8"
            />
            <h5 className="text-black-400">Create property</h5>
          </div>
        </div>
        <div className='pt-20 overflow-y-auto'>
          <Form form={form} onSubmit={onSubmit}>
            <div className="px-5 py-10 flex-grow">
              <PropertyCreateInfo form={form} />
              <PropertyListingType form={form} />
            </div>
          </Form>
          <div className="flex px-8 gap-4 pb-10 align-baseline items-end justify-end">
            <Button
              variant="tertiary"
              onClick={() => navigate({ to: Links.PROPERTIES })}
            >
              Cancel
            </Button>
            <Button
              disabled={isButtonDisabled}
              onClick={form.handleSubmit(onSubmit)}
            >
              Create property
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
