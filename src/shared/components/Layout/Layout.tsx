import type { SidebarItem } from '@/shared/types';
import { AppSidebar } from './AppSidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';

type LayoutProps = {
  children: React.ReactNode;
  sidebarItems: SidebarItem[]
}

export const Layout = (props: LayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar sidebarItems={props.sidebarItems} />
      <SidebarInset className="flex flex-row relative">
        <div className="absolute top-6 left-0 z-50 lg:hidden">
          <SidebarTrigger variant="icon" />
        </div>

        <main className="flex flex-1 flex-col">{props.children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
