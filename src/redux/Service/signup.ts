


import { SEND_OTP_DATA_API, SIGN_UP_DATA_API } from "../../Utility/ApiList";
import { post } from "../../Utility/httpInterceptor";
import { loading } from "../Loader/loader.action";
import { SendOtpFailure, SendOtpSuccess, getSignUpFailure, getSignUpSuccess } from "../SignUp/signUp.action";
import { AppDispatch } from "../store";

/**
*send Email Otp Data
* @param {*} objBody
* @method SendOtpDataAPI
* @url /users/sendOtp
* @returns API will  return send Email otp
*/


export const SendOtpDataAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            /** Dispatch loading action to indicate start of API call */
            dispatch(loading(true));
            try {
                /**Make API call to fetch Captcha data  */
                const response: any = await post(SEND_OTP_DATA_API, objBody);
                /**Check if response doesn't contain error  */
                if (!response.data.error) {
                    /**Dispatch success action with fetched data  */
                    return dispatch(SendOtpSuccess(response.data.data));
                } else {
                    /**  Dispatch failure action if API returns error */
                    dispatch(SendOtpFailure());
                }
            } catch (err) {
                /**Catch any errors that occur during API call and dispatch failure action  */
                dispatch(SendOtpFailure());
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


export const SignUpDataAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            /** Dispatch loading action to indicate start of API call */
            dispatch(loading(true));
            try {
                /**Make API call to fetch Captcha data  */
                const response: any = await post(SIGN_UP_DATA_API, objBody);
                /**Check if response doesn't contain error  */
                if (!response.data.error) {
                    /**Dispatch success action with fetched data  */
                    return dispatch(getSignUpSuccess(response.data.data));
                } else {
                    /**  Dispatch failure action if API returns error */
                    dispatch(getSignUpFailure());
                }
            } catch (err) {
                /**Catch any errors that occur during API call and dispatch failure action  */
                dispatch(getSignUpFailure());
            } finally {
                /**Dispatch loading action to indicate end of API call  */
                dispatch(loading(false));
            }
        };
