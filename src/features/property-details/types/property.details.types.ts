export type ListingStatusTypes = 'available' | 'unavailable' | 'draft' | null;
export type AgentStatusTypes = 'active' | 'pending' | 'inactive' | null;

export type DisplayViewType = 'list' | 'grid';
export type GroupingType = 'complex' | 'listings' | null;

export type ListingFilters = {
  status: ListingStatusTypes;
};

export type AgentFilters = {
  status: AgentStatusTypes;
};

export type DisplayOptions = {
  viewType: DisplayViewType;
  grouping: GroupingType;
};

export type ListingTableDTO = {
  id?: string;
  images: string[];
  propertyName: string;
  amount: number;
  bedrooms: number;
  bathrooms: number;
  square: number;
  description?: string;
  propertyType?: string;
  status: ListingStatusTypes;
};
