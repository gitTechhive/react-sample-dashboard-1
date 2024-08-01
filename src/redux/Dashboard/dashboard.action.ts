import { RooteAction } from "../store";
import { DASHBOARD_SUCCESS, DASHBOARD_FAILURE } from "./dashboard.type";

/**
 * Action creator function to dispatch action when dashbord request is successful.
 * @param obj Object containing dashbord
 * @returns Action object with type DASHBOARD_SUCCESS and payload obj.
 */
export const dashboardSuccess = (obj): RooteAction => {
    return { type: DASHBOARD_SUCCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when forgot password request fails.
 * @returns Action object with type GET_FORGOT_PASSWORD_FAILURE and an empty payload.
 */
export const dashboardFailure = (): RooteAction => {
    return { type: DASHBOARD_FAILURE, payload: {} };
};