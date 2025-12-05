import { blockItems } from '@/features/property-owners/constants';
import { Button, DialogComponent, Switch } from '@/shared/components';
import {
  Form,
  FormInput,
  FormSelect,
  FormTextarea,
} from '@/shared/components/Form';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  Cancel01Icon,
} from 'hugeicons-react';
import { ListingLinks, listingTypeOptions } from '../../../constants';
import { useBlock, useListingDescription } from '../../../hooks';
import { ListingTitle, NavigateButtons } from '../../shared';
import { AddToBlockContent } from './AddToBlockContent';
import { CreateBlockContent } from './CreateBlockContent';

type ListingDescriptionProps = {
  onNext: (() => void) | undefined;
};

export const ListingDescription = ({ onNext }: ListingDescriptionProps) => {
  const {
    isButtonDisabled,
    form,
    onSubmit,
    openBlock,
    setOpenBlock,
    isAddListingToBlock,
    setIsAddListingToBlock,
    handleAddToBlock,
  } = useListingDescription(onNext);
  const {
    blockState,
    setBlockState,
    formBlock,
    isBlockBtnDisabled,
    onBlockSubmit,
  } = useBlock(setOpenBlock);
  const navigate = useNavigate();
  const search = useSearch({ from: ListingLinks.LISTINGS });
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
              <p>Add listing to a block</p>
              <Switch
                onCheckedChange={setIsAddListingToBlock}
                checked={isAddListingToBlock}
              />
            </div>
            {isAddListingToBlock && (
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setOpenBlock(true)}
                className={`w-full ${search.blockName ? 'justify-between' : 'justify-end'} rounded-10 py-0 text-body text-black-400`}
              >
                {search?.blockName}
                <ArrowDown01Icon />
              </Button>
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
              />
              <FormInput
                control={form.control}
                name="noOfBathrooms"
                label="No of bathrooms"
                size="sm"
                showErrorMessage
              />
              <FormInput
                control={form.control}
                name="sizeSqFt"
                label="Size.sq.ft"
                size="sm"
                showErrorMessage
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
        onBack={() => navigate({ to: ListingLinks.LISTINGS_GET_STARTED })}
        onContinue={form.handleSubmit(onSubmit)}
      />

      <DialogComponent
        open={openBlock}
        onOpenChange={setOpenBlock}
        className="w-full lg:w-2/3 xl:w-1/3"
        children={
          <div className="flex flex-col p-6 gap-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {blockState === 'CREATE_BLOCK' && (
                  <button
                    onClick={() => setBlockState('ADD_TO_BLOCK')}
                    className="hover:opacity-70 transition-opacity"
                  >
                    <ArrowLeft01Icon className="size-5" />
                  </button>
                )}
                <h1 className="text-heading-5 text-black-500">
                  {blockState === 'ADD_TO_BLOCK'
                    ? 'Add to block'
                    : 'Create block'}
                </h1>
              </div>

              <button
                onClick={() => setOpenBlock(false)}
                className="hover:opacity-70 transition-opacity"
              >
                <Cancel01Icon className="size-6 text-black-400" />
              </button>
            </div>
            {blockState === 'ADD_TO_BLOCK' ? (
              <AddToBlockContent
                blockItems={blockItems}
                onBlockClick={handleAddToBlock}
                onCreateNew={() => setBlockState('CREATE_BLOCK')}
                onClose={() => setOpenBlock(false)}
              />
            ) : (
              <CreateBlockContent
                form={formBlock}
                onSubmit={onBlockSubmit}
                onClose={() => setOpenBlock(false)}
                isDisabled={isBlockBtnDisabled}
              />
            )}
          </div>
        }
      />
    </div>
  );
};
