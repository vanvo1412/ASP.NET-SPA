import { Action } from "@ngrx/store";

export const LOAD = '[Product] Load'

export class LoadAction implements Action {
  readonly type = LOAD
}

export type Actions = LoadAction
