import { PropertyType, SortType } from './const';
import { Offer } from './types/offer';

export function getPropertyType(offerType: keyof typeof PropertyType) {
  return PropertyType[offerType];
}

export function getFavoriteCities(offers: Offer[]): string[] {
  const favoriteCities = Array.from(new Set(offers.map((it) => it.city.name)));
  return favoriteCities;
}

export const sortOffers = (city: string, offers: Offer[], sortType: SortType): Offer[] => {
  const filteredOffers = offers.filter((it) => it.city.name === city);
  let sortedOffersBySortType;
  switch (sortType) {
    case SortType.Default:
      sortedOffersBySortType = filteredOffers;
      break;
    case SortType.PriceLowToHigh:
      sortedOffersBySortType = filteredOffers.sort((a, b) => a.price - b.price);
      break;
    case SortType.PriceHighToLow:
      sortedOffersBySortType = filteredOffers.sort((a, b) => b.price - a.price);
      break;
    case SortType.RatingHighToLow:
      sortedOffersBySortType = filteredOffers.sort((a, b) => b.rating - a.rating);
      break;
  }
  return sortedOffersBySortType;
};
