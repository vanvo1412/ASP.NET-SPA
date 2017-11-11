import { Action } from "@ngrx/store";
import { Product } from "../../models/product";

export const LOAD = "[Product] Load";
export const SELECT = "[Product] Select";

export class LoadAction implements Action {
  readonly type = LOAD;
  constructor(public payload: Product[]) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;
  constructor(public payload: number) {}
}

export type Actions = LoadAction | SelectAction;
