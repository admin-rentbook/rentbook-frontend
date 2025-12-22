import { PROPERTY_STATUS, type PropertyStatusType } from '../constants';

export const returnPropertyStatusBadge = (status: PropertyStatusType) => {
  const statusColors: Record<
    PropertyStatusType,
    {
      bgColor: string;
      textColor: string;
      fillColor: string;
    }
  > = {
    [PROPERTY_STATUS.ACTIVE]: {
      bgColor: 'bg-success-100',
      textColor: 'text-success-500',
      fillColor: 'fill-success-500',
    },
    [PROPERTY_STATUS.INACTIVE]: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-500',
      fillColor: 'fill-red-500',
    },
  };

  return statusColors[status];
};
