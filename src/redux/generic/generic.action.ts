import {
  GET_DATA_FOR_DROPDOWN_SUCCESS,
  GET_DATA_FOR_DROPDOWN_FAILURE,
  RESET_GENERIC_DATA,

  GET_ALL_NOTIFICATION_SUCCESS,
  GET_ALL_NOTIFICATION_FAILURE,
  GET_WEBSOCKET_CONNECTION_SUCCESS,
  GET_WEBSOCKET_CONNECTION_FAILURE,
 
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE,

  DEFAULT_REDUX_SUCCESS,
  DEFAULT_REDUX_FAILURE,

} from "./generic.type";
import { RooteAction } from "../store";
import {
  GET_STATES_SUCCESS,
  GET_STATES_FAILURE,
  GET_CITY_SUCCESS,
  GET_CITY_FAILURE,
} from "./generic.type";




export const getDataForDropdownSuccess = (obj): RooteAction => {
  return { type: GET_DATA_FOR_DROPDOWN_SUCCESS, payload: obj };
};

export const getDataForDropdownFailure = (): RooteAction => {
  return { type: GET_DATA_FOR_DROPDOWN_FAILURE, payload: {} };
};


export const getAllNotificationSuccess = (obj: any): RooteAction => {
  return { type: GET_ALL_NOTIFICATION_SUCCESS, payload: obj };
};

export const getAllNotificationFailure = (): RooteAction => {
  return { type: GET_ALL_NOTIFICATION_FAILURE, payload: {} };
};

export const getWebSocketSuccess = (obj): RooteAction => {
  return { type: GET_WEBSOCKET_CONNECTION_SUCCESS, payload: true };
};

export const getWebSocketFailure = (obj): RooteAction => {
  return { type: GET_WEBSOCKET_CONNECTION_FAILURE, payload: false };
};
export const getStatesSuccess = (obj: any): RooteAction => {
  return { type: GET_STATES_SUCCESS, payload: obj };
};

export const getStatesFailure = (): RooteAction => {
  return { type: GET_STATES_FAILURE, payload: {} };
};
export const getCitySuccess = (obj: any): RooteAction => {
  return { type: GET_CITY_SUCCESS, payload: obj };
};

export const getCityFailure = (): RooteAction => {
  return { type: GET_CITY_FAILURE, payload: {} };
};


export const getCountrySuccess = (obj: any): RooteAction => {
  return { type: GET_COUNTRY_SUCCESS, payload: obj };
};

export const getCountryFailure = (): RooteAction => {
  return { type: GET_COUNTRY_FAILURE, payload: {} };
};



export const resetGenericData = (): RooteAction => {
  return { type: RESET_GENERIC_DATA, payload: {} };
};



export const defaultReduxSuccess = (obj): RooteAction => {
  return { type: DEFAULT_REDUX_SUCCESS, payload: obj };
};

export const defaultReduxFailure = (): RooteAction => {
  return { type: DEFAULT_REDUX_FAILURE, payload: {} };
};