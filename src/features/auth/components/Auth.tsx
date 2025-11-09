import { useAppStore } from '@/core/store';
import {
  DialogComponent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components';
import { Logo } from '@/shared/components/Logo';
import { useEffect } from 'react';
import { testimonials } from '../constants';
import { AuthStoreProvider } from '../providers';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { Testimonials } from './Testimonials';

export const Auth = () => {
  const isOpenAuth = useAppStore((s) => s.isOpenAuth);
  const onOpenAuth = useAppStore((s) => s.onOpenAuth);
  //   backdrop-filter: blur(400px)

  useEffect(() => {
    onOpenAuth(true);
  }, []);

  return (
    <AuthStoreProvider>
      <div>
        <DialogComponent
          open={isOpenAuth}
          onOpenChange={onOpenAuth}
          className="rounded-[2em]"
          children={
            <div className="grid grid-cols-2 w-full min-h-[70vh]">
              <div className="flex flex-col px-6 lg:px-8 xl:px-10 pr-6 py-8 items-start gap-6 h-full">
                <Logo />
                <Tabs className="w-full" defaultValue="LOGIN">
                  <TabsList className="w-full">
                    <TabsTrigger value="LOGIN">Login</TabsTrigger>
                    <TabsTrigger value="SIGNUP">Sign up</TabsTrigger>
                  </TabsList>
                  <TabsContent value="LOGIN" className='flex-1'>
                    <LoginForm />
                  </TabsContent>
                  <TabsContent value="SIGNUP" className='flex-1'>
                    <SignupForm />
                  </TabsContent>
                </Tabs>
              </div>
              <div className="py-6 px-8 relative overflow-hidden">
                {/*overflow prevents the blur from going over to the left side*/}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-1/2 h-full rounded-full opacity-30 blur-[200px] bg-gradient-to-b from-primary-500 to-warning-600" />
                <Testimonials
                  testimonials={testimonials}
                  onClose={onOpenAuth}
                />
              </div>
            </div>
          }
        />
      </div>
    </AuthStoreProvider>
  );
};
