import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CitiesList, NameSpace, SortType } from '../../const';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  city: CitiesList.Paris as string,
  selectedOffer: undefined,
  sortType: SortType.Default,
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
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    }
  }
});

export const {changeCity, setSelectedOffer, setSortType} = appProcess.actions;
