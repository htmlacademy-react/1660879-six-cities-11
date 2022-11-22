import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { AppDispatch, State } from '../types/state';
import { loadOffers, setOffersDataLoadingStatus } from './action';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);
