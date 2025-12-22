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
import { StatusSelector } from '@/shared/components';
import { FilterVerticalIcon } from 'hugeicons-react';
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
            <StatusSelector
              options={propertyStatusOptions}
              selectedValue={filters.status}
              onSelect={(value) => onChange({ status: value })}
              onClose={() => setIsOpen(false)}
            />
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
        <StatusSelector
          options={propertyStatusOptions}
          selectedValue={filters.status}
          onSelect={(value) => onChange({ status: value })}
          onClose={() => setIsOpen(false)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
