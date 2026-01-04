import { useAppStore } from '@/core/store';
import { Auth } from '@/features/auth';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { LogoutSquare01Icon } from 'hugeicons-react';

export const TokenExpiredModal = () => {
  const isTokenExpired = useAppStore((s) => s.isTokenExpired);
  const setTokenExpired = useAppStore((s) => s.setTokenExpired);
  const onOpenAuth = useAppStore((s) => s.onOpenAuth);

  const handleLogin = () => {
    setTokenExpired(false);
    onOpenAuth(true);
  };

  const isOpenAuth = useAppStore((s) => s.isOpenAuth);

  return (
    <>
      <Dialog open={isTokenExpired}>
        <DialogContent className="p-6" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-heading-4 text-neutral-600">
              Session Expired
            </DialogTitle>
            <DialogDescription className="text-body text-black-400">
              Your session has expired. Please log in again to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleLogin} className="w-full sm:w-auto">
              <LogoutSquare01Icon className="size-4" />
              Login Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Render Auth component only when auth modal is open */}
      {isOpenAuth && <Auth />}
    </>
  );
};
