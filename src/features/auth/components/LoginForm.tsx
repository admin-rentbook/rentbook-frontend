import GoogleIcon from '@/assets/icons/google_icon.svg?react';
import { Button, Separator } from '@/shared/components';
import { Form, FormInput } from '@/shared/components/Form';
import { useLogin } from '../hooks';

export const LoginForm = () => {
  const {
    form,
    isButtonDisabled,
    onSubmit,
    handleForgotPassword,
    isLoading,
    isGoogleAuthLoading,
    googleAuthUrl,
  } = useLogin();
  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-6">
        <FormInput
          control={form.control}
          name="email"
          label="Email"
          showErrorMessage
        />
        <div className="flex flex-col">
          <FormInput
            control={form.control}
            name="password"
            label="Password"
            showErrorMessage
            type="password"
          />
          <div className="pt-2">
            <Button
              variant="primary-soft"
              type="button"
              className="font-normal"
              onClick={() => handleForgotPassword()}
            >
              Forgot password?
            </Button>
          </div>
        </div>
        <Button
          size="lg"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isButtonDisabled}
          isLoading={isLoading}
        >
          Log in
        </Button>
        <Separator className="border border-custom-neutral-200" />
        <Button
          variant="tertiary"
          size="lg"
          onClick={() => (window.location.href = googleAuthUrl)}
          type='button'
          isLoading={isGoogleAuthLoading}
        >
          <GoogleIcon className="size-5" />
          Continue with Google
        </Button>
      </div>
    </Form>
  );
};
