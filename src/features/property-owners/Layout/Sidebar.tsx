import logo from '@/assets/images/logo.png';
import { Button } from '@/shared/components';
import { ArrowReloadHorizontalIcon, SidebarLeftIcon } from 'hugeicons-react';
import { sidebarItems } from '../constants';

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Sidebar = (props: SidebarProps) => {
  return (
    <aside
      className={`hidden lg:flex flex-col gap-5 justify-between  px-4 border-r-gray-50 border-r-1 bg-background transition-all duration-300 ${
        props.isCollapsed ? 'w-6' : 'w-70'
      }`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex h-[70px] items-center justify-between">
          {!props.isCollapsed && (
            <div className="flex items-center gap-2">
              <img src={logo} className="h-[41px] w-11" />
              <h4 className="logo-text text-black-500">rentbook</h4>
            </div>
          )}
          <Button
            variant="icon"
            onClick={() => props.setIsCollapsed(!props.isCollapsed)}
            className="px-0"
          >
            <SidebarLeftIcon />
          </Button>
        </div>

        <div className="flex p-1 items-center rounded-xl justify-between border border-gray-50">
          <p className="text-body text-black-500">Switch to renter</p>
          <div className="px-2.5 py-1.5 bg-muted rounded-[9px]">
            <ArrowReloadHorizontalIcon className="size-4" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {sidebarItems.slice(0, 4).map((item) => (
            <div
              key={item.name}
              className="group flex py-1 items-center gap-[10px] px-[6px] rounded-lg"
            >
              <item.icon className="size-4 text-black-400 group-hover:text-black-500" />
              <p className="text-body text-black-400 group-hover:text-white">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {sidebarItems.slice(4, 7).map((item) => (
            <div
              key={item.name}
              className="flex py-1 items-center gap-[10px] px-[6px] rounded-lg hover:bg-muted hover:cursor-pointer"
            >
              <item.icon className="size-4 text-black-400" />
              <p className="text-body text-black-400">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {sidebarItems.slice(7).map((item) => (
          <div
            key={item.name}
            className="flex py-1 items-center gap-[10px] px-[6px] rounded-lg hover:bg-muted hover:cursor-pointer"
          >
            <item.icon className="size-4 text-black-400" />
            <p className="text-body text-black-400">{item.name}</p>
          </div>
        ))}
      </div>
    </aside>
  );
};
