import { Button } from '@/shared/components';
import { Form, FormInput } from '@/shared/components/Form';
import { useSearch } from '@tanstack/react-router';
import { useVerifyEmail } from '../hooks';

export const VerifyEmail = () => {
  const {
    form,
    isButtonDisabled,
    onSubmit,
    timeLeft,
    isLoading,
    isOtpLoading,
    handleSendOtp,
  } = useVerifyEmail();
  const search = useSearch({ from: '/' });
  const email = search?.email;
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
            <p className="text-body-small text-custom-neutral-900-light">{`Time left: ${timeLeft}`}</p>
            <div className="flex items-center">
              <p className="text-body-small text-neutral-600">
                Didn't receive any OTP?{' '}
              </p>
              <Button
                variant="link"
                isLoading={isOtpLoading}
                onClick={handleSendOtp}
                size="sm"
                type="button"
                disabled={isOtpLoading}
              >
                Resend OTP
              </Button>
            </div>
          </div>
          <Button disabled={isButtonDisabled} size="lg" isLoading={isLoading}>
            Continue
          </Button>
        </div>
      </Form>
    </>
  );
};
