import { Button, Sheet } from '@/shared/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { useMobile } from '@/shared/hooks';
import { MoreHorizontalCircle01Icon } from 'hugeicons-react';

type ListingActionsMenuProps = {
  listingId: number;
  onAddToComplex?: () => void;
  onEditListing?: () => void;
  onShareListing?: () => void;
  onPreviewListing?: () => void;
  onAssignAgent?: () => void;
  onMarkUnavailable?: () => void;
};

export const ListingActionsMenu = ({
  // listingId,
  onAddToComplex,
  onEditListing,
  onShareListing,
  onPreviewListing,
  onAssignAgent,
  onMarkUnavailable,
}: ListingActionsMenuProps) => {
  const { isMobile } = useMobile();

  const menuItems = [
    {
      label: 'Add to complex',
      onClick: onAddToComplex,
    },
    {
      label: 'Edit listing',
      onClick: onEditListing,
    },
    {
      label: 'Share listing',
      onClick: onShareListing,
    },
    {
      label: 'Preview listing',
      onClick: onPreviewListing,
    },
    {
      label: 'Assign agent',
      onClick: onAssignAgent,
    },
    {
      label: 'Mark as unavailable',
      onClick: onMarkUnavailable,
    },
  ];

  const Trigger = (
    <Button className="w-full lg:w-1/2" variant="outline" size="sm">
      <MoreHorizontalCircle01Icon />
    </Button>
  );

  const MenuContent = (
    <div className="flex flex-col items-start hover:bg-sidebar hover:rounded-[8px]">
      {menuItems.map((item) => (
        <Button
          key={item.label}
          onClick={item.onClick}
          variant="ghost"
          className="p-0"
        >
          <p className="text-body text-black-500">{item.label}</p>
        </Button>
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet
        trigger={Trigger}
        children={MenuContent}
        className="max-h-[60vh] rounded-t-[1.25em] p-6"
      />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{Trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 py-3 shadow-custom-sm rounded-[1.25em] z-1 bg-white"
      >
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={item.onClick}
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-sidebar hover:rounded-[8px]"
          >
            <span className="text-body-small text-black-500">{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
