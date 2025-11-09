import GoogleIcon from '@/assets/icons/google_icon.svg?react';
import { Button, Separator } from '@/shared/components';
import { Form, FormInput } from '@/shared/components/Form';
import { useLogin } from '../hooks';

export const LoginForm = () => {
  const { form, isButtonDisabled, onSubmit } = useLogin();
  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="flex flex-col gap-6">
        <FormInput
          control={form.control}
          name="email"
          label="Email"
          size="sm"
          showErrorMessage
        />
        <div className="flex flex-col">
          <FormInput
            control={form.control}
            name="password"
            label="Password"
            size="sm"
            showErrorMessage
          />
          <div className="pt-2">
            <Button variant="primary-soft" className="font-normal">
              Forgot password?
            </Button>
          </div>
        </div>
        <Button
          size="lg"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isButtonDisabled}
        >
          Log in
        </Button>
        <Separator className="border border-custom-neutral-200" />
        <Button variant="tertiary" size="lg">
          <GoogleIcon className="size-5" />
          Continue with Google
        </Button>
      </div>
    </Form>
  );
};
