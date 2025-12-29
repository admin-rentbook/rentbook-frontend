import { Button } from '@/shared/components';
import { Form, FormInput } from '@/shared/components/Form';
import { useEffect } from 'react';
import { useKyc } from '../../hooks/useKyc';
import { UploadCard } from './UploadCard';

export const Kyc = () => {
  const {
    form,
    frontIdCard,
    backIdCard,
    isSubmitting,
    uploadError,
    handleFileSelect,
    removeFile,
    onSubmit,
    cleanup,
    isButtonDisabled,
  } = useKyc();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-50">
      <div className="w-full lg:max-w-xl">
        <div className="mb-8">
          <h1 className="text-heading text-black-500 mb-3">
            Verify your identity
          </h1>
          <p className="text-body-base-normal text-black-300">
            Rentbook requires only verified users to publish listings. We'll
            gather some information to verify your identity. Read how we manage
            your data in our{' '}
            <a
              href="/data-policy"
              className="text-primary-500 underline hover:text-primary-600"
            >
              data policy
            </a>
            .
          </p>
        </div>

        <Form form={form} onSubmit={onSubmit}>
          <div className="flex flex-col gap-6">
            <p className="text-body-small text-black-300">
              Upload images of your identity card. Make sure your photos are not
              blurry and the front of your identity card clearly shows your
              face.
            </p>

            {/* Upload Cards Grid */}
            <div className="grid grid-cols-1 gap-4">
              <UploadCard
                label="Upload front"
                file={frontIdCard}
                onFileSelect={(e) => handleFileSelect(e, 'front')}
                onRemove={() => removeFile('front')}
                disabled={isSubmitting}
              />
              <UploadCard
                label="Upload back"
                file={backIdCard}
                onFileSelect={(e) => handleFileSelect(e, 'back')}
                onRemove={() => removeFile('back')}
                disabled={isSubmitting}
              />
            </div>

            {/* Error Message */}
            {uploadError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-body-small text-red-600">{uploadError}</p>
              </div>
            )}

            {/* Namibian Registration Number */}
            <FormInput
              name="namibianRegNo"
              control={form.control}
              label="Namibian registration number"
              placeholder="Enter your registration number"
              required
              disabled={isSubmitting}
              showErrorMessage
            />

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isButtonDisabled}
              isLoading={isSubmitting}
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
