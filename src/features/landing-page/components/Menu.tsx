import { useAppStore } from '@/core/store';
import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components';
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { Menu01Icon } from 'hugeicons-react';
import { menuItems } from '../constants';

export const Menu = () => {
  const logout = useAppStore((s) => s.logout);
  const onOpenAuth = useAppStore((s) => s.onOpenAuth);
  const authUser = useAppStore((s) => s.authUser);
  const isAuthUser = authUser?.tokens.access;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isAuthUser ? (
          <Avatar className="size-[50px] bg-black cursor-pointer">
            <AvatarFallback className="bg-black">
              <p className="text-heading-xl-medium text-white">
                {authUser.user.first_name.substring(0, 1)}
              </p>
            </AvatarFallback>
          </Avatar>
        ) : (
          <button className="size-[50px] border border-sidebar-accent rounded-full flex items-center justify-center">
            <Menu01Icon className="size-6 text-black-500" />
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white shadow-ter rounded-2xl p-2 border-0 w-[300px] z-1"
        sideOffset={10}
        side="bottom"
      >
        {isAuthUser ? (
          <DropdownMenuGroup>
            <DropdownMenuItem className="px-0.5 pt-2">
              <div className="w-full flex flex-col gap-1 items-center">
                <h5 className="text-body-sm-semi text-black-500">
                  Unlock access and rewards
                </h5>
                <Button className="w-full" onClick={() => logout()}>
                  Logout
                </Button>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuItem className="px-0.5 pt-2">
              <div className="w-full flex flex-col gap-1 items-center">
                <h5 className="text-body-sm-semi text-black-500">
                  Unlock access and rewards
                </h5>
                <Button className="w-full" onClick={() => onOpenAuth(true)}>
                  Log in or Sign up
                </Button>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        <DropdownMenuSeparator className="bg-custom-neutral-100 my-4" />
        <DropdownMenuGroup className="space-y-2">
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.name} className="cursor-pointer">
              <div className="flex gap-2 text-black-400">
                <item.icon className="size-4" />
                <p className="text-body ">{item.name}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
