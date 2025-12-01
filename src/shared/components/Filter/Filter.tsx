import { useMobile } from '@/shared/hooks';
import type { FilterConfig } from '@/shared/types';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { ArrowLeft01Icon, FilterVerticalIcon } from 'hugeicons-react';
import { useState } from 'react';
import { Sheet } from '../Sheet';
import {
  Badge,
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui';
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

type FilterSystemProps = {
  options: FilterConfig[];
  filters: FilterValues;
  onChange: (updatedFilters: FilterValues) => void;
};

type FilterValues = Record<string, any>;

export function FilterSystem({
  options,
  filters,
  onChange,
}: FilterSystemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState('main');
  const { isMobile } = useMobile();

  const activeFilterCount = Object.values(filters).filter((value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'object')
      return Object.values(value).some(
        (v) => v !== '' && v !== null && v !== undefined
      );
    return true;
  }).length;

  const handleFilterChange = (filterId: string, value: any) => {
    onChange({ ...filters, [filterId]: value });
  };

  const handleClearFilters = () => {
    const cleared: FilterValues = {};
    for (const key of Object.keys(filters)) cleared[key] = null;
    onChange(cleared);
  };

  const currentOption = options.find((opt) => opt.id === currentView);

  const renderMainView = () => (
    <div className="flex flex-col bg-amber-300">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => setCurrentView(option.id)}
          className="px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">{option.label}</span>
            {filters[option.id] && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
        </button>
      ))}
      {activeFilterCount > 0 && (
        <button
          onClick={handleClearFilters}
          className="px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors font-medium"
        >
          Clear Filters
        </button>
      )}
    </div>
  );

  const renderFilterView = () => {
    if (!currentOption) return null;

    if (currentOption.type === 'list') {
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
            <button
              onClick={() => setCurrentView('main')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ArrowLeft01Icon className="h-5 w-5" />
            </button>
            <span className="font-semibold text-gray-800">
              {currentOption.label}
            </span>
          </div>
          <div className="flex flex-col">
            {currentOption.items?.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  handleFilterChange(currentOption.id, item.value);
                  setCurrentView('main');
                }}
                className={`px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                  filters[currentOption.id] === item.value
                    ? 'bg-blue-50 text-blue-700'
                    : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (currentOption.type === 'custom' && currentOption.renderCustom) {
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
            <button
              onClick={() => setCurrentView('main')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ArrowLeft01Icon className="h-5 w-5" />
            </button>
            <span className="font-semibold text-gray-800">
              {currentOption.label}
            </span>
          </div>
          <div className="p-4">
            {currentOption.renderCustom({
              selectedValue: filters[currentOption.id],
              onChange: (value) => handleFilterChange(currentOption.id, value),
            })}
          </div>
        </div>
      );
    }

    return null;
  };

  const filterContent =
    currentView === 'main' ? renderMainView() : renderFilterView();

  const filterButton = (
    <ButtonGroup onClick={() => isMobile && setIsOpen(!isOpen)}>
      <Button variant="tertiary" className="gap-2 pr-1 rounded-full">
        <FilterVerticalIcon className="size-4" />
        <p className="text-sm hidden md:inline">Filter</p>
        {activeFilterCount > 0 && (
          <Badge className="ml-auto rounded-full h-7 w-7 bg-primary text-primary-foreground">
            {activeFilterCount}
          </Badge>
        )}
      </Button>
    </ButtonGroup>
  );

  if (isMobile) {
    return (
      <>
        {filterButton}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="bottom" className="h-[75vh]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto h-[calc(75vh-80px)] mt-4">
              {filterContent}
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setCurrentView('main');
      }}
    >
      <DropdownMenuTrigger asChild>{filterButton}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white shadow-ter rounded-2xl p-2 border-0"
        style={
          isOpen
            ? { width: 'var(--radix-dropdown-menu-trigger-width)' }
            : undefined
        }
        align="start"
      >
        <DropdownMenuGroup className="space-y-3">
          {filterContent}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
