export type PropertyType = 'Apartment' | 'House' | 'Townhouse';

export type SearchFilters = {
  propertyType: PropertyType | null;
  bedrooms: number;
  bathrooms: number;
  priceRange: [number, number];
};
