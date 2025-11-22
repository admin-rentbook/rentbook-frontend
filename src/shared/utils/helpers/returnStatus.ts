import { STATUS, type Status } from '@/shared/constants';

export const returnStatus = (status: Status) => {
  const statusColors: Record<
    Status,
    {
      bgColor: string;
      textColor: string;
      fillColor: string;
    }
  > = {
    [STATUS.ACTIVE]: {
      bgColor: 'bg-success-100',
      textColor: 'text-success-500',
      fillColor: 'fill-success-500',
    },
    [STATUS.INACTIVE]: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-500',
      fillColor: 'fill-red-500',
    },
    [STATUS.PENDING]: {
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-500',
      fillColor: 'fill-yellow-500',
    },
  };

  return statusColors[status];
};
