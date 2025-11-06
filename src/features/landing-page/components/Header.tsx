import { InputGroupAddon, SearchBox } from '@/shared/components';
import { ArrowReloadHorizontalIcon, Search01Icon } from 'hugeicons-react';
import { useState } from 'react';
import { Menu } from './Menu';

export const Header = () => {
  const [input, setInput] = useState('');
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-end">
        <div className="flex gap-[20px]">
          <div className="flex items-center hover:cursor-pointer gap-2 bg-sidebar-accent rounded-full pl-2 py-2 pr-3">
            <div className="size-[32px] rounded-full flex items-center justify-center bg-white">
              <ArrowReloadHorizontalIcon className="size-[17px]" />
            </div>
            <p className="text-body-medium text-black-500">
              List your property
            </p>
          </div>
          <Menu />
          {/* <Avatar className="size-[50px] bg-black">
            <AvatarFallback className="bg-black">
              <p className="text-heading-xl-medium text-white">R</p>
            </AvatarFallback>
          </Avatar> */}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col gap-8 items-center">
          <h1 className="text-heading-xl text-black-500 text-center min-w-xl">
            Find your dream home that
            <br /> tick all your boxes
          </h1>
          <div className="w-full max-w-3xl">
            <SearchBox
              placeholder="What is your desired location?"
              inputValue={input}
              setInputValue={setInput}
              name="keyword"
              containerClassName="h-[30px] lg:h-[60px] rounded-full"
              addon={
                <InputGroupAddon align="inline-end">
                  <div className="size-10 rounded-full bg-primary-500 flex items-center justify-center">
                    <Search01Icon className="size-4 text-white" />
                  </div>
                </InputGroupAddon>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
