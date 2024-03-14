import { combineReducers } from "redux";
import appReducer from './Loader/loader.reducer';


import genericReducer from "./generic/generic.reducer";
import loaderReducer from "./Loader/loader.reducer";
/**Combining multiple reducers into a single root reducer  */
const rootReducer = combineReducers({

    genericReducer,
    loaderReducer

})
/** Defining types for better type safety */
export type rootReducerType = ReturnType<typeof rootReducer>;
export type LoaderReducerType = ReturnType<typeof loaderReducer>;
export type genericReducerType = ReturnType<typeof genericReducer>;
export default rootReducer;