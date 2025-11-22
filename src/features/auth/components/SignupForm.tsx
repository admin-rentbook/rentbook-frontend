import GoogleIcon from '@/assets/icons/google_icon.svg?react';
import { Button, Separator } from '@/shared/components';
import { Form, FormInput } from '@/shared/components/Form';
import { useSignup } from '../hooks';
import { PasswordRequirements } from './PasswordRequirements';

export const SignupForm = () => {
  const {
    form,
    isButtonDisabled,
    onSubmit,
    handlePasswordBlur,
    handlePasswordFocus,
    isPasswordFocused,
    isLoading,
    isGoogleAuthLoading,
    googleAuthUrl,
  } = useSignup();
  return (
    <div className="flex flex-col gap-10">
      <Form form={form} onSubmit={onSubmit}>
        <div className="flex flex-col gap-6">
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            showErrorMessage
            description={`We'll send you a link to verify your email`}
          />
          <FormInput
            control={form.control}
            name="firstName"
            label="First name"
            showErrorMessage
          />
          <FormInput
            control={form.control}
            name="lastName"
            label="Last name"
            showErrorMessage
          />
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

          <Button
            size="lg"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isButtonDisabled}
            isLoading={isLoading}
          >
            Create account
          </Button>
          <Separator className="border border-custom-neutral-200" />
          <Button
            variant="tertiary"
            size="lg"
            onClick={() => (window.location.href = googleAuthUrl)}
            type="button"
            isLoading={isGoogleAuthLoading}
          >
            <GoogleIcon className="size-5" />
            Continue with Google
          </Button>
        </div>
      </Form>
      <p className="text-body text-black-400 text-center">
        By signing up, you agree to our Terms of Service and  {' '}
        <span className="underline">Privacy Policy</span>
      </p>
    </div>
  );
};
