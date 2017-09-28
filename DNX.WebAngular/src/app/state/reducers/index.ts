import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { environment } from '../../../environments/environment';

import * as fromProducts from './products'

export const reducers: ActionReducerMap<State> = {
  products: fromProducts.reducer
}

export interface State {
  products: fromProducts.State;
}
