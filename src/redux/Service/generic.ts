
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
            dispatch(loading(true));
            try {
                const response: any = await get(GET_COUNTRY_DATA_API);

                if (!response.data.error) {
                    return dispatch(getCountrySuccess(response.data.data));
                } else {
                    dispatch(getCountryFailure());
                }
            } catch (err) {
                dispatch(getCountryFailure());
            } finally {
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
            dispatch(loading(true));
            try {

                const response: any = await post(GET_STATE_DATA_API, objBody);

                if (!response.data.error) {
                    return dispatch(getStatesSuccess(response.data.data));
                } else {
                    dispatch(getStatesFailure());
                }
            } catch (err) {
                dispatch(getStatesFailure());
            } finally {
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
            dispatch(loading(true));
            try {
                const response: any = await post(GET_CITY_DATA_API, objBody);

                if (!response.data.error) {
                    return dispatch(getCitySuccess(response.data.data));
                } else {
                    dispatch(getCityFailure());
                }
            } catch (err) {
                dispatch(getCityFailure());
            } finally {
                dispatch(loading(false));
            }
        };

