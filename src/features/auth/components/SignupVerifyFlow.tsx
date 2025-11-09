import { useAuthStore } from '../providers';
import { SignupForm } from './SignupForm';
import { VerifyEmail } from './VerifyEmail';

export const SignupVerifyFlow = () => {
  const step = useAuthStore((s) => s.step);
  console.log('step', step);

  return step === 1 ? <SignupForm /> : <VerifyEmail />;
};
