import { LOADING } from "./loader.type";

export interface LoaderAction {
  type: string;
  payload: boolean;
}

export const loading = (obj: boolean): LoaderAction => {

  return { type: LOADING, payload: obj };
};
