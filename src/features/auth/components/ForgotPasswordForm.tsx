import { Button } from '@/shared/components';
import { Form, FormInput } from '@/shared/components/Form';
import { useForgotPassword } from '../hooks';

export const ForgotPasswordForm = () => {
  const { form, isButtonDisabled, onSubmit, handleBack, isLoading } =
    useForgotPassword();

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-10">
        <div>
          <h3 className="text-heading-xl text-black-500">Forgot Password</h3>
          <p className="text-body-base text-black-400">
            An OTP will be sent to your email
          </p>
        </div>
        <FormInput
          control={form.control}
          name="email"
          label="Email"
          showErrorMessage
        />
        <div className="flex gap-5">
          <Button
            size="lg"
            variant="tertiary"
            className="w-[30%]"
            onClick={() => handleBack()}
          >
            Back
          </Button>
          <Button
            size="lg"
            className="w-[70%]"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isButtonDisabled}
            isLoading={isLoading}
          >
            Forgot password
          </Button>
        </div>
      </div>
    </Form>
  );
};
