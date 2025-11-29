import { useAppStore } from '@/core/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components';
import { Logo } from '@/shared/components/Logo';
import { useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { testimonials } from '../constants';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { ForgotPasswordVerifyOtp } from './ForgotPasswordVerifyOtp';
import { LoginForm } from './LoginForm';
import { ResetPasswordForm } from './ResetPasswordForm';
import { SignupForm } from './SignupForm';
import { Testimonials } from './Testimonials';
import { VerifyEmail } from './VerifyEmail';
export const Onboarding = () => {
  const onOpenAuth = useAppStore((s) => s.onOpenAuth);
  const authUser = useAppStore((s) => s.authUser);

  useEffect(() => {
    if (!authUser?.tokens.access) {
      onOpenAuth(true);
    }
  }, []);

  const search = useSearch({ from: '/' });
  const currentStep = search.step || 1;
  return (
    <div className="grid grid-cols-2 w-full min-h-[70vh]">
      <div className="flex flex-col col-span-2 lg:col-span-1 px-6 lg:px-8 xl:px-10 pr-6 py-8 items-start gap-6 h-full">
        <Logo />
        {currentStep === 1 ? (
          <Tabs className="w-full" defaultValue="LOGIN">
            <TabsList className="w-full">
              <TabsTrigger value="LOGIN">Login</TabsTrigger>
              <TabsTrigger value="SIGNUP">Sign up</TabsTrigger>
            </TabsList>
            <TabsContent value="LOGIN" className="flex-1">
              <LoginForm />
            </TabsContent>
            <TabsContent value="SIGNUP" className="flex-1">
              <SignupForm />
            </TabsContent>
          </Tabs>
        ) : currentStep === 2 ? (
          <VerifyEmail />
        ) : currentStep === 3 ? (
          <ForgotPasswordForm />
        ) : currentStep === 4 ? (
          <ForgotPasswordVerifyOtp />
        ) : (
          <ResetPasswordForm />
        )}
      </div>
      <div className="py-6 px-8 relative overflow-hidden hidden lg:block">
        {/*overflow prevents the blur from going over to the left side*/}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-1/2 h-full hidden lg:block rounded-full opacity-30 blur-[200px] bg-gradient-to-b from-primary-500 to-warning-600" />
        <Testimonials testimonials={testimonials} onClose={onOpenAuth} />
      </div>
    </div>
  );
};
