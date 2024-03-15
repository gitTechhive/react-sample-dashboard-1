import { RooteAction } from "../store";
import { GET_SIGN_UP_FAILURE, GET_SIGN_UP_SUCCESS, SEND_OTP_FAILURE, SEND_OTP_SUCCESS } from "./signUp.type";

/**
 * Action creator function to dispatch action when sign up is successful.
 * @param obj Object containing login data.
 * @returns Action object with type and payload.
 */
export const getSignUpSuccess = (obj): RooteAction => {
    return { type: GET_SIGN_UP_SUCCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when sign up fails.
 * @returns Action object with type and an empty payload.
 */
export const getSignUpFailure = (): RooteAction => {
    return { type: GET_SIGN_UP_FAILURE, payload: {} };
};
/**
 * Action creator function to dispatch action when OTP is successfully sent during sign up.
 * @param obj Object containing OTP data.
 * @returns Action object with type SEND_OTP_SUCCESS and payload obj.
 */
export const SendOtpSuccess = (obj): RooteAction => {
    return { type: SEND_OTP_SUCCESS, payload: obj };
};
/**
 * Action creator function to dispatch action when OTP sending fails during sign up.
 * @returns Action object with type SEND_OTP_FAILURE and an empty payload.
 */
export const SendOtpFailure = (): RooteAction => {
    return { type: SEND_OTP_FAILURE, payload: {} };
};