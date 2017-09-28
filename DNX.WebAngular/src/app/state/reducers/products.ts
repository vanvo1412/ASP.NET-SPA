import { createSelector } from '@ngrx/store'
import * as product from '../actions/product'

export interface State {
  ids: string[];
  entities: { [id: string]: Product };
  selectedBookId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedBookId: null
}

export function reducer(state = initialState, action: product.Actions): State {
  switch (action.type) {
    case product.LOAD: {

      break;
    }
    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id])
})
