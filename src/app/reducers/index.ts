import { reducer } from "./homeReducer"
import { ActionReducerMap } from '@ngrx/store';

export const reducers: ActionReducerMap<any> = {
  homeReducer: reducer
};