import { useMedia } from '@/features/listings/hooks';
import { Button, PropertyImage } from '@/shared/components';
import { Add01Icon } from 'hugeicons-react';
import { ListingTitle, NavigateButtons } from '../../shared';
import { ImagePreviewCard } from './ImagePreviewCard';
import { UploadProgress } from './UploadProgress';
import { ImageLoadingSkeleton } from './ImageLoadingSkeleton';

type AddImagesProps = {
  onNext: (() => void) | undefined;
  onPrev: (() => void) | undefined;
};
export const AddImages = ({ onNext, onPrev }: AddImagesProps) => {
  const {
    previewUrls,
    fileInputRef,
    handleFileSelect,
    handleDeleteImage,
    openFilePicker,
    cannotProceed,
    handleSubmitImages,
    isUploading,
    uploadProgress,
    isLoadingMedia,
    deletingImageId,
    mediaMetadata,
  } = useMedia(onNext);
  return (
    <div className="flex flex-col h-full gap-10">
      <div className="xl:w-3/5 2xl:w-1/2">
        <ListingTitle
          title="Add images that showcases your listing"
          description="You will need a minimum of 5 images. You can add more or make changes later"
        />
        <div className="pt-10">
          {/* Show loading skeleton while fetching media */}
          {isLoadingMedia && previewUrls.length === 0 ? (
            <ImageLoadingSkeleton />
          ) : previewUrls.length === 0 ? (
            <div className="flex items-center py-20  justify-center border border-dashed rounded-[1.25em] border-custom-gray-500 bg-sidebar">
              <div className="flex flex-col gap-12">
                <PropertyImage width={170} height={150} />
                <div className="flex justify-center">
                  <Button variant="outline" size="lg" onClick={openFilePicker}>
                    Add media
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        {previewUrls.length !== 0 && (
          <div className="grid grid-cols-2 grid-rows-3 gap-4">
            {previewUrls.map((url, index) => {
              const media = mediaMetadata[index];
              const isDeleting = media?.id ? deletingImageId === media.id : false;

              return index === 0 ? (
                <div key={`image-${index}`} className="row-span-1 col-span-2">
                  <ImagePreviewCard
                    url={url}
                    index={index}
                    onRemove={handleDeleteImage}
                    isDeleting={isDeleting}
                    mediaId={media?.id}
                  />
                </div>
              ) : (
                <div key={`image-${index}`} className="col-span-1 row-span-1">
                  <ImagePreviewCard
                    url={url}
                    index={index}
                    onRemove={handleDeleteImage}
                    isDeleting={isDeleting}
                    mediaId={media?.id}
                  />
                </div>
              );
            })}
            <div
              className="rounded-[1.25em] flex items-center justify-center border-custom-gray-500  bg-sidebar cursor-pointer"
              onClick={openFilePicker}
            >
              <Add01Icon className="size-[50px] text-black-400" />
            </div>
          </div>
        )}

        {isUploading && <UploadProgress progress={uploadProgress} />}
      </div>
      <NavigateButtons
        isButtonDisabled={cannotProceed}
        onBack={() => onPrev?.()}
        onContinue={handleSubmitImages}
        isLoading={isUploading}
      />
    </div>
  );
};
