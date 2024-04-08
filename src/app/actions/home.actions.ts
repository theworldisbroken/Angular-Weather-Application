import { createAction, props } from '@ngrx/store';

export const changeCountry = createAction('[State] String change', props<{ country: string }>());