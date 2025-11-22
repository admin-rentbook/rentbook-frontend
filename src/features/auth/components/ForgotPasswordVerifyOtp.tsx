import { Button } from '@/shared/components';
import { Form, FormInput } from '@/shared/components/Form';
import { getDataFromSessStorage } from '@/shared/utils/helpers';
import { useVerifyForgotPasswordOtp } from '../hooks';

export const ForgotPasswordVerifyOtp = () => {
  const { form, isButtonDisabled, onSubmit, timeLeft, isLoading } =
    useVerifyForgotPasswordOtp();
  const email = getDataFromSessStorage('email') as string;
  return (
    <>
      <Form form={form} onSubmit={onSubmit}>
        <div className="flex flex-col gap-6 pt-8 w-full">
          <div>
            <h3 className="text-heading-xl text-black-500">
              We emailed you a code
            </h3>
            <p className="text-body-base text-black-400">{`Enter verification code we sent to ${email}`}</p>
          </div>

          <div className="pt-3 flex flex-col gap-2">
            <FormInput
              control={form.control}
              name="otp"
              label="Verification code"
              showErrorMessage
            />
            <p className="text-body-small text-custom-neutral-900-light">{`Resend: ${timeLeft}`}</p>
          </div>
          <Button disabled={isButtonDisabled} size="lg" isLoading={isLoading}>
            Continue
          </Button>
        </div>
      </Form>
    </>
  );
};
