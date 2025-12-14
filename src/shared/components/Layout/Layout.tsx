import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';
import type { SidebarItem } from '@/shared/types';
import { AppSidebar } from './AppSidebar';
import { MobileHeader } from './MobileHeader';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

type LayoutProps = {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
  showHeaderText?:string
};

const LayoutContent = (props: LayoutProps) => {
  return (
    <>
      <AppSidebar sidebarItems={props.sidebarItems} />
      <SidebarInset className="flex flex-col min-h-screen">
        <MobileHeader />
        <Navbar />
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
        <MobileHeader />
        <Navbar showHeaderText={props.showHeaderText} />
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