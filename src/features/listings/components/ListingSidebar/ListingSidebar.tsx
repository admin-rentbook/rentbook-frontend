import { Button } from '@/shared/components';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/components/ui/sidebar';
import type { UseStepper } from '@/shared/hooks/useStepper';
import { cn } from '@/shared/lib/utils';
import type { Step } from '@/shared/types';
import {
  CheckmarkCircle02Icon,
  Menu01Icon,
  SidebarLeftIcon,
} from 'hugeicons-react';
import { flattenSteps } from './utils';

type ListingSidebarProps = {
  steps: Step[];
  stepper: UseStepper;
  onNavigate: (mainStep: number, subStep: number) => void;
};

export const ListingSidebar = ({
  steps,
  stepper,
  onNavigate,
}: ListingSidebarProps) => {
  const { toggleSidebar, open } = useSidebar();
  const flatSteps = flattenSteps(steps);

  const isCurrentStep = (mainIndex: number, subIndex: number) => {
    return (
      stepper.currentMainStep === mainIndex &&
      stepper.getCurrentSubStep(mainIndex) === subIndex
    );
  };

  const isStepCompleted = (mainIndex: number, subIndex: number) => {
    return stepper.isSubStepCompleted(mainIndex, subIndex);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-r-gray-50 bg-white">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex px-2 items-center pt-15 justify-between">
              <div className="flex items-center pt-10 hover:cursor-pointer">
                {!open && (
                  <div onClick={toggleSidebar}>
                    <Menu01Icon className="size-4 text-black-400" />
                  </div>
                )}
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
              {flatSteps.map((step) => {
                const Icon = step.icon;
                const isCurrent = isCurrentStep(
                  step.mainStepIndex,
                  step.subStepIndex
                );
                const isCompleted = isStepCompleted(
                  step.mainStepIndex,
                  step.subStepIndex
                );

                return (
                  <SidebarMenuItem key={step.id}>
                    <SidebarMenuButton
                      asChild
                      tooltip={step.title}
                      className={cn(
                        'group-data-[collapsible=icon]:!p-2',
                        isCurrent && 'bg-muted text-black-500 font-medium'
                      )}
                    >
                      <button
                        onClick={() =>
                          onNavigate(step.mainStepIndex, step.subStepIndex)
                        }
                        className="flex w-full py-1 items-center gap-[10px] px-[6px] rounded-lg transition-colors text-black-400 hover:text-black-500 hover:bg-muted"
                      >
                        <Icon className="size-4 flex-shrink-0" />
                        <span className="text-body truncate flex-1 text-left">
                          {step.title}
                        </span>
                        {isCompleted && !isCurrent && (
                          <CheckmarkCircle02Icon className="size-4 text-green-600 flex-shrink-0" />
                        )}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
