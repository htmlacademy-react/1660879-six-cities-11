import { createReducer } from '@reduxjs/toolkit';
import { City } from '../const';
import { offers } from '../mocks/offers';
import { changeCity, getAllOffers } from './action';

const initialState = {
  city: City.Paris as keyof typeof City,
  offers: offers
};

export const reducer = createReducer(initialState, (builfer) => {
  builfer
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.value;
    })
    .addCase(getAllOffers, (state) => {
      state.offers = offers;
    });
});
