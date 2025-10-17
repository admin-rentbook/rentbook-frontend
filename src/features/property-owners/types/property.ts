import type { PropertyStatusType } from '../constants';

export type PropertyDTO = {
  name: string;
  address: string;
  unit: number;
  totalUnits: number;
  status: PropertyStatusType;
};
