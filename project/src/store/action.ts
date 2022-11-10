import { createAction } from '@reduxjs/toolkit';
import { City } from '../const';

export const changeCity = createAction<{value: keyof typeof City}>('changeCity');

export const getAllOffers = createAction('getAllOffers');
