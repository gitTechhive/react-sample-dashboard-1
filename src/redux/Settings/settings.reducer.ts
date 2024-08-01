import { RooteAction } from "../store";
import {
    CHANGE_PASSWORD_FAILURE,
    CHANGE_PASSWORD_SUCCESS,
    EDIT_PROFILE_FAILURE,
    EDIT_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    GET_PROFILE_SUCCESS
} from "./settings.type";

/**
 * Represents the initial state for the dashboard feature.
 */
export interface SettingInitializeState {
    updateData: any;
    getData: any;
    changePassword: any;
    /** Indicates whether an asynchronous operation is in progress */
    loading: boolean;
}
/** Define the initial state */
const initialState: SettingInitializeState = {
    updateData: null,
    getData: null,
    changePassword: null,
    loading: false,
};

/**
* Reducer function responsible for managing state related to the forgot password feature.
* @param state Current state of the forgot password module. Defaults to initial state if not provided.
* @param action Action dispatched to update the state.
* @returns Updated state based on the dispatched action.
*/
function settingReducer(
    state: SettingInitializeState = initialState,
    action: RooteAction
): SettingInitializeState {
    switch (action.type) {
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                getData: action.payload,
                loading: false,
            };

        case GET_PROFILE_FAILURE:
            return {
                ...state,
                getData: null,
                loading: false,
            };
        case EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                updateData: action.payload,
                loading: false,
            };

        case EDIT_PROFILE_FAILURE:
            return {
                ...state,
                updateData: null,
                loading: false,
            };
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                changePassword: action.payload,
                loading: false,
            };

        case CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                changePassword: null,
                loading: false,
            };


        default:
            return state;
    }
}
export default settingReducer;