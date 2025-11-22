import logo from '@/assets/images/logo.png';
import { Button } from '@/shared/components';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/components/ui/sidebar';
import { UserMenu } from '@/shared/components/UserMenu';
import type { SidebarItem } from '@/shared/types';
import { Link } from '@tanstack/react-router';
import { SidebarLeftIcon } from 'hugeicons-react';
import { SpecialCompRender } from './SearchbarRender';

type AppSidebarProps = {
  sidebarItems: SidebarItem[];
};

export const AppSidebar = (props: AppSidebarProps) => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r bg-white border-r-gray-50">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex py-4 items-center justify-between">
              <div className="flex items-center gap-2">
                {open ? (
                  <img src={logo} className="object-contain" alt="RentBook" />
                ) : (
                  <img
                    src={logo}
                    className="cursor-pointer"
                    alt="RentBook"
                    onClick={toggleSidebar}
                  />
                )}

                {open && <h4 className="logo-text text-black-500">rentbook</h4>}
              </div>
              {open && (
                <Button variant="icon" className="px-0" onClick={toggleSidebar}>
                  <SidebarLeftIcon className="size-4 text-black-400" />
                </Button>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {props.sidebarItems.slice(0, 4).map((item) => {
                if (item.name?.toLowerCase() === 'search') {
                  return <SpecialCompRender item={item} open={open} />;
                }
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild tooltip={item.name}>
                      <Link
                        key={item.name}
                        to={item.link}
                        className="flex py-1 items-center gap-[10px] px-[6px] rounded-lg transition-colors text-black-400 hover:text-black-500 hover:bg-muted"
                        activeProps={{
                          className: 'bg-muted text-black-500 font-medium',
                        }}
                      >
                        <item.icon className="size-4" />
                        <p className="text-body">{item.name}</p>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {props.sidebarItems.slice(4, 7).map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild tooltip={item.name}>
                    <Link
                      key={item.name}
                      to={item.link}
                      className="flex py-1 items-center gap-[10px] px-[6px] rounded-lg transition-colors text-black-400 hover:text-black-500 hover:bg-muted"
                      activeProps={{
                        className: 'bg-muted text-black-500 font-medium',
                      }}
                    >
                      <item.icon className="size-4" />
                      <p className="text-body">{item.name}</p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {props.sidebarItems.slice(7).map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild tooltip={item.name}>
                  <Link
                    key={item.name}
                    to={item.link}
                    className="flex py-1 items-center gap-[10px] px-[6px] rounded-lg transition-colors text-black-400 hover:text-black-500 hover:bg-muted"
                    activeProps={{
                      className: 'bg-muted text-black-500 font-medium',
                    }}
                  >
                    <item.icon className="size-4" />
                    <p className="text-body">{item.name}</p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <UserMenu />
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};
