


import {  SIGN_UP_DATA_API, SIGN_UP_WITH_GOOGLE_DATA_API } from "../../Utility/ApiList";
import { post } from "../../Utility/httpInterceptor";
import { loading } from "../Loader/loader.action";
import { SendOtpFailure, SendOtpSuccess, getSignUpFailure, getSignUpSuccess, getSignUpWithGoogleFailure, getSignUpWithGoogleSuccess } from "../SignUp/signUp.action";
import { AppDispatch } from "../store";





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



/**
*send Sign Up Data
* @param {*} objBody
* @method SignUpWithGoogleDataAPI
* @url users/singUpGoogle
* @returns API will  return access Token
*/


export const SignUpWithGoogleDataAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            /** Dispatch loading action to indicate start of API call */
            dispatch(loading(true));
            try {
                /**Make API call to fetch Captcha data  */
                const response: any = await post(SIGN_UP_WITH_GOOGLE_DATA_API, objBody);
                /**Check if response doesn't contain error  */
                if (!response.data.error) {
                    /**Dispatch success action with fetched data  */
                    return dispatch(getSignUpWithGoogleSuccess(response.data.data));
                } else {
                    /**  Dispatch failure action if API returns error */
                    dispatch(getSignUpWithGoogleFailure());
                }
            } catch (err) {
                /**Catch any errors that occur during API call and dispatch failure action  */
                dispatch(getSignUpWithGoogleFailure());
            } finally {
                /**Dispatch loading action to indicate end of API call  */
                dispatch(loading(false));
            }
        };


// {
//     "web": {
//       "client_id": "761275914869-9di23dhnobemane7a9gse8upsnmi6ngq.apps.googleusercontent.com",
//       "project_id": "react-login-417605",
//       "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//       "token_uri": "https://oauth2.googleapis.com/token",
//       "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//       "client_secret": "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",
//       "redirect_uris": [
//         "http://localhost:5200"
//       ],
//       "javascript_origins": [
//         "http://localhost:5200"
//       ]
//     }
//   }
