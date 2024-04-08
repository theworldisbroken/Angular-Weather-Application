import { createReducer, on } from '@ngrx/store';

import { changeCountry } from '../actions/home.actions';

export interface State {
    country: string;
}

export const initialState: State = {
    country: ""
};

export const featureReducer = createReducer(
    initialState,
    on(changeCountry, (state, action) => ({ ...state, country: action.country })),
);

export function reducer(state: State | undefined, action: any) {
    return featureReducer(state, action);
}