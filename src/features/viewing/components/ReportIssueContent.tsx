import { Button } from '@/shared/components';
import { Form, FormRadio } from '@/shared/components/Form';
import { useMobile } from '@/shared/hooks';
import { Cancel01Icon } from 'hugeicons-react';
import type { UseFormReturn } from 'react-hook-form';

type ReportIssueContentProps = {
  onClose: () => void;
  onContinue: () => void;
  form: UseFormReturn<{
    issue: string;
  }>;
  onSubmit: (data: { issue: string }) => void;
  isButtonDisabled: boolean;
};

const issueOptions = [
  {
    label: 'Renter did not show up for viewing',
    value: 'no_show',
  },
  {
    label: 'The renter arrived very late to the viewing',
    value: 'late_arrival',
  },
  {
    label: "I couldn't reach the renter",
    value: 'unreachable',
  },
  {
    label: 'Something else',
    value: 'other',
  },
];

export const ReportIssueContent = ({
  onClose,
  onContinue,
  form,
  onSubmit,
  isButtonDisabled,
}: ReportIssueContentProps) => {
  const { isMobile } = useMobile();

  return (
    <div className="p-6 space-y-6 h-full lg:h-auto flex flex-col justify-between">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <h2 className="text-heading-5 text-neutral-600">Report an issue</h2>
          {!isMobile && (
            <Cancel01Icon
              className="size-6 cursor-pointer text-black-400"
              onClick={onClose}
            />
          )}
        </div>

        <p className="text-body-small text-black-400">
          Rentbook is committed to the safety of everyone who uses the platform.
          Any aggressive, confrontational or harassing behaviour is not
          tolerated.
        </p>

        <p className="text-body-small text-black-400">
          If there was an issue with your viewing please let us know. This won't
          be shared with the agent/owner.
        </p>

        <Form form={form} onSubmit={onSubmit}>
          <FormRadio
            control={form.control}
            name="issue"
            options={issueOptions}
            showErrorMessage={false}
            itemClassName="border-b border-custom-gray-100 py-4 first:pt-0 last:border-b-0 flex items-center gap-3"
          />
        </Form>
      </div>

      <div className="flex justify-end gap-3 pt-4 lg:h-auto pb-10 lg:pb-4">
        <Button
          variant="tertiary"
          size="lg"
          className="lg:w-auto w-1/2"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          size="lg"
          onClick={onContinue}
          className="lg:w-auto w-1/2"
          disabled={isButtonDisabled}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};