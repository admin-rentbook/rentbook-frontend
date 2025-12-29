import type { Note } from '@/features/listings/types';
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
export type PaginateApiResponse<T> = ApiResponse<Paginate<T>>;

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
  totalElements: number;
  last: boolean;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  empty: boolean;
  count: number;
  page_size: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface LocationResult {
  lat: number;
  lng: number;
  address: string;
  placeId: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}
export type SidebarItem = {
  icon: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  name?: string;
  link?: string;
};

export type ImageWithThumbnail = {
  url: string;
  thumbnail?: string;
};

export type ListingDTO = {
  id?: number;
  images: string[] | ImageWithThumbnail[];
  title: string;
  location: string;
  amenities: string[];
  amount: number;
  rent_period?: 'MONTH' | 'YEAR' | 'month' | 'year';
  beds: number;
  bathrooms: number;
  size_sqft: number;
  description?: string;
  listing_type?: string;
  locationResult?: LocationResult;
  reviews?: ReviewDTO;
  notes?: Note[];
  isWaitlisted?: boolean;
  is_available?: boolean;
  availability_date?: string;
  viewing_fee?: number;
  booking_mode?: 'instant' | 'review';
};

// Keep old PropertyDTO for backward compatibility (deprecated)
/** @deprecated Use ListingDTO instead */
export type PropertyDTO = ListingDTO;

export type ReviewDTO = {
  id: number;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
};
export type Review = {
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
  image: string;
};

export type SubStepType = {
  id: number;
  title: string;
  component: React.ComponentType<{
    onNext?: () => void;
    onPrev?: () => void;
    goToStep?: (mainStepId: number, subStepId?: number) => void;
  }>;
  apiStepName?: string;
};

export type Step = {
  id: number;
  title: string;
  subSteps: SubStepType[];
  component?: React.ComponentType<{ onNext: () => void; onPrev: () => void }>;
};

export type StepProgress = {
  currentMainStep: number;
  currentSubStep: Record<number, number>;
  completedSteps: Record<string, boolean>;
  lastUpdated: string;
  apiSyncedSteps: Record<string, boolean>;
};


export type SelectCardType = {
  icon: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  name: string;
  value: string;
  subHeader?: string;
  description: string;
  bgColor: string;
  color: string;
};
