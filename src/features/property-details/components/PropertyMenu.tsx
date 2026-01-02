import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Sheet,
} from '@/shared/components';
import { useMobile } from '@/shared/hooks';
import { MoreHorizontalCircle01Icon } from 'hugeicons-react';

type PropertyMenuProps = {
  handlers: {
    handleCreateComplex: () => void;
    handleAddAgent: () => void;
    handleEditProperty: () => void;
    handleDeactivateProperty: () => void;
    handleBackToProperties: () => void;
  };
};

export const PropertyMenu = ({ handlers }: PropertyMenuProps) => {
  const { isMobile } = useMobile();

  const menuItems = [
    {
      name: 'Create complex',
      action: handlers.handleCreateComplex,
    },
    {
      name: 'Add agent',
      action: handlers.handleAddAgent,
    },
    {
      name: 'Edit property',
      action: handlers.handleEditProperty,
    },
    {
      name: 'Deactivate property',
      action: handlers.handleDeactivateProperty,
    },
  ];

  if (isMobile) {
    return (
      <Sheet
        trigger={
          <Button variant="outline" size="sm">
            <MoreHorizontalCircle01Icon />
          </Button>
        }
        className="max-h-[50vh] p-5 rounded-t-2xl"
        children={
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="cursor-pointer flex gap-2"
                onClick={item.action}
              >
                {item.name === 'Deactivate property' ? (
                  <div className="text-body text-red-400">
                    <p>{item.name}</p>
                  </div>
                ) : (
                  <div className="text-body">
                    <p className="text-body text-icons-black">{item.name}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        }
      />
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <MoreHorizontalCircle01Icon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white shadow-ter rounded-2xl p-2 border-0 z-1"
        sideOffset={10}
        side="left"
      >
        <DropdownMenuGroup className="space-y-2">
          {menuItems.map((item) => (
            <DropdownMenuItem
              key={item.name}
              className="cursor-pointer"
              onClick={item.action}
            >
              {item.name === 'Deactivate property' ? (
                <div className="text-body text-red-400">
                  <p>{item.name}</p>
                </div>
              ) : (
                <div className="text-body">
                  <p className="text-body text-icons-black">{item.name}</p>
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
