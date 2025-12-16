import UserIcon from '@/assets/icons/user.svg?react';
import logo from '@/assets/images/logo.png';
import { useAppStore } from '@/core/store';
import { ArrowReloadHorizontalIcon, LogoutSquare01Icon, Menu01Icon } from 'hugeicons-react';
import { Avatar, AvatarFallback, Button } from '../ui';
import { useSidebar } from '../ui/sidebar';
import { useNavigate } from '@tanstack/react-router';

export const MobileHeader = () => {
  const { toggleSidebar } = useSidebar();
  const logout = useAppStore((s) => s.logout);
  const authUser = useAppStore((s) => s.authUser);
  const onOpenAuth = useAppStore((s) => s.onOpenAuth);
  const isAuthUser = authUser?.tokens.access;
    const navigate = useNavigate();
  

  return (
    <div className="p-4 pb-2 justify-between md:justify-end flex items-center">
      <div className="flex gap-4 md:hidden">
        <Menu01Icon
          className="text-black-500 cursor-pointer size-6"
          onClick={toggleSidebar}
        />
        <div className="flex items-center gap-2">
          <img src={logo} alt="RentBook" className="size-[34px]" />
          <h4 className="logo-text text-black-500">rentbook</h4>
        </div>
      </div>
       <div className="gap-4 hidden md:flex items-center pr-3">
        <Button
          variant="tertiary"
          onClick={() => navigate({ to: '/properties/create' })}
          className='rounded-full'
          size='lg'
        >
          <ArrowReloadHorizontalIcon className="size-[17px]" />
          List your property
        </Button>
      </div>
      {isAuthUser ? (
        <div className="flex gap-3 items-center">
          <Avatar className="size-[40px] bg-black cursor-pointer">
            <AvatarFallback className="bg-black">
              <p className="text-heading-xl-medium text-white">
                {authUser?.user.first_name.substring(0, 1).toUpperCase()}
              </p>
            </AvatarFallback>
          </Avatar>
          <Button variant="ghost" className="px-0" onClick={() => logout()}>
            <LogoutSquare01Icon className="size-7" />
          </Button>
        </div>
      ) : (
        <Button
          className="rounded-full"
          variant="tertiary"
          onClick={() => onOpenAuth(true)}
        >
          <div className="bg-white rounded-full size-8 grid place-items-center">
            <UserIcon className="size-4" />
          </div>
          Sign in
        </Button>
      )}
    </div>
  );
};
