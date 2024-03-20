



import { FORGOT_PASSWORD_DATA_API, SEND_OTP_TO_EMAIL_FOR_FORGOT_PASSWORD_API, VERIFY_OTP_FOR_FORGOT_PASSWORD_API } from "../../Utility/ApiList";
import { post } from "../../Utility/httpInterceptor";
import { loading } from "../Loader/loader.action";
import { getForgotPasswordFailure, getForgotPasswordSuccess, sendOtpToMailFailure, sendOtpToMailSuccess } from "../forgotPassword/forgotPassword.action";
import { AppDispatch } from "../store";

/**
 * Sends forgot password data to the server.
 * @param objBody The data to be sent in the request body.
 * @method ForgotPasswordDataAPI
 * @url forgotPwd
 * @returns API will return Success.
 */
export const ForgotPasswordDataAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            /** Dispatch loading action to indicate start of API call */
            dispatch(loading(true));
            try {
                /**Make API call to fetch  data  */
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
 * Sends OTP to email for forgot password.
 * @param objBody The data to be sent in the request body.
 * @method SendOtpToEmailAPI
 * @url forgotPassOtpGeneratorAdmin
 * @returns API will return send Email OTP.
 */
export const SendOtpToEmailAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            /** Dispatch loading action to indicate start of API call */
            dispatch(loading(true));
            try {
                /**Make API call to fetch  data  */
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
 * Sends verification OTP for forgot password.
 * @param objBody The data to be sent in the request body.
 * @method getVerifyOtpAPI
 * @url forgotPassOtpVerificationAdmin
 * @returns API will return Verify Otp.
 */

export const getVerifyOtpAPI =
(objBody: any = undefined) =>
    async (dispatch: AppDispatch) => {
        /** Dispatch loading action to indicate start of API call */
        dispatch(loading(true));
        try {
            /**Make API call to fetch  data  */
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
