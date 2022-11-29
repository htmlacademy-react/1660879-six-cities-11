import { PropertyType } from './const';
import { Offer } from './types/offer';

export function getPropertyType(offerType: keyof typeof PropertyType) {
  return PropertyType[offerType];
}

export function getFavoriteCities(offers: Offer[]) {
  const favoriteCities = Array.from(new Set(offers.map((it) => it.city.name)));
  return favoriteCities;
}
