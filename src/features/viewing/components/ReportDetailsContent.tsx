import { Button } from '@/shared/components';
import { Form, FormTextarea } from '@/shared/components/Form';
import { Album02Icon, ArrowLeft01Icon } from 'hugeicons-react';
import { useRef } from 'react';
import type { UseFormReturn } from 'react-hook-form';

type ReportDetailsContentProps = {
  onBack: () => void;
  onSubmit: (data: { description: string; evidence?: any }) => void;
  form: UseFormReturn<{
    description: string;
    evidence?: any;
  }>;
  isButtonDisabled: boolean;
};

export const ReportDetailsContent = ({
  onBack,
  onSubmit,
  form,
  isButtonDisabled,
}: ReportDetailsContentProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedFile = form.watch('evidence');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('evidence', file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6 space-y-6 h-full lg:h-auto flex flex-col justify-between">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <ArrowLeft01Icon
            className="size-6 cursor-pointer text-black-400"
            onClick={onBack}
          />
          <h2 className="text-heading-5 text-neutral-600">
            Provide more details
          </h2>
        </div>

        <Form form={form} onSubmit={onSubmit}>
          <div className="space-y-6">
            <FormTextarea
              control={form.control}
              name="description"
              label="Description of issue"
              placeholder="Please provide as much details as possible"
              rows={5}
            />

            <div className="space-y-3">
              <label className="text-body-sm-semi text-neutral-600">
                Evidence (optional)
              </label>
              <div className="border border-dashed bg-sidebar-accent border-custom-gray-500 rounded-[1.25em] p-6 flex flex-col items-center justify-center space-y-4">
                <div className="size-20 rounded-full bg-white grid place-items-center">
                  <Album02Icon className="size-5 text-black-400" />
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpeg,.jpg,.png,.mp4"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleUploadClick}
                >
                  Upload
                </Button>

                <p className="text-body-small text-neutral-600/50 text-center">
                  {selectedFile
                    ? selectedFile.name
                    : 'Jpeg, Png, Mp4 max file size of 40mb'}
                </p>
              </div>
            </div>
          </div>
        </Form>
      </div>

      <div className="flex justify-end gap-3 pt-4 lg:h-auto pb-10 lg:pb-4">
        <Button
          variant="tertiary"
          size="lg"
          className="lg:w-auto w-1/2"
          onClick={onBack}
        >
          Cancel
        </Button>
        <Button
          size="lg"
          onClick={form.handleSubmit(onSubmit)}
          className="lg:w-auto w-1/2"
          disabled={isButtonDisabled}
        >
          Submit report
        </Button>
      </div>
    </div>
  );
};
