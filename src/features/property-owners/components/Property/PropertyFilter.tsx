import { ButtonGroup } from '@/shared/components';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Sheet, SheetContent } from '@/shared/components/ui/sheet';
import { useMobile } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import { convertUnderscoreToSpace } from '@/shared/utils';
import { returnStatus } from '@/shared/utils/helpers';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import {
  ArrowLeft01Icon,
  ArrowTurnForwardIcon,
  CircleIcon,
  Delete01Icon,
  FilterVerticalIcon,
} from 'hugeicons-react';
import { useState } from 'react';
import { propertyStatusOptions, unitFilterOptions } from '../../constants';
import type { PropertyFilters } from '../../types/property';

type PropertyFilterProps = {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
};
export function PropertyFilter({ filters, onChange }: PropertyFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('main');
  const { isMobile } = useMobile();

  const activeCount = [
    filters.status,
    filters.unitType,
    filters.minUnits,
  ].filter((v) => v).length;

  const handleClearFilters = () => {
    onChange({ status: null, unitType: null, minUnits: null });
  };

  const MainView = () => (
    <div className="flex flex-col gap-1">
      <button onClick={() => setView('status')} className="px-4 py-3 text-left">
        <div className="flex items-center justify-between">
          <span className="text-body text-black-500">Status</span>
          {filters.status && (
            <span className="text-body-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
      </button>

      <button
        onClick={() => setView('units')}
        className="px-4 py-3 text-left border-b border-b-gray-50"
      >
        <div className="flex items-center justify-between">
          <span className="text-body text-black-500">Units</span>
          {(filters.unitType || filters.minUnits) && (
            <span className="text-body-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
      </button>

      {activeCount > 0 && (
        <Button
          variant="tertiary"
          onClick={handleClearFilters}
          className="rounded-full"
        >
          <Delete01Icon className="size-4" />
          Clear filters
        </Button>
      )}
    </div>
  );

  const StatusView = () => {
    return (
      <div className="flex flex-col">
        <div className="flex items-center gap-2 py-2 text-black-300">
          <button onClick={() => setView('main')}>
            <ArrowLeft01Icon className="size-4" />
          </button>
          <span className="text-body">Status</span>
        </div>

        {propertyStatusOptions.map((status) => {
          const { bgColor, fillColor, textColor } = returnStatus(status.value);
          return (
            <div
              className="py-2 px-1 cursor-pointer"
              onClick={() => {
                onChange({ ...filters, status: status.value });
                setView('main');
              }}
            >
              <Badge className={`${bgColor} ${textColor}`}>
                <CircleIcon className={cn(`size-[7px] ${fillColor}`)} />
                {<span>{convertUnderscoreToSpace(status.value)}</span>}
              </Badge>
            </div>
          );
        })}
      </div>
    );
  };

  const UnitsView = () => {
    const [localUnitType, setLocalUnitType] = useState(filters.unitType || '');
    const [localMinUnits, setLocalMinUnits] = useState(filters.minUnits || '');

    const handleApply = () => {
      onChange({
        ...filters,
        unitType: localUnitType,
        minUnits: localMinUnits,
      });
      setView('main');
    };
    return (
      <div className="flex flex-col">
        <div className="flex items-center gap-2 py-2 text-black-300">
          <button onClick={() => setView('main')} className="p-1">
            <ArrowLeft01Icon className="size-4" />
          </button>
          <span className="text-body">Units</span>
        </div>

        <div className="p-4 space-y-4">
          <Select value={localUnitType} onValueChange={setLocalUnitType}>
            <SelectTrigger>
              <SelectValue placeholder="Select unit range" />
            </SelectTrigger>
            <SelectContent>
              {unitFilterOptions.map((filter) => (
                <SelectItem value={filter.value}>{filter.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <ArrowTurnForwardIcon className="size-4 text-primary-500" />
            <Input
              type="number"
              value={localMinUnits}
              onChange={(e) => setLocalMinUnits(e.target.value)}
              placeholder="Enter minimum units"
              size="sm"
            />
          </div>
          <Button className="w-full" size="sm" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </div>
    );
  };

  const content =
    view === 'main' ? (
      <MainView />
    ) : view === 'status' ? (
      <StatusView />
    ) : (
      <UnitsView />
    );

  const filterButton = (
    <ButtonGroup onClick={() => isMobile && setIsOpen(!isOpen)}>
      <Button variant="tertiary" className="gap-2 pr-1 py-1 rounded-full">
        <FilterVerticalIcon className="h-4 w-4" />
        <span className="hidden md:inline text-body">Filters</span>
        <Badge className="ml-auto rounded-full size-7 bg-white text-black-500 text-body">
          {activeCount ?? 0}
        </Badge>
      </Button>
    </ButtonGroup>
  );

  if (isMobile) {
    return (
      <>
        {filterButton}
        <Sheet
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setView('main');
          }}
        >
          <SheetContent
            side="bottom"
            className="rounded-t-[30px] border-t-0 h-[40vh] p-3"
          >
            <div className="flex justify-center">
              <div className="h-[4px] w-[50px] bg-gray-50" />
            </div>
            <div>{content}</div>
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
        if (!open) setView('main');
      }}
    >
      <DropdownMenuTrigger asChild>{filterButton}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white w-64 border border-custom-neutral-50 rounded-2xl shadow-ter p-2"
        align="end"
      >
        <DropdownMenuGroup>{content}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
