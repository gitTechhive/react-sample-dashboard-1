
import { AppDispatch } from '../store';
import { loading } from '../Loader/loader.action';
import { get, post } from '../../Utility/httpInterceptor';

import { te, ts } from '../../Utility/Toaster';
import { GET_CITY_DATA_API, GET_COUNTRY_DATA_API, GET_STATE_DATA_API } from '../../Utility/ApiList';
import { getCityFailure, getCitySuccess, getCountryFailure, getCountrySuccess, getStatesFailure, getStatesSuccess } from './../generic/generic.action';


/**
* Get Country Data
* @param {*} objBody
* @method getCountryApi
* @url getCountry
* @returns API will return value and name of the country
*/

export const getCountryAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            /** Dispatch loading action to indicate start of API call */
            dispatch(loading(true));
            try {
                /**Make API call to fetch country data  */
                const response: any = await get(GET_COUNTRY_DATA_API);
                /**Check if response doesn't contain error  */
                if (!response.data.error) {
                    /**Dispatch success action with fetched data  */
                    return dispatch(getCountrySuccess(response.data.data));
                } else {
                    /**  Dispatch failure action if API returns error */
                    dispatch(getCountryFailure());
                }
            } catch (err) {
                /**Catch any errors that occur during API call and dispatch failure action  */
                dispatch(getCountryFailure());
            } finally {
                /**Dispatch loading action to indicate end of API call  */
                dispatch(loading(false));
            }
        };

/**
* Get state data for dropdownn in Add Property form 
* @param {*} objBody
* @method getStateAPI
* @url getStateByCountryId
* @returns API will return value and name of the state
*/

export const getStateAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            /** Dispatch loading action to indicate start of API call */
            dispatch(loading(true));
            try {
                /**Make API call to fetch State data  */
                const response: any = await post(GET_STATE_DATA_API, objBody);
                /**Check if response doesn't contain error  */

                if (!response.data.error) {
                    /**Dispatch success action with fetched data  */
                    return dispatch(getStatesSuccess(response.data.data));
                } else {
                    /**  Dispatch failure action if API returns error */
                    dispatch(getStatesFailure());
                }
            } catch (err) {
                /**Catch any errors that occur during API call and dispatch failure action  */
                dispatch(getStatesFailure());
            } finally {
                /**Dispatch loading action to indicate end of API call  */
                dispatch(loading(false));
            }
        };



/**
* Get City data 
* @param {*} objBody
* @method getCityAPI
* @url getCityByStateId
* @returns API will return value and name of the city based on stateid
*/

export const getCityAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            /** Dispatch loading action to indicate start of API call */
            dispatch(loading(true));
            try {
                /**Make API call to fetch City data  */
                const response: any = await post(GET_CITY_DATA_API, objBody);
                /**Check if response doesn't contain error  */
                if (!response.data.error) {
                      /**Dispatch success action with fetched data  */
                    return dispatch(getCitySuccess(response.data.data));
                } else {
                      /**  Dispatch failure action if API returns error */
                    dispatch(getCityFailure());
                }
            } catch (err) {
                 /**Catch any errors that occur during API call and dispatch failure action  */
                dispatch(getCityFailure());
            } finally {
                 /**Dispatch loading action to indicate end of API call  */
                dispatch(loading(false));
            }
        };

