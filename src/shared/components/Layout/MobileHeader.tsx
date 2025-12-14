import logo from '@/assets/images/logo.png';
import { Menu01Icon } from 'hugeicons-react';
import { useSidebar } from '../ui/sidebar';

export const MobileHeader = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="p-6 pb-2 lg:pb-6 flex items-center gap-4 md:hidden border-b border-gray-200">
      <Menu01Icon
        className="text-black-500 cursor-pointer size-6"
        onClick={toggleSidebar}
      />
      <div className="flex items-center gap-2">
        <img src={logo} alt="RentBook" className="size-[34px]" />
        <h4 className="logo-text text-black-500">rentbook</h4>
      </div>
    </div>
  );
};
