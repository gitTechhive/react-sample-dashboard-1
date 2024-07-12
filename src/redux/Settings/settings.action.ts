import { RooteAction } from "../store";
import { CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_SUCCESS, EDIT_PROFILE_FAILURE, EDIT_PROFILE_SUCCESS, GET_PROFILE_FAILURE, GET_PROFILE_SUCCESS } from "./settings.type";

/**
 * Action creator function to dispatch action when dashbord request is successful.
 * @param obj Object containing dashbord
 * @returns Action object with type DASHBOARD_SUCCESS and payload obj.
 */
export const getDataSuccess = (obj): RooteAction => {
    return { type: GET_PROFILE_SUCCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when forgot password request fails.
 * @returns Action object with type GET_FORGOT_PASSWORD_FAILURE and an empty payload.
 */
export const getDataFailure = (): RooteAction => {
    return { type: GET_PROFILE_FAILURE, payload: {} };
};

export const editProfileSuccess = (obj): RooteAction => {
    return { type: EDIT_PROFILE_SUCCESS, payload: obj };
};

export const editProfileFailure = (): RooteAction => {
    return { type: EDIT_PROFILE_FAILURE, payload: {} };
};

export const changePasswordSuccess = (obj): RooteAction => {
    return { type: CHANGE_PASSWORD_SUCCESS, payload: obj };
};

export const changePasswordFailure = (): RooteAction => {
    return { type: CHANGE_PASSWORD_FAILURE, payload: {} };
};