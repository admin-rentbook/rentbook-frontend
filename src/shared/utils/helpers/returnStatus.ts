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
    [STATUS.AVAILABLE]: {
      bgColor: 'bg-success-100',
      textColor: 'text-success-500',
      fillColor: 'fill-success-500',
    },
    [STATUS.DRAFT]: {
      bgColor: 'bg-custom-neutral-50',
      textColor: 'text-custom-neutral-900',
      fillColor: 'fill-custom-neutral-900',
    },
    [STATUS.UNAVAILABLE]: {
      bgColor: 'bg-custom-blue-100',
      textColor: 'text-custom-blue-300',
      fillColor: 'fill-custom-blue-300',
    },
    [STATUS.SUBMITTED]: {
      bgColor: 'bg-custom-blue-100',
      textColor: 'text-custom-blue-300',
      fillColor: 'fill-custom-blue-300',
    },
  };

  return statusColors[status];
};
