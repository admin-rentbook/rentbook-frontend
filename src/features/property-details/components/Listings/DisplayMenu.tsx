import { Button, Sheet } from '@/shared/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import { useMobile } from '@/shared/hooks';
import { FilterHorizontalIcon, GridViewIcon } from 'hugeicons-react';
import { List } from 'lucide-react';
import { useState } from 'react';
import type { DisplayOptions } from '../../types';

type DisplayMenuProps = {
  displayOptions: DisplayOptions;
  onChange: (options: DisplayOptions) => void;
};

const groupingOptions = [
  { label: 'View complex', value: 'complex' },
  { label: 'View listings', value: 'listings' },
];

export const DisplayMenu = ({ displayOptions, onChange }: DisplayMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useMobile();

  const handleViewTypeChange = (viewType: string) => {
    onChange({ ...displayOptions, viewType: viewType as 'list' | 'grid' });
  };

  const handleGroupingChange = (grouping: string) => {
    onChange({
      ...displayOptions,
      grouping: grouping as 'complex' | 'listings',
    });
  };

  const displayButton = (
    <Button
      variant="outline"
      className="gap-2 shadow-custom-sm"
      size='sm'
      onClick={() => isMobile && setIsOpen(!isOpen)}
    >
      <FilterHorizontalIcon className="h-4 w-4" />
      <span className="hidden md:inline text-body">Display</span>
    </Button>
  );

  const menuContent = (
    <Tabs
      value={displayOptions.viewType}
      onValueChange={handleViewTypeChange}
      className="w-full"
    >
      <TabsList className="w-full bg-sidebar">
        <TabsTrigger
          value="list"
          className="flex-1 data-[state=active]:bg-white"
        >
          <GridViewIcon className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger
          value="grid"
          className="flex-1 data-[state=active]:bg-white"
        >
          <List className="h-4 w-4" />
        </TabsTrigger>
      </TabsList>

      <TabsContent value="list" className="pt-0" />

      <TabsContent
        value="grid"
        className="pt-4 grid grid-cols-[30%_70%] items-center"
      >
        <p className="text-body text-black-400">Grouping</p>
        <Select
          value={displayOptions.grouping || undefined}
          onValueChange={handleGroupingChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="View listings" />
          </SelectTrigger>
          <SelectContent>
            {groupingOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TabsContent>
    </Tabs>
  );

  if (isMobile) {
    return (
      <Sheet
        trigger={displayButton}
        open={isOpen}
        onOpenChange={setIsOpen}
        className='max-h-[50vh] p-5 rounded-t-2xl'
        children={
          <div className="flex flex-col">
            <p className="text-body text-black-400 mb-4">Display Options</p>
            {menuContent}
          </div>
        }
      />
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>{displayButton}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white border border-custom-neutral-50 rounded-2xl shadow-ter p-4"
        align="end"
        style={{ width: '280px' }}
      >
        {menuContent}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
