import { complexItems } from '@/features/property-owners/constants';
import { Button, DialogComponent, Switch } from '@/shared/components';
import {
  Form,
  FormInput,
  FormSelect,
  FormTextarea,
} from '@/shared/components/Form';
import { numberFormatter } from '@/shared/utils';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { ArrowDown01Icon } from 'hugeicons-react';
import { Loader2 } from 'lucide-react';
import { listingTypeOptions } from '../../../constants';
import { useComplex, useListingDescription } from '../../../hooks';
import { ListingTitle, NavigateButtons } from '../../shared';
import { ComplexDialogContent } from './ComplexDialogContent';

type ListingDescriptionProps = {
  onNext: (() => void) | undefined;
};

export const ListingDescription = ({ onNext }: ListingDescriptionProps) => {
  const { listingId, propertyId } = useSearch({ from: '/listings-start' });
  const {
    isButtonDisabled,
    form,
    onSubmit,
    openBlock,
    setOpenBlock,
    isAddListingToComplex,
    handleToggleChange,
    selectedBlock,
    handleBlockSelect,
    isListingDescLoading,
    isPending,
    isFetching,
  } = useListingDescription(onNext, propertyId as number, listingId as number);
  const {
    complexState,
    setComplexState,
    formComplex,
    isComplexBtnDisabled,
    onComplexSubmit,
    isLoading,
  } = useComplex(setOpenBlock, propertyId);
  const navigate = useNavigate();

  if (isFetching || isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 h-full">
      <ListingTitle
        description="Create a unique title and select appropriate listing type"
        title="Give your listing a title"
      />

      <Form form={form} onSubmit={onSubmit}>
        <div className="flex flex-col gap-10 w-full xl:w-3/5">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <p>Add listing to a complex</p>
              <Switch
                onCheckedChange={(checked) => {
                  handleToggleChange(checked);
                }}
                checked={isAddListingToComplex}
              />
            </div>
            {isAddListingToComplex && (
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setOpenBlock(true)}
                  className={`w-full justify-between rounded-10 py-0 text-body text-black-400`}
                >
                  {selectedBlock ?? 'Select complex'}
                  <ArrowDown01Icon />
                </Button>
                {form.formState.errors.blockId && (
                  <p className="text-body-small text-red-300">
                    {form.formState.errors.blockId.message}
                  </p>
                )}
              </div>
            )}

            <FormInput
              control={form.control}
              name="listingTitle"
              label="Listing title"
              showErrorMessage
              size="sm"
            />
            <FormSelect
              control={form.control}
              name="listingType"
              options={listingTypeOptions}
              label="Listing type"
              size="sm"
            />
            <div className="grid grid-cols-3 gap-4">
              <FormInput
                control={form.control}
                name="noOfBeds"
                label="No of beds"
                size="sm"
                showErrorMessage
                formatter={numberFormatter}
              />
              <FormInput
                control={form.control}
                name="noOfBathrooms"
                label="No of bathrooms"
                size="sm"
                showErrorMessage
                formatter={numberFormatter}
              />
              <FormInput
                control={form.control}
                name="sizeSqFt"
                label="Size.sq.ft"
                size="sm"
                showErrorMessage
                formatter={numberFormatter}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h1 className="text-heading text-black-500">
                Describe your listing
              </h1>
              <p className="text-body-base-normal text-black-400">
                Share details that make your listing special
              </p>
            </div>
            <FormTextarea
              control={form.control}
              name="listingDescription"
              label="Description"
            />
          </div>
        </div>
      </Form>
      <NavigateButtons
        isButtonDisabled={isButtonDisabled}
        onBack={() =>
          navigate({
            to: '/property-details',
            search: (prev) => ({
              propertyId: prev.propertyId,
            }),
          })
        }
        onContinue={form.handleSubmit(onSubmit)}
        isLoading={isListingDescLoading}
      />
      <DialogComponent
        open={openBlock}
        onOpenChange={setOpenBlock}
        className="w-full lg:w-2/3 xl:w-1/3"
      >
        <ComplexDialogContent
          complexState={complexState}
          setComplexState={setComplexState}
          onClose={() => setOpenBlock(false)}
          complexItems={complexItems}
          onBlockClick={handleBlockSelect}
          formComplex={formComplex}
          onComplexSubmit={onComplexSubmit}
          isComplexBtnDisabled={isComplexBtnDisabled}
          isLoading={isLoading}
        />
      </DialogComponent>
    </div>
  );
};
