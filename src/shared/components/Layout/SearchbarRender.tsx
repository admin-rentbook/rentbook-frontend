import type { SidebarItem } from '@/shared/types';
import { useState } from 'react';
import { SearchBox } from '../SearchBox';
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

type SpecialCompRenderProps = {
  item: SidebarItem;
  open: boolean;
};
export const SpecialCompRender = (props: SpecialCompRenderProps) => {
  const [input, setInput] = useState('');

  return (
    <SidebarMenuItem>
      {props.open ? (
        <div className="px-2 py-1">
          <SearchBox
            placeholder="Search properties..."
            inputValue={input}
            setInputValue={setInput}
            name="input"
          />
        </div>
      ) : (
        <SidebarMenuButton tooltip="Search">
          <props.item.icon className="size-4" />
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  );
};
