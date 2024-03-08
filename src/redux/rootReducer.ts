import { combineReducers } from "redux";
import appReducer from './Loader/loader.reducer';


import genericReducer from "./generic/generic.reducer";
import loaderReducer from "./Loader/loader.reducer";

const rootReducer = combineReducers({
    
    genericReducer,
    loaderReducer

})
export type rootReducerType = ReturnType<typeof rootReducer>;
export type LoaderReducerType = ReturnType<typeof loaderReducer>;
export type genericReducerType = ReturnType<typeof genericReducer>;
export default rootReducer;