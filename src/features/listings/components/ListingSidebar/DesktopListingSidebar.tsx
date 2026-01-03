import { SidebarProvider } from '@/shared/components/ui/sidebar';
import type { UseStepper } from '@/shared/hooks/useStepper';
import type { Step } from '@/shared/types';
import type { ReactNode } from 'react';
import { ListingSidebar } from './ListingSidebar';

type DesktopListingSidebarProps = {
  steps: Step[];
  stepper: UseStepper;
  children: ReactNode;
};

export const DesktopListingSidebar = ({
  steps,
  stepper,
  children,
}: DesktopListingSidebarProps) => {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex w-full h-[90vh]">
        <ListingSidebar
          steps={steps}
          stepper={stepper}
          onNavigate={stepper.goToStep}
        />
        <main className="flex-1 overflow-y-auto p-5 lg:px-10">{children}</main>
      </div>
    </SidebarProvider>
  );
};
