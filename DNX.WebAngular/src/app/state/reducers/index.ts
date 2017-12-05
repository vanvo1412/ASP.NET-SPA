import { createFeatureSelector, ActionReducerMap, createSelector } from '@ngrx/store';
import { environment } from '../../../environments/environment';

import * as fromProducts from './products';

export const reducers: ActionReducerMap<State> = {
  products: fromProducts.reducer
}

export interface State {
  products: fromProducts.State;
}

export const getProductsState = (state: State) => state.products;

export const getProducts = (state: State) => state.products.entities;
export const getProductIds = (state: State) => state.products.ids;

export const getProductsCollection = createSelector(getProducts, getProductIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
export const getSelectedProduct = createSelector(getProductsState, fromProducts.getSelected);
