import { Badge, Button, Sheet, StatusSelector } from '@/shared/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { useMobile } from '@/shared/hooks';
import { FilterVerticalIcon } from 'hugeicons-react';
import { useState } from 'react';
import type { AgentFilters } from '../../types';
import { agentStatusOptions } from '../../constants';

type AgentFilterProps = {
  filters: AgentFilters;
  onChange: (filters: AgentFilters) => void;
};

export const AgentFilter = ({ filters, onChange }: AgentFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useMobile();

  const filterButton = (
    <Button
      variant="tertiary"
      className="gap-2 rounded-full"
      size="sm"
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
      <Sheet
        trigger={filterButton}
        open={isOpen}
        onOpenChange={setIsOpen}
        className="max-h-[50vh] p-5"
        children={
          <div className="flex flex-col gap-6">
            <p className="text-body text-black-400">Filter by Status</p>
            <StatusSelector
              options={agentStatusOptions}
              selectedValue={filters.status}
              onSelect={(value) => onChange({ status: value })}
              onClose={() => setIsOpen(false)}
            />
          </div>
        }
      />
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
          options={agentStatusOptions}
          selectedValue={filters.status}
          onSelect={(value) => onChange({ status: value })}
          onClose={() => setIsOpen(false)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
