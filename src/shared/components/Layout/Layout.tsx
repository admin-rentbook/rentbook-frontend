import logo from '@/assets/images/logo.png';
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from '@/shared/components/ui/sidebar';
import type { SidebarItem } from '@/shared/types';
import { Menu01Icon } from 'hugeicons-react';
import { AppSidebar } from './AppSidebar';

type LayoutProps = {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
};

const LayoutContent = (props: LayoutProps) => {
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <AppSidebar sidebarItems={props.sidebarItems} />
      <SidebarInset className="flex flex-row relative">
        <main className="flex flex-1 flex-col">
          <div className="p-6 pb-2 lg:pb-6 flex items-center gap-4 md:hidden">
            <Menu01Icon
              className="text-black-500 cursor-pointer size-6"
              onClick={toggleSidebar}
            />
            <div className="flex items-center gap-2">
              <img src={logo} alt="RentBook" className='size-[34px]' />
              <h4 className="logo-text text-black-500">rentbook</h4>
            </div>
          </div>
          {props.children}
        </main>
      </SidebarInset>
    </>
  );
};

export const Layout = (props: LayoutProps) => {
  return (
    <SidebarProvider>
      <LayoutContent {...props} />
    </SidebarProvider>
  );
};
