import { createSelector } from "@ngrx/store";
import * as productActions from "../actions/product";
import { Product } from '../../models/product';

export interface State {
  ids: number[];
  entities: { [id: number]: Product };
  selectedProductId: number | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedProductId: null
};

export function reducer(
  state = initialState,
  action: productActions.Actions
): State {
  switch (action.type) {
    case productActions.LOAD: {
      const products = action.payload;
      const productEntities = products.reduce((entities: { [id: string]: Product }, product: Product) => {
        return Object.assign(entities, {
          [product.productId]: product
        });
      }, {});

      return Object.assign({}, state, {
        ids: products.map(product => product.productId),
        entities: productEntities,
        selectedProductId: state.selectedProductId
      });
    }
    case productActions.SELECT: {
      return Object.assign({}, state, {
        ids: state.ids,
        entities: state.entities,
        selectedProductId: action.payload
      });
    }
    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedProductId;

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => {
    return entities[selectedId];
  }
);

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
