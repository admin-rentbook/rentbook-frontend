import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';
import { useState } from 'react';
import { AppSidebar } from './AppSidebar';
import { Sidebar } from './Sidebar';

export const Layou2 = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-row relative">
        <div className='absolute top-6 left-0 z-50 lg:hidden'>
          <SidebarTrigger variant="icon" />
        </div>

        {/* Main content */}
        <main className="flex flex-1 flex-col">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
