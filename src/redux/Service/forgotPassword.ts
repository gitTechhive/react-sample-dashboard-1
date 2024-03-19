



import { FORGOT_PASSWORD_DATA_API, SEND_OTP_TO_EMAIL_FOR_FORGOT_PASSWORD_API, VERIFY_OTP_FOR_FORGOT_PASSWORD_API } from "../../Utility/ApiList";
import { post } from "../../Utility/httpInterceptor";
import { loading } from "../Loader/loader.action";
import { getForgotPasswordFailure, getForgotPasswordSuccess, sendOtpToMailFailure, sendOtpToMailSuccess } from "../forgotPassword/forgotPassword.action";
import { AppDispatch } from "../store";

/**
*send Sign Up Data
* @param {*} objBody
* @method SignUpDataAPI
* @url users/
* @returns API will  return send Email otp
*/



export const ForgotPasswordDataAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            /** Dispatch loading action to indicate start of API call */
            dispatch(loading(true));
            try {
                /**Make API call to fetch Captcha data  */
                const response: any = await post(FORGOT_PASSWORD_DATA_API, objBody);
                /**Check if response doesn't contain error  */
                if (!response.data.error) {
                    /**Dispatch success action with fetched data  */
                    return dispatch(getForgotPasswordSuccess(response.data.data));
                } else {
                    /**  Dispatch failure action if API returns error */
                    dispatch(getForgotPasswordFailure());
                }
            } catch (err) {
                /**Catch any errors that occur during API call and dispatch failure action  */
                dispatch(getForgotPasswordFailure());
            } finally {
                /**Dispatch loading action to indicate end of API call  */
                dispatch(loading(false));
            }
        };
        
/**
*send Sign Up Data
* @param {*} objBody
* @method SignUpDataAPI
* @url users/
* @returns API will  return send Email otp
*/



export const SendOtpToEmailAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            /** Dispatch loading action to indicate start of API call */
            dispatch(loading(true));
            try {
                /**Make API call to fetch Captcha data  */
                const response: any = await post(SEND_OTP_TO_EMAIL_FOR_FORGOT_PASSWORD_API, objBody);
                /**Check if response doesn't contain error  */
                if (!response.data.error) {
                    /**Dispatch success action with fetched data  */
                    return dispatch(sendOtpToMailSuccess(response.data.data));
                } else {
                    /**  Dispatch failure action if API returns error */
                    dispatch(sendOtpToMailFailure());
                }
            } catch (err) {
                /**Catch any errors that occur during API call and dispatch failure action  */
                dispatch(sendOtpToMailFailure());
            } finally {
                /**Dispatch loading action to indicate end of API call  */
                dispatch(loading(false));
            }
        };

                
/**
*send Sign Up Data
* @param {*} objBody
* @method SignUpDataAPI
* @url users/
* @returns API will  return send Email otp
*/



export const getVerifyOtpAPI =
(objBody: any = undefined) =>
    async (dispatch: AppDispatch) => {
        /** Dispatch loading action to indicate start of API call */
        dispatch(loading(true));
        try {
            /**Make API call to fetch Captcha data  */
            const response: any = await post(VERIFY_OTP_FOR_FORGOT_PASSWORD_API, objBody);
            /**Check if response doesn't contain error  */
            if (!response.data.error) {
                /**Dispatch success action with fetched data  */
                return dispatch(sendOtpToMailSuccess(response.data.data));
            } else {
                /**  Dispatch failure action if API returns error */
                dispatch(sendOtpToMailFailure());
            }
        } catch (err) {
            /**Catch any errors that occur during API call and dispatch failure action  */
            dispatch(sendOtpToMailFailure());
        } finally {
            /**Dispatch loading action to indicate end of API call  */
            dispatch(loading(false));
        }
    };
