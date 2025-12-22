export type PropertyType = 'apartment' | 'house' | 'townhouse' | null;

export type SearchFilters = {
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  priceRange: [number, number];
};
