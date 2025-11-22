import { Button } from '@/shared/components';
import { Form, FormInput } from '@/shared/components/Form';
import { useResetPassword } from '../hooks';
import { PasswordRequirements } from './PasswordRequirements';

export const ResetPasswordForm = () => {
  const {
    form,
    isButtonDisabled,
    onSubmit,
    handleBack,
    handlePasswordBlur,
    handlePasswordFocus,
    isPasswordFocused,
    isLoading,
  } = useResetPassword();

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-heading-xl text-black-500">Reset Password</h3>
          <p className="text-body-base text-black-400">
            Enter details to reset your password
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <FormInput
            control={form.control}
            name="password"
            label="Password"
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            type="password"
          />
          <PasswordRequirements
            password={form.watch('password')}
            isVisible={isPasswordFocused}
          />
        </div>
        <FormInput
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          showErrorMessage
          type="password"
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
            Reset password
          </Button>
        </div>
      </div>
    </Form>
  );
};
