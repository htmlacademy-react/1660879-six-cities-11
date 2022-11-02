import { PropertyType } from './const';
import { Offer } from './types/offer';

export function getPropertyType(offerType: keyof typeof PropertyType) {
  return PropertyType[offerType];
}

export function getAllFavoriteOffersAndCities(offers: Offer[]) {
  const allFavoriteOffers = offers.filter((it) => it.isFavorite);
  const favoriteCities = Array.from(new Set(allFavoriteOffers.map((it) => it.city.name)));
  return {
    allFavoriteOffers: allFavoriteOffers,
    favoriteCities: favoriteCities
  };
}
