import { NameSpace, SortType } from '../../const';
import { State } from '../../types/state';

export const getCity = (state: State): string => state[NameSpace.App].city;
export const getSelectedOffer = (state: State): number | undefined => state[NameSpace.App].selectedOffer;
export const getSortType = (state: State): SortType => state[NameSpace.App].sortType;
