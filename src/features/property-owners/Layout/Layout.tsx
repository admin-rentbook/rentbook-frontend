import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-row relative">
        <div className="absolute top-6 left-0 z-50 lg:hidden">
          <SidebarTrigger variant="icon" />
        </div>

        <main className="flex flex-1 flex-col">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
