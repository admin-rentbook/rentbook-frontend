import type { ListingDescriptionDTO } from "../listing.dtos";

export const mapListingDescriptionDtoToDraft = (
  dto?: ListingDescriptionDTO
) => {
  if (!dto) return undefined;

  return {
    listingTitle: dto.title,
    listingType: dto.listing_type,
    listingDescription: dto.description,
    noOfBeds: dto.beds,
    noOfBathrooms: dto.bathrooms,
    sizeSqFt: dto.size_sqft,
    blockId: dto.complex?.complex_id,
    blockName: dto.complex?.new_complex_name,
    isAddListingToComplex: Boolean(dto.complex),
  };
};