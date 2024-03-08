
import { LoaderAction } from "./loader.action";
import { LOADING } from "./loader.type";
const initialState = {
  loading: false,
};
export interface LoaderReducerInitialState {
  loading: boolean;
}

function loaderReducer(
  state: LoaderReducerInitialState = initialState,
  action: LoaderAction
): LoaderReducerInitialState {
  switch (action.type) {
    case LOADING:

      return { ...state, loading: action.payload };

    default:
      return state;
  }
}
export default loaderReducer;
