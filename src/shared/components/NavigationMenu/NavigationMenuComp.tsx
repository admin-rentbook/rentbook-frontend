import type { ReactNode } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui';

type NavigationMenuCompProps = {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
};
export const NavigationMenuComp = ({
  trigger,
  children,
  className,
}: NavigationMenuCompProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{trigger}</NavigationMenuTrigger>
          <NavigationMenuContent className={className}>
            {children}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
