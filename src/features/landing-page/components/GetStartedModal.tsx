import createPropertyImage from '@/assets/images/create-property-image.png';
import { useAppStore } from '@/core/store';
import { Links } from '@/features/property-owners/constants';
import { Button, DialogComponent } from '@/shared/components';
import { useNavigate } from '@tanstack/react-router';
import { Cancel01Icon } from 'hugeicons-react';

export const GetStartedModal = () => {
  const isOpenGetStarted = useAppStore((s) => s.isOpenGetStarted);
  const onOpenGetStarted = useAppStore((s) => s.onOpenGetStarted);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    onOpenGetStarted(false)
    navigate({ to:Links.PROPERTY_GET_STARTED })
  }
  return (
    <DialogComponent
      open={isOpenGetStarted}
      onOpenChange={onOpenGetStarted}
      className="rounded-[28px] bg-custom-gray"
      children={
        <div className="flex flex-col items-center gap-7 p-8">
          <div className="w-full flex justify-end">
            <div
              className="size-10 items-center cursor-pointer text-icons-black flex justify-center bg-white p-[10px] shadow-xs rounded-full"
              onClick={() => onOpenGetStarted(false)}
            >
              <Cancel01Icon className="size-6 " />
            </div>
          </div>
          <img
            src={createPropertyImage}
            alt="create-property"
            className="bg-contain w-[60%]"
          />
          <div className="flex flex-col items-center w-3/5 gap-2">
            <h5 className="text-heading-3-semibold text-center text-black-500">
              Want to list your own property?
            </h5>
            <p className="text-body-small text-black-400 text-center">
              Are you an agent or a property owner? List your property to begin
              renting
            </p>
          </div>
          <Button
            variant="default"
            className="w-full rounded-xl shadow-sec"
            onClick={handleGetStarted}
          >
            Get started
          </Button>
        </div>
      }
    />
  );
};
