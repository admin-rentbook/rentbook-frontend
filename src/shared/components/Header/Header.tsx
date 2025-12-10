import { Button } from '@/shared/components';
import { Cancel01Icon } from 'hugeicons-react';

type HeaderProps = {
  title: string;
  onCancel: () => void;
  onAction?: React.ReactNode;
};
export const Header = (props: HeaderProps) => {
  return (
    <div className="top-0 left-0 right-0 border-b-gray-50 z-1 bg-white border-b-none lg:border-b">
      <div className="h-[68px] p-5 flex justify-between">
        <div className="flex items-center text-heading-4 text-black-400 gap-4">
          <Button variant="icon" onClick={props.onCancel}>
            <Cancel01Icon className="size-6" />
          </Button>
          <div className="w-[2px] bg-custom-gray-500 h-full" />
          <h5 className="text-black-400">{props.title}</h5>
        </div>

        {props.onAction && props.onAction}
      </div>
    </div>
  );
};
