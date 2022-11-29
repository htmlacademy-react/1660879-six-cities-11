import { store } from '../store';
import { AuthorizationStatus } from '../const';
import { Offer } from './offer';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
}

export type AppData = {
  offers: Offer[];
  isOffersDataLoading: boolean;
  favoriteOffers: Offer[];
  isFavoriteOffersDataLoading: boolean;
}

export type AppProcess = {
  city: string;
  selectedOffer: number | undefined;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
