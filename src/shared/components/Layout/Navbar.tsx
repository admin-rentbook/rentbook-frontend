import { useAppStore } from '@/core/store';
import { Links } from '@/features/property-owners/constants';
import { useNavigate } from '@tanstack/react-router';
import { ArrowReloadHorizontalIcon } from 'hugeicons-react';
import { Button } from '../ui';
import { Menu } from './Menu';

type NavbarProps = {
  showHeaderText?: string;
};
export const Navbar = ({ showHeaderText }: NavbarProps) => {
  const navigate = useNavigate();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthUser = authUser?.tokens.access;

  return (
    <div className="flex justify-between items-center py-5 gap-6 px-8 lg:border-b border-custom-neutral-100">
      {showHeaderText ? (
        <h2 className="text-heading-xl text-black-500">{showHeaderText}</h2>
      ) : (
        <p></p>
      )}

      <div className="flex gap-[20px] items-center">
        {isAuthUser && (
          <Button
            variant="tertiary"
            onClick={() => navigate({ to: Links.PROPERTY_GET_STARTED })}
            className="rounded-full"
            size="lg"
          >
            <ArrowReloadHorizontalIcon className="size-[17px]" />
            List your property
          </Button>
        )}
        <Menu />
      </div>
    </div>
  );
};
