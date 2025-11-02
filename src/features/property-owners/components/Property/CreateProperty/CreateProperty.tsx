import { Links } from '@/features/property-owners/constants';
import {
  useCreateProperty,
  usePropertyInfoStep,
} from '@/features/property-owners/hooks';
import { useCreatePropertyStore } from '@/features/property-owners/store';
import { Button, Separator } from '@/shared/components';
import { useNavigate } from '@tanstack/react-router';
import { Cancel01Icon } from 'hugeicons-react';
import { PropertyCreateInfo } from './PropertyCreateInfo';
import { PropertyListingType } from './PropertyListingType';

export const CreateProperty = () => {
  const step = useCreatePropertyStore((s) => s.step);
  const prev = useCreatePropertyStore((s) => s.prev);

  const { form, onSubmit, isButtonDisabled } = usePropertyInfoStep();
  const {
    formCreate,
    isCreateButtonDisabled,
    onSubmitCreate,
    isOpen,
    setIsOpen,
  } = useCreateProperty();
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className=" border-b-gray-50 border-b">
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
      <div className="px-5 py-10 flex-grow">
        {step === 1 && <PropertyCreateInfo form={form} onSubmit={onSubmit} />}
        {step === 2 && (
          <PropertyListingType
            form={formCreate}
            onSubmit={onSubmitCreate}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
      {step === 1 && (
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
            Continue
          </Button>
        </div>
      )}
      {step === 2 && (
        <div className="flex px-8 gap-4 pb-10 align-baseline items-end justify-end">
          <Button variant="tertiary" onClick={() => prev()}>
            Back
          </Button>
          <Button
            disabled={isCreateButtonDisabled}
            onClick={formCreate.handleSubmit(onSubmitCreate)}
          >
            Create property
          </Button>
        </div>
      )}
    </div>
  );
};
