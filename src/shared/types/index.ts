import type { HugeiconsProps } from 'hugeicons-react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface BaseFieldProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'name' | 'defaultValue' | 'defaultChecked' | 'size'
  > {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface GenericResponse {
  success: boolean;
  message: string;
  error: string;
}
export interface ApiResponse<TData> extends GenericResponse {
  data: TData;
}
export interface PaginatedResponse<T> extends GenericResponse {
  data: T;
}
type Sort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};
type PageAble = {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};
export interface Paginate<T> {
  pageAble: PageAble;
  totalPages: number;
  totalElements: number;
  last: boolean;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  empty: boolean;
  content: T[];
}

export interface LocationResult {
  lat: number;
  lng: number;
  address: string;
  placeId: string;
}
export type SidebarItem = {
  icon: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  name?: string;
  link?: string;
};

type Amenity = {
  icon: React.ComponentType<{ className?: string }>;
  count: number;
  label: string;
};

export type PropertyDTO = {
  images: string[];
  propertyName: string;
  location: string;
  amenities: Amenity[];
  amount: number;
};
