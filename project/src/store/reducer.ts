import { createReducer } from '@reduxjs/toolkit';
import { CitiesList } from '../const';
import { offers } from '../mocks/offers';
import { changeCity, getAllOffers } from './action';

const initialState = {
  city: CitiesList.Paris as string,
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
