import { useNavigate } from '@tanstack/react-router';
import { ArrowReloadHorizontalIcon } from 'hugeicons-react';
import { Menu } from './Menu';

type NavbarProps = {
  showHeaderText?: string;
};
export const Navbar = ({ showHeaderText }: NavbarProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center py-5 gap-6 px-8 border-b border-custom-neutral-100">
      {showHeaderText ? (
        <h2 className="text-heading-xl text-black-500">{showHeaderText}</h2>
      ) : (
        <p></p>
      )}
      <div className="flex gap-[20px]">
        <div
          onClick={() => navigate({ to: '/properties/create' })}
          className="flex items-center hover:cursor-pointer gap-2 bg-sidebar-accent rounded-full pl-2 py-2 pr-3"
        >
          <div className="size-[32px] rounded-full flex items-center justify-center bg-white">
            <ArrowReloadHorizontalIcon className="size-[17px]" />
          </div>
          <p className="text-body-medium text-black-500">List your property</p>
        </div>
        <Menu />
      </div>
    </div>
  );
};
