import { RooteAction } from "../store";
import { DASHBOARD_SUCCESS, DASHBOARD_FAILURE } from "./dashboard.type";

/**
 * Represents the initial state for the dashboard feature.
 */
export interface DashboardInitializeState {
    dashboardData: any;
    /** Indicates whether an asynchronous operation is in progress */
    loading: boolean;
}
/** Define the initial state */
const initialState: DashboardInitializeState = {
    dashboardData: null,
    loading: false,
};

/**
* Reducer function responsible for managing state related to the forgot password feature.
* @param state Current state of the forgot password module. Defaults to initial state if not provided.
* @param action Action dispatched to update the state.
* @returns Updated state based on the dispatched action.
*/
function DashboardReducer(
    state: DashboardInitializeState = initialState,
    action: RooteAction
): DashboardInitializeState {
    switch (action.type) {
        case DASHBOARD_SUCCESS:
            return {
                ...state,
                dashboardData: action.payload,
                loading: false,
            };

        case DASHBOARD_FAILURE:
            return {
                ...state,
                dashboardData: null,
                loading: false,
            };


        default:
            return state;
    }
}
export default DashboardReducer;