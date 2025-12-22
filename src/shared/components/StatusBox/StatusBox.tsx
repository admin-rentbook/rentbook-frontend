import { cn } from '@/shared/lib/utils';
import { CircleIcon } from 'hugeicons-react';
import { Badge } from '../ui';

type StatusBoxProps = {
  bgColor: string;
  textColor: string;
  text: string;
  fillColor: string;
};

export const StatusBox = (props: StatusBoxProps) => {
  const { bgColor, textColor, fillColor, text } = props;
  return (
    <Badge className={`${bgColor} ${textColor} px-2 py-[6px] rounded-[8px] flex gap-2`}>
      <CircleIcon
        className={cn(`${fillColor} rounded-full`)}
        style={{ height: '7px', width: '7px' }}
      />
      {<span>{text}</span>}
    </Badge>
  );
};
