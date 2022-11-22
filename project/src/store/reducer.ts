import { createReducer } from '@reduxjs/toolkit';
import { CitiesList } from '../const';
import { Offer } from '../types/offer';
import { changeCity, loadOffers } from './action';

type InitialState = {
  city: string;
  offers: Offer[];
}

const initialState: InitialState = {
  city: CitiesList.Paris as string,
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.value;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
