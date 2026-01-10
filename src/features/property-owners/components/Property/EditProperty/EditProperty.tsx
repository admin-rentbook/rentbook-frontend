import SuccessIcon from '@/assets/icons/success-icon.svg?react';
import { PropertyDetailsLinks } from '@/features/property-details';
import { Links } from '@/features/property-owners/constants';
import { useEditProperty } from '@/features/property-owners/hooks';
import { Button, ErrorState } from '@/shared/components';
import { Form } from '@/shared/components/Form';
import { NotificationModal } from '@/shared/components/NotificationModal';
import { useNavigate } from '@tanstack/react-router';
import { Cancel01Icon } from 'hugeicons-react';
import { PropertyCreateInfo } from '../CreateProperty/PropertyCreateInfo';
import { PropertyListingType } from '../CreateProperty/PropertyListingType';

export const EditProperty = () => {
  const {
    form,
    isButtonDisabled,
    onSubmit,
    isOpen,
    setIsOpen,
    setLocationResult,
    isLoading,
    isLoadingProperty,
    error,
    isError,
    refetch,
  } = useEditProperty();
  const navigate = useNavigate();

  if (isLoadingProperty) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-body text-black-400">Loading property details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <ErrorState error={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <>
      <NotificationModal
        modalOptions={{ open: isOpen, onOpenChange: setIsOpen }}
        title="Property updated!"
        description="You have successfully updated the property details."
        icon={SuccessIcon}
        className="w-full md:w-1/2 xl:w-1/3"
        actions={
          <div className="flex gap-2 w-full justify-center lg:justify-end px-4">
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full lg:w-auto h-11 lg:h-8"
            >
              Close
            </Button>
          </div>
        }
      />

      {/**Edit Property Header */}
      <div className="h-screen flex flex-col relative">
        <div className=" top-0 left-0 right-0 border-b-gray-50 z-1 bg-white border-b-0 lg:border-b">
          <div className="flex items-center h-[68px] p-1 lg:p-5 text-heading-4 text-black-400 gap-4">
            <Button
              variant="icon"
              onClick={() =>
                navigate({
                  to: PropertyDetailsLinks.PROPERTY_DETAILS,
                  search: (prev) => ({
                    ...prev,
                    propertyId: prev.propertyId,
                  }),
                })
              }
            >
              <Cancel01Icon className="size-6" />
            </Button>
            <div className="h-8 w-0.5 bg-custom-gray-500" />
            <h5 className="text-black-400">Edit property</h5>
          </div>
        </div>

        <div className="pt-6 lg:pt-20 h-full px-4 md:px-10">
          <div className="h-full grid place-items-center gap-4">
            <div className="">
              <Form form={form} onSubmit={onSubmit}>
                <div className="flex-grow">
                  <PropertyCreateInfo
                    form={form}
                    setLocationResult={setLocationResult}
                  />
                  <PropertyListingType form={form} />
                </div>
              </Form>
            </div>

            <div className="flex pb-5 lg:pt-10 h-fit gap-3 w-full justify-center lg:justify-end">
              <Button
                variant="tertiary"
                onClick={() => navigate({ to: Links.PROPERTIES })}
                size="lg"
                className="w-1/2 lg:w-auto"
              >
                Cancel
              </Button>
              <Button
                disabled={isButtonDisabled}
                onClick={form.handleSubmit(onSubmit)}
                size="lg"
                className="w-1/2 lg:w-auto"
                isLoading={isLoading}
              >
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
