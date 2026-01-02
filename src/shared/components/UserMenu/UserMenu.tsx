import userImg from '@/assets/images/avatar.jpg';
import { useAppStore } from '@/core/store';
import { menuItems as renterMenuItems } from '@/features/landing-page/constants';
import { Links } from '@/features/property-owners/constants';
import { UserRole, type UserType } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { AvatarImage } from '@radix-ui/react-avatar';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import { useNavigate } from '@tanstack/react-router';
import { Logout02Icon, UnfoldMoreIcon } from 'hugeicons-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '../ui/item';
import { useSidebar } from '../ui/sidebar';

export const UserMenu = () => {
  const { open } = useSidebar();
  const setUserType = useAppStore((s) => s.setUserType);
  const userType = useAppStore((s) => s.userType);
  const authUser = useAppStore((s) => s.authUser);
  const navigate = useNavigate();
  const logout = useAppStore((s) => s.logout);

  const switchUserMenuItems = [
    {
      title: 'R',
      name: 'Renter',
      userType: UserRole.TENANT,
      link: '/',
    },
    {
      title: 'O',
      name: 'Property Owner',
      userType: UserRole.PROPERTY_OWNER,
      link: Links.PROPERTIES,
    },
  ];

  const handleUserType = (type: UserType, link: string) => {
    setUserType(type);
    navigate({ to: link as any });
  };

  // Determine which action menu items to show based on user type
  const actionMenuItems = userType === UserRole.TENANT ? renterMenuItems : [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <button className="w-full">
          {open ? (
            <Item
              variant="outline"
              className="justify-start gap-1 px-1 rounded-2xl border-gray-50 w-full"
            >
              <ItemMedia>
                <Avatar className="size-10">
                  <AvatarImage className="object-cover" src={userImg} />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="items-start">
                <ItemTitle>
                  <span className="text-body text-black-500">{`${authUser?.user.first_name} ${authUser?.user.last_name}`}</span>
                </ItemTitle>
                <ItemDescription>
                  <span className="text-body-small text-black-400">
                    Owner's workspace
                  </span>
                </ItemDescription>
              </ItemContent>
              <UnfoldMoreIcon className="size-4 text-black-400" />
            </Item>
          ) : (
            <div className="flex justify-center py-2">
              <Avatar className="size-10">
                <AvatarImage className="object-cover" src={userImg} />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-white shadow-ter rounded-2xl p-2 border-0"
        style={
          open
            ? { width: 'var(--radix-dropdown-menu-trigger-width)' }
            : undefined
        }
        side={open ? 'top' : 'right'}
        align="start"
        sideOffset={10}
      >
        <DropdownMenuGroup className="space-y-3">
          {switchUserMenuItems.map((item) => {
            const isActive = userType === item.userType;

            return (
              <DropdownMenuItem
                key={item.name}
                className="border-none p-0 focus:border-transparent focus:outline-none focus:ring-0"
                onClick={() => handleUserType(item.userType, item.link)}
              >
                <div
                  className={cn(
                    'group/item flex w-full items-center justify-between px-[6px] py-1 rounded-lg hover:bg-primary-100 hover:cursor-pointer text-black-400 transition-colors',
                    isActive && 'bg-primary-100'
                  )}
                >
                  <div className="flex items-center gap-[10px]">
                    <Badge className="bg-primary-500 size-5">
                      {item.title}
                    </Badge>
                    <p className="text-body">{item.name}</p>
                  </div>
                  <div
                    className={cn(
                      'bg-primary-500 size-[10px] rounded-full',
                      isActive
                        ? 'visible'
                        : 'invisible group-hover/item:visible'
                    )}
                  />
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        {actionMenuItems.length > 0 && (
          <>
            <DropdownMenuSeparator className="bg-custom-neutral-100 my-4" />
            <DropdownMenuGroup className="space-y-3">
              {actionMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <DropdownMenuItem
                    key={item.name}
                    className="border-none p-0 focus:border-transparent focus:outline-none focus:ring-0"
                    onClick={() => navigate({ to: item.link })}
                  >
                    <div className="flex w-full py-1 items-center rounded-lg gap-[10px] px-[6px] hover:bg-muted hover:text-black-500 hover:cursor-pointer text-black-400 transition-colors">
                      <Icon className="size-4" />
                      <p className="text-body">{item.name}</p>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </>
        )}

        <DropdownMenuSeparator className="bg-custom-neutral-100 my-4" />

        {authUser?.tokens.access && (
          <DropdownMenuGroup className="space-y-3">
            <DropdownMenuItem
              onClick={() => logout()}
              className="border-none p-0 focus:border-transparent focus:outline-none focus:ring-0"
            >
              <div className="flex w-full py-1 items-center rounded-lg gap-[10px] px-[6px] hover:bg-muted hover:text-black-500 hover:cursor-pointer text-black-400 transition-colors">
                <Logout02Icon className="size-4" />
                <p className="text-body">Logout</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
