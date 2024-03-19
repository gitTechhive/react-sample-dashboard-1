import { RooteAction } from "../store";
import { GET_FORGOT_PASSWORD_FAILURE, GET_FORGOT_PASSWORD_SUCCESS, GET_VERIFY_OTP_FAILURE, GET_VERIFY_OTP_SUCCESS, SEND_OTP_TO_MAIL_FAILURE, SEND_OTP_TO_MAIL_SUCCESS } from "./forgotPassword.type";

/**
 * Action creator function to dispatch action when login is successful.
 * @param obj Object containing login data.
 * @returns Action object with type and payload.
 */
export const getForgotPasswordSuccess = (obj): RooteAction => {
    return { type: GET_FORGOT_PASSWORD_SUCCESS, payload: obj };
  };
  /**
   * Action creator function to dispatch action when login fails.
   * @returns Action object with type and an empty payload.
   */
  export const getForgotPasswordFailure = (): RooteAction => {
    return { type: GET_FORGOT_PASSWORD_FAILURE, payload: {} };
  };
/**
 * Action creator function to dispatch action when login is successful.
 * @param obj Object containing login data.
 * @returns Action object with type and payload.
 */
export const sendOtpToMailSuccess = (obj): RooteAction => {
    return { type: SEND_OTP_TO_MAIL_SUCCESS, payload: obj };
  };
  /**
   * Action creator function to dispatch action when login fails.
   * @returns Action object with type and an empty payload.
   */
  export const sendOtpToMailFailure = (): RooteAction => {
    return { type: SEND_OTP_TO_MAIL_FAILURE, payload: {} };
  };
/**
 * Action creator function to dispatch action when login is successful.
 * @param obj Object containing login data.
 * @returns Action object with type and payload.
 */
export const getVerifyOtpSuccess = (obj): RooteAction => {
    return { type: GET_VERIFY_OTP_SUCCESS, payload: obj };
  };
  /**
   * Action creator function to dispatch action when login fails.
   * @returns Action object with type and an empty payload.
   */
  export const getVerifyOtpFailure = (): RooteAction => {
    return { type: GET_VERIFY_OTP_FAILURE, payload: {} };
  };