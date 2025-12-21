import { useNavigate } from '@tanstack/react-router';
import { ArrowReloadHorizontalIcon } from 'hugeicons-react';
import { Button } from '../ui';
import { Menu } from './Menu';
import { Links } from '@/features/property-owners/constants';

type NavbarProps = {
  showHeaderText?: string;
};
export const Navbar = ({ showHeaderText }: NavbarProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center py-5 gap-6 px-8 lg:border-b border-custom-neutral-100">
      {showHeaderText ? (
        <h2 className="text-heading-xl text-black-500">{showHeaderText}</h2>
      ) : (
        <p></p>
      )}
      <div className="flex gap-[20px] items-center">
        <Button
          variant="tertiary"
          onClick={() => navigate({ to: Links.PROPERTY_GET_STARTED })}
          className='rounded-full'
          size='lg'
        >
          <ArrowReloadHorizontalIcon className="size-[17px]" />
          List your property
        </Button>
        <Menu />
      </div>
    </div>
  );
};
