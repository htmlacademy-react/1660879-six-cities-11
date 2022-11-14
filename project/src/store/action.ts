import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction<{value: string}>('changeCity');

export const getAllOffers = createAction('getAllOffers');
