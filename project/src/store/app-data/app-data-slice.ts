import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppData } from '../../types/state';
import { deleteFavoriteOfferAction, fetchFavoriteOffersAction, fetchOffersAction, setFavoriteOfferAction } from '../api-action';

const initialState: AppData = {
  offers: [],
  isOffersDataLoading: false,
  favoriteOffers: [],
  isFavoriteOffersDataLoading: false,
  isFavoriteOfferSetting: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isFavoriteOffersDataLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersDataLoading = false;
      })
      .addCase(setFavoriteOfferAction.pending, (state) => {
        state.isFavoriteOfferSetting = true;
      })
      .addCase(deleteFavoriteOfferAction.pending, (state) => {
        state.isFavoriteOfferSetting = true;
      })
      .addCase(setFavoriteOfferAction.fulfilled, (state, action) => {
        state.favoriteOffers.push(action.payload);
        state.offers = state.offers.map((it) => it.id === action.payload.id ? action.payload : it);
        state.isFavoriteOfferSetting = false;
      })
      .addCase(deleteFavoriteOfferAction.fulfilled, (state, action) => {
        state.favoriteOffers = state.favoriteOffers.filter((it) => it.id !== action.payload.id);
        state.offers = state.offers.map((it) => it.id === action.payload.id ? action.payload : it);
        state.isFavoriteOfferSetting = false;
      });
  }
});

