import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CitiesList, NameSpace } from '../../const';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  city: CitiesList.Paris as string,
  selectedOffer: undefined,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<{value: string}>) => {
      state.city = action.payload.value;
    },
    setSelectedOffer: (state, action: PayloadAction<number>) => {
      state.selectedOffer = action.payload;
    }
  }
});

export const {changeCity, setSelectedOffer} = appProcess.actions;
