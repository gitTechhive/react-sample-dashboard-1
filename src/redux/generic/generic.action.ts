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
  GET_GENERATE_CAPTCHA_SUCCESS,
  GET_GENERATE_CAPTCHA_FAILURE,
  GET_REGENERATE_CAPTCHA_FAILURE,
  GET_REGENERATE_CAPTCHA_SUCCESS,
  GET_VERIFY_CAPTCHA_SUCCESS,
  GET_VERIFY_CAPTCHA_FAILURE,
  GET_COUNTRY_PREFIX_FAILURE,
  GET_COUNTRY_PREFIX_SUCCESS,

} from "./generic.type";
import { RooteAction } from "../store";
import {
  GET_STATES_SUCCESS,
  GET_STATES_FAILURE,
  GET_CITY_SUCCESS,
  GET_CITY_FAILURE,
} from "./generic.type";



/**
 * Action creator for successful retrieval of data for dropdowns.
 * @param obj Data for dropdowns.
 * @returns Action object.
 */
export const getDataForDropdownSuccess = (obj: any): RooteAction => {
  return { type: GET_DATA_FOR_DROPDOWN_SUCCESS, payload: obj };
};

/**
 * Action creator for failed retrieval of data for dropdowns.
 * @returns Action object.
 */
export const getDataForDropdownFailure = (): RooteAction => {
  return { type: GET_DATA_FOR_DROPDOWN_FAILURE, payload: {} };
};

/**
 * Action creator for successful retrieval of all notifications.
 * @param obj Notification data.
 * @returns Action object.
 */
export const getAllNotificationSuccess = (obj: any): RooteAction => {
  return { type: GET_ALL_NOTIFICATION_SUCCESS, payload: obj };
};

/**
 * Action creator for failed retrieval of all notifications.
 * @returns Action object.
 */
export const getAllNotificationFailure = (): RooteAction => {
  return { type: GET_ALL_NOTIFICATION_FAILURE, payload: {} };
};

/**
 * Action creator for successful WebSocket connection.
 * @param obj WebSocket connection data.
 * @returns Action object.
 */
export const getWebSocketSuccess = (obj: any): RooteAction => {
  return { type: GET_WEBSOCKET_CONNECTION_SUCCESS, payload: true };
};

/**
 * Action creator for failed WebSocket connection.
 * @param obj WebSocket connection data.
 * @returns Action object.
 */
export const getWebSocketFailure = (obj: any): RooteAction => {
  return { type: GET_WEBSOCKET_CONNECTION_FAILURE, payload: false };
};

/**
 * Action creator for successful retrieval of states.
 * @param obj State data.
 * @returns Action object.
 */
export const getStatesSuccess = (obj: any): RooteAction => {
  return { type: GET_STATES_SUCCESS, payload: obj };
};

/**
 * Action creator for failed retrieval of states.
 * @returns Action object.
 */
export const getStatesFailure = (): RooteAction => {
  return { type: GET_STATES_FAILURE, payload: {} };
};

/**
 * Action creator for successful retrieval of cities.
 * @param obj City data.
 * @returns Action object.
 */
export const getCitySuccess = (obj: any): RooteAction => {
  return { type: GET_CITY_SUCCESS, payload: obj };
};

/**
 * Action creator for failed retrieval of cities.
 * @returns Action object.
 */
export const getCityFailure = (): RooteAction => {
  return { type: GET_CITY_FAILURE, payload: {} };
};

/**
 * Action creator for successful retrieval of countries.
 * @param obj Country data.
 * @returns Action object.
 */
export const getCountrySuccess = (obj: any): RooteAction => {
  return { type: GET_COUNTRY_SUCCESS, payload: obj };
};

/**
 * Action creator for failed retrieval of countries.
 * @returns Action object.
 */
export const getCountryFailure = (): RooteAction => {
  return { type: GET_COUNTRY_FAILURE, payload: {} };
};
/**
 * Action creator for successful retrieval of countries Prefix.
 * @param obj Country Prefix data.
 * @returns Action object.
 */
export const getCountryPrefixSuccess = (obj: any): RooteAction => {
  return { type: GET_COUNTRY_PREFIX_SUCCESS, payload: obj };
};

/**
 * Action creator for failed retrieval of countries Prefix.
 * @returns Action object.
 */
export const getCountryPrefixFailure = (): RooteAction => {
  return { type: GET_COUNTRY_PREFIX_FAILURE, payload: {} };
};


/**
 * Action creator for successful retrieval of captcha.
 * @param obj Captcha data.
 * @returns Action object with type GET_GENERATE_CAPTCHA_SUCCESS and payload obj.
 */
export const getGenerateCaptchaSuccess = (obj: any): RooteAction => {
  return { type: GET_GENERATE_CAPTCHA_SUCCESS, payload: obj };
};

/**
 * Action creator for failed retrieval of captcha.
 * @returns Action object with type GET_GENERATE_CAPTCHA_FAILURE and empty payload.
 */
export const getGenerateCaptchaFailure = (): RooteAction => {
  return { type: GET_GENERATE_CAPTCHA_FAILURE, payload: {} };
};
/**
 * Action creator function for dispatching action indicating
 * success in regenerating captcha.
 * @param obj Object containing regenerated captcha data.
 * @returns Action object with type GET_REGENERATE_CAPTCHA_SUCCESS and payload obj.
 */
export const getRegenerateCaptchaSuccess = (obj: any): RooteAction => {
  return { type: GET_REGENERATE_CAPTCHA_SUCCESS, payload: obj };
};

/**
 * Action creator function for dispatching action indicating
 * failure in regenerating captcha.
 * @returns Action object with type GET_REGENERATE_CAPTCHA_FAILURE and empty payload.
 */
export const getRegenerateCaptchaFailure = (): RooteAction => {
  return { type: GET_REGENERATE_CAPTCHA_FAILURE, payload: {} };
};
/**
 * Action creator for successful retrieval of captcha verification.
 * @param obj Captcha data.
 * @returns Action object with type GET_VERIFY_CAPTCHA_SUCCESS and payload obj.
 */
export const getVerifyCaptchaSuccess = (obj: any): RooteAction => {
  return { type: GET_VERIFY_CAPTCHA_SUCCESS, payload: obj };
};

/**
 * Action creator for failed retrieval of captcha verification.
 * @returns Action object with type GET_VERIFY_CAPTCHA_FAILURE and empty payload.
 */
export const getVerifyCaptchaFailure = (): RooteAction => {
  return { type: GET_VERIFY_CAPTCHA_FAILURE, payload: {} };
};
/**
 * Action creator for resetting generic data.
 * @returns Action object.
 */
export const resetGenericData = (): RooteAction => {
  return { type: RESET_GENERIC_DATA, payload: {} };
};

/**
 * Action creator for successful default Redux operation.
 * @param obj Data for default Redux operation.
 * @returns Action object.
 */
export const defaultReduxSuccess = (obj: any): RooteAction => {
  return { type: DEFAULT_REDUX_SUCCESS, payload: obj };
};

/**
 * Action creator for failed default Redux operation.
 * @returns Action object.
 */
export const defaultReduxFailure = (): RooteAction => {
  return { type: DEFAULT_REDUX_FAILURE, payload: {} };
};
