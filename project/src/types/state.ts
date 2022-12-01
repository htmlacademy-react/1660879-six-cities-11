import { store } from '../store';
import { AuthorizationStatus, SortType } from '../const';
import { Offer } from './offer';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
}

export type AppData = {
  offers: Offer[];
  isOffersDataLoading: boolean;
  favoriteOffers: Offer[];
  isFavoriteOffersDataLoading: boolean;
  isFavoriteOfferSetting: boolean;
}

export type AppProcess = {
  city: string;
  selectedOffer: number | undefined;
  sortType: SortType;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
