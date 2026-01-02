import type { LocationResult } from '../types';

/**
 * Default address to use when Google Maps API is unavailable
 * This is a temporary fallback until the Google Maps API is paid for
 */
export const DEFAULT_ADDRESS: LocationResult = {
  placeId: 'EhROYW1pYmlhIFN0LCBOYW1pYmlhIi4qLAoUChIJa0DpdqTiChwRxWC0P_PZ3N8SFAoSCSF10259PPUbEWGy7Kily7nT',
  address: 'Namibia Street, Windhoek, Namibia',
  lat: -22.5609,
  lng: 17.0658,
  street: 'Namibia Street',
  city: 'Windhoek',
  state: 'Khomas Region',
  country: 'Namibia',
  postalCode: '',
};