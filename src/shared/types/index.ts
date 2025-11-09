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
  showErrorMessage?: boolean;
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
