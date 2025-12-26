import { Button } from '@/shared/components';
import { Form, FormInput } from '@/shared/components/Form';
import { CheckmarkCircle01Icon } from 'hugeicons-react';
import type { UseFormReturn } from 'react-hook-form';

type CompletionCodeSectionProps = {
  form: UseFormReturn<{
    completionCode: string;
  }>;
  onSubmit: (data: { completionCode: string }) => void;
  isButtonDisabled: boolean;
};

export const CompletionCodeSection = ({
  form,
  onSubmit,
  isButtonDisabled,
}: CompletionCodeSectionProps) => {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="border border-custom-gray-300 p-3 space-y-5 rounded-3xl">
        <p className="text-body-small text-black-300">
          Enter complete code given by the renter to indicate that viewing has
          been completed
        </p>
        <FormInput
          control={form.control}
          name="completionCode"
          label="Completion code"
          showErrorMessage
          size="sm"
        />
        <div className="pt-3">
          <Button size="lg" className="w-full" disabled={isButtonDisabled}>
            <CheckmarkCircle01Icon />
            Complete viewing
          </Button>
        </div>
      </div>
    </Form>
  );
};