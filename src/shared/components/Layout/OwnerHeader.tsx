import logo from '@/assets/images/logo.png';
import { Menu01Icon } from 'hugeicons-react';
import { useSidebar } from '../ui/sidebar';

export const OwnerHeader = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className='p-4 flex items-center'>  
      <div className="flex gap-4 md:hidden">
        <Menu01Icon
          className="text-black-500 cursor-pointer size-6"
          onClick={toggleSidebar}
        />
        <div className="flex items-center gap-2">
          <img src={logo} alt="RentBook" className="size-[34px]" />
          <h4 className="logo-text text-black-500">rentbook</h4>
        </div>
      </div>
    </div>
  );
};
