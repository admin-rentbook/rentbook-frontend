import { Button } from '@/shared/components';
import { Form, FormInput } from '@/shared/components/Form';
import type { UseFormReturn } from 'react-hook-form';

type CreateBlockContentProps = {
  form: UseFormReturn<{
    blockName: string;
  }>;
  onSubmit: (data: { blockName: string }) => void;
  onClose: () => void;
  isDisabled: boolean;
};
export const CreateBlockContent = ({
  form,
  onSubmit,
  onClose,
  isDisabled,
}: CreateBlockContentProps) => (
  <>
    <Form form={form} onSubmit={onSubmit}>
      <FormInput
        label="Complex name"
        control={form.control}
        name="blockName"
        placeholder="Enter complex name"
      />
    </Form>

    <div className="flex items-center justify-end gap-4 pt-4">
      <Button variant="tertiary" onClick={onClose}>
        Cancel
      </Button>
      <Button disabled={isDisabled} onClick={form.handleSubmit(onSubmit)}>
        Create complex
      </Button>
    </div>
  </>
);
