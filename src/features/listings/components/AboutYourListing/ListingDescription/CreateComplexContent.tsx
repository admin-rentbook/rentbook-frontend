import type { ComplexFormData } from '@/features/listings/hooks';
import { Button } from '@/shared/components';
import { Form, FormInput } from '@/shared/components/Form';
import type { UseFormReturn } from 'react-hook-form';

type CreateBlockContentProps = {
  form: UseFormReturn<ComplexFormData>;
  onSubmit: (data: ComplexFormData) => void;
  onClose: () => void;
  isDisabled: boolean;
  isLoading: boolean;
};
export const CreateComplexContent = ({
  form,
  onSubmit,
  onClose,
  isDisabled,
  isLoading,
}: CreateBlockContentProps) => (
  <>
    <Form form={form} onSubmit={onSubmit}>
      <FormInput
        label="Complex name"
        control={form.control}
        name="complexName"
        placeholder="Enter complex name"
      />
    </Form>

    <div className="flex items-center justify-end gap-4 pt-4">
      <Button variant="tertiary" onClick={onClose}>
        Cancel
      </Button>
      <Button
        disabled={isDisabled}
        isLoading={isLoading}
        onClick={form.handleSubmit(onSubmit)}
      >
        Create complex
      </Button>
    </div>
  </>
);
