import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/shared/components/ui/sheet';
import { useMobile } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import { convertUnderscoreToSpace } from '@/shared/utils';
import { returnStatus } from '@/shared/utils/helpers';
import { CircleIcon, FilterVerticalIcon, Tick02Icon } from 'hugeicons-react';
import { useState } from 'react';
import { propertyStatusOptions } from '../../constants';
import type { PropertyFilters } from '../../types/property';

type PropertyFilterProps = {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
};
export function PropertyFilter({ filters, onChange }: PropertyFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useMobile();

  const StatusView = () => {
    return (
      <div className="flex flex-col">
        {propertyStatusOptions.map((status) => {
          const { bgColor, fillColor, textColor } = returnStatus(status.value);
          const isSelected = filters.status === status.value;

          return (
            <div
              key={status.value}
              className={`py-2 px-3 cursor-pointer flex justify-between items-center rounded-lg transition-color`}
              onClick={() => {
                onChange({ status: status.value });
                setIsOpen(false);
              }}
            >
              <Badge className={`${bgColor} ${textColor}`}>
                <CircleIcon
                  className={cn(`size-[7px] ${fillColor}`)}
                  style={{ width: '7px', height: '7px' }}
                />
                {<span>{convertUnderscoreToSpace(status.value)}</span>}
              </Badge>
              {isSelected && (
                <Tick02Icon className="size-5 text-primary-500" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const filterButton = (
    <Button
      variant="tertiary"
      className="gap-2 rounded-full"
      onClick={() => isMobile && setIsOpen(!isOpen)}
    >
      <FilterVerticalIcon className="h-4 w-4" />
      <span className="hidden md:inline text-body">Filter by Status</span>
      {filters.status && (
        <Badge className="ml-auto rounded-full h-6 w-6 bg-white text-body text-black-500">
          1
        </Badge>
      )}
    </Button>
  );

  if (isMobile) {
    return (
      <>
        {filterButton}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent
            side="bottom"
            className="rounded-t-[30px] border-t-0 h-[40vh] p-3"
          >
            <div className="flex justify-center mb-4">
              <div className="h-[4px] w-[40px] bg-gray-50 rounded-full" />
            </div>
            <SheetHeader className="mb-4">
              <SheetTitle className="text-body">Filter by Status</SheetTitle>
            </SheetHeader>
            <StatusView />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>{filterButton}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white border border-custom-neutral-50 rounded-2xl shadow-ter p-2"
        align="end"
        style={{ width: 'var(--radix-dropdown-menu-trigger-width)' }}
      >
        <StatusView />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
