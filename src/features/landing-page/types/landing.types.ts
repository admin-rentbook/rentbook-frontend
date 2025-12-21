export type PropertyType = 'apartment' | 'house' | 'townhouse';

export type SearchFilters = {
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  priceRange: [number, number];
};
