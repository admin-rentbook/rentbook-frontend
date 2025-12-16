import { useAppStore } from '@/core/store';
import { DialogComponent, Sheet } from '@/shared/components';
import { useMobile } from '@/shared/hooks';
import { useEffect } from 'react';
import { Onboarding } from './Onboarding';

export const Auth = () => {
  const isOpenAuth = useAppStore((s) => s.isOpenAuth);
  const onOpenAuth = useAppStore((s) => s.onOpenAuth);
  const authUser = useAppStore((s) => s.authUser);

  useEffect(() => {
    if (!authUser?.tokens.access) {
      onOpenAuth(true);
    }
  }, []);

  const { isMobile } = useMobile();
  return (
    <>
      {isMobile ? (
        <Sheet
          open={isOpenAuth}
          onOpenChange={onOpenAuth}
          children={<Onboarding />}
        />
      ) : (
        <DialogComponent
          open={isOpenAuth}
          onOpenChange={onOpenAuth}
          className="rounded-[2em] border-0 lg:w-4/5 xl:w-3/5"
          children={<Onboarding />}
        />
      )}
    </>
  );
};
