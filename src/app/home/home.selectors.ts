import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "../reducers/homeReducer";

export const selectHomeState = createFeatureSelector<State>('homeReducer');

export const selectMyStates = createSelector(
    selectHomeState,
    (state: State) => {
        return {
            country: state.country,
        };
    }
)