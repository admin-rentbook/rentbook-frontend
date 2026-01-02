import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';
import type { SidebarItem } from '@/shared/types';
import { AppSidebar } from './AppSidebar';
import { Footer } from './Footer';
import { MobileHeader } from './MobileHeader';
import { Navbar } from './Navbar';
import { OwnerHeader } from './OwnerHeader';

type LayoutProps = {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
  showHeaderText?: string;
};

const LayoutContent = (props: LayoutProps) => {
  return (
    <>
      <AppSidebar sidebarItems={props.sidebarItems} />
      <SidebarInset className="flex flex-col min-h-screen">
        <div className="block lg:hidden">
          <MobileHeader />
        </div>
        <div className="hidden lg:block">
          <Navbar showHeaderText={props.showHeaderText} />
        </div>
        <main className="flex-1">{props.children}</main>
      </SidebarInset>
    </>
  );
};

const LayoutContentWithoutHeader = (props: LayoutProps) => {
  return (
    <>
      <AppSidebar sidebarItems={props.sidebarItems} />
      <SidebarInset className="flex flex-col min-h-screen">
        <div className="block lg:hidden">
          <OwnerHeader />
        </div>
        <main className="flex-1">{props.children}</main>
      </SidebarInset>
    </>
  );
};

const LayoutContentWithFooter = (props: LayoutProps) => {
  return (
    <>
      <AppSidebar sidebarItems={props.sidebarItems} />
      <SidebarInset className="flex flex-col min-h-screen">
        <div className="block md:hidden">
          <MobileHeader />
        </div>
        <div className="hidden lg:block">
          <Navbar showHeaderText={props.showHeaderText} />
        </div>

        <main className="flex-1">{props.children}</main>
        <Footer />
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

export const LayoutWithFooter = (props: LayoutProps) => {
  return (
    <SidebarProvider>
      <LayoutContentWithFooter {...props} />
    </SidebarProvider>
  );
};
export const LayoutWithoutHeader = (props: LayoutProps) => {
  return (
    <SidebarProvider>
      <LayoutContentWithoutHeader {...props} />
    </SidebarProvider>
  );
};
