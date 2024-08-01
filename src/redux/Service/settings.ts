import { CHANGE_PASSWORD, DASHBOARD, GET_PROFILE, UPDATE_PROFILE } from "../../Utility/ApiList";
import { post, get } from "../../Utility/httpInterceptor";
import { ts } from "../../Utility/Toaster";
import { loading } from "../Loader/loader.action";
import { changePasswordFailure, changePasswordSuccess, editProfileFailure, editProfileSuccess, getDataFailure, getDataSuccess } from "../Settings/settings.action";
import { AppDispatch } from "../store";



export const getDataAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            /** Dispatch loading action to indicate start of API call */
            dispatch(loading(true));
            try {
                /**Make API call to fetch  data  */
                const response: any = await get(GET_PROFILE);
                /**Check if response doesn't contain error  */
                if (!response.data.error) {
                    /**Dispatch success action with fetched data  */
                    return dispatch(getDataSuccess(response.data.data));
                } else {
                    /**  Dispatch failure action if API returns error */
                    dispatch(getDataFailure());
                }
            } catch (err) {
                /**Catch any errors that occur during API call and dispatch failure action  */
                dispatch(getDataFailure());
            } finally {
                /**Dispatch loading action to indicate end of API call  */
                dispatch(loading(false));
            }
        };

export const upDateDataAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            /** Dispatch loading action to indicate start of API call */
            dispatch(loading(true));
            try {
                /**Make API call to fetch  data  */
                const response: any = await post(UPDATE_PROFILE, objBody);
                /**Check if response doesn't contain error  */
                if (!response.data.error) {
                    /**Dispatch success action with fetched data  */
                    ts(response.data.message)
                    return dispatch(editProfileSuccess(response.data.data));
                } else {
                    /**  Dispatch failure action if API returns error */
                    dispatch(editProfileFailure());
                }
            } catch (err) {
                /**Catch any errors that occur during API call and dispatch failure action  */
                dispatch(editProfileFailure());
            } finally {
                /**Dispatch loading action to indicate end of API call  */
                dispatch(loading(false));
            }
        };

export const changePasswordAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            /** Dispatch loading action to indicate start of API call */
            dispatch(loading(true));
            try {
                /**Make API call to fetch  data  */
                const response: any = await post(CHANGE_PASSWORD, objBody);
                /**Check if response doesn't contain error  */
                if (!response.data.error) {
                    /**Dispatch success action with fetched data  */
                    ts(response.data.message)
                    return dispatch(changePasswordSuccess(response.data.data));
                } else {
                    /**  Dispatch failure action if API returns error */
                    dispatch(changePasswordFailure());
                }
            } catch (err) {
                /**Catch any errors that occur during API call and dispatch failure action  */
                dispatch(changePasswordFailure());
            } finally {
                /**Dispatch loading action to indicate end of API call  */
                dispatch(loading(false));
            }
        };