import { Button } from '@/shared/components';
import { Form, FormInput } from '@/shared/components/Form';
import { useVerifyEmail } from '../hooks';
import { useAuthStore } from '../providers';

export const VerifyEmail = () => {
  const { form, isButtonDisabled, onSubmit } = useVerifyEmail();
  const email = 'name@gmail.com';
  const step = useAuthStore((s) => s.step);
  return (
    <>
      {step === 2 && (
        <Form form={form} onSubmit={onSubmit}>
          <div className="flex flex-col gap-6  pt-4">
            <div>
              <h3 className="text-heading-xl text-black-500">
                We emailed you a code
              </h3>
              <p className="text-body-base text-black-400">{`Enter verification code we sent to ${email}`}</p>
            </div>

            <div>
              <FormInput
                control={form.control}
                name="verificationCode"
                label="Verification code"
                size="sm"
                showErrorMessage
              />
              <p className="text-body-small">{`Resend `}</p>
            </div>
            <Button disabled={isButtonDisabled} size="lg">
              Continue
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};
