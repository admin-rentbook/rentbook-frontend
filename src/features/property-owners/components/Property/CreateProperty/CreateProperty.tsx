import SuccessIcon from '@/assets/icons/success-icon.svg?react';
import createPropertyImage from '@/assets/images/create-property-image.png';
import { ListingLinks } from '@/features/listings/constants';
import { Links } from '@/features/property-owners/constants';
import { useCreateProperty } from '@/features/property-owners/hooks';
import { Button } from '@/shared/components';
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
        className="w-full md:w-1/2 xl:w-1/3"
        actions={
          <div className="flex gap-2 w-full justify-center lg:justify-end px-4">
            <Button
              variant="tertiary"
              className="w-1/2 lg:w-auto h-11 lg:h-8"
              onClick={() => navigate({ to: Links.PROPERTIES })}
            >
              Go to dashboard
            </Button>
            <Button
              onClick={() =>
                navigate({ to: ListingLinks.LISTINGS_GET_STARTED })
              }
              className="w-1/2 lg:w-auto h-11 lg:h-8"
            >
              Next: Create listing
            </Button>
          </div>
        }
      />
      <div className="h-screen flex flex-col relative">
        <div className=" top-0 left-0 right-0 border-b-gray-50 z-1 bg-white border-b-0 lg:border-b">
          <div className="flex items-center h-[68px] p-1 lg:p-5 text-heading-4 text-black-400 gap-4">
            <Button
              variant="icon"
              onClick={() => navigate({ to: Links.PROPERTIES })}
            >
              <Cancel01Icon className="size-6" />
            </Button>
            <div className="h-8 w-0.5 bg-custom-gray-500" />
            <h5 className="text-black-400">Create property</h5>
          </div>
        </div>
        <div className="pt-6 lg:pt-20 h-full px-4 md:px-10">
          <div className="h-full grid grid-cols-3 gap-4">
            <div className="col-span-3 lg:col-span-2 order-1">
              <Form form={form} onSubmit={onSubmit}>
                <div className="flex-grow">
                  <PropertyCreateInfo form={form} />
                  <PropertyListingType form={form} />
                </div>
              </Form>
            </div>

            <div className="col-span-3 lg:col-span-1 order-3 lg:order-2 flex justify-center">
              <div className="flex h-fit flex-col gap-4 bg-red-50/50 w-full 2xl:w-5/7 p-6 rounded-[32px]">
                <img
                  src={createPropertyImage}
                  alt="create-property"
                  className="bg-contain w-[160px]"
                />
                <h5 className="text-heading-xl-semibold text-neutral-600">
                  Create properties on rentbook
                </h5>
                <p className="text-body-small text-black-400">
                  Properties are a way to group your listings. A property could
                  be an estate, apartment complex, anything that helps group
                  your units.{' '}
                  <span className="text-primary-500 underline">Learn more</span>
                </p>
              </div>
            </div>

            <div className="col-span-3 order-4 lg:order-3">
              <div className="flex flex-col lg:flex-row  pb-5 gap-4 h-full align-baseline lg:items-end lg:justify-end">
                <div className="hidden lg:block">
                  <Button
                    variant="tertiary"
                    onClick={() => navigate({ to: Links.PROPERTIES })}
                    size="lg"
                  >
                    Cancel
                  </Button>
                </div>
                <div>
                  <Button
                    disabled={isButtonDisabled}
                    onClick={form.handleSubmit(onSubmit)}
                    size="lg"
                    className='w-full lg:w-auto'
                  >
                    Create property
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
