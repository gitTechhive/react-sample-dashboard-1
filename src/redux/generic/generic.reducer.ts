import { RooteAction } from "../store";
import { GET_STATES_SUCCESS, GET_STATES_FAILURE, GET_COUNTRY_SUCCESS, GET_COUNTRY_FAILURE, DEFAULT_REDUX_SUCCESS, DEFAULT_REDUX_FAILURE, GET_COUNTRY_PREFIX_FAILURE, GET_COUNTRY_PREFIX_SUCCESS, GET_GENERATE_CAPTCHA_FAILURE, GET_GENERATE_CAPTCHA_SUCCESS, GET_REGENERATE_CAPTCHA_SUCCESS, GET_REGENERATE_CAPTCHA_FAILURE, GET_VERIFY_CAPTCHA_FAILURE, GET_VERIFY_CAPTCHA_SUCCESS } from './generic.type';
import {
  GET_DATA_FOR_DROPDOWN_SUCCESS,
  GET_DATA_FOR_DROPDOWN_FAILURE,
  RESET_GENERIC_DATA,
  GET_ALL_NOTIFICATION_SUCCESS,
  GET_ALL_NOTIFICATION_FAILURE,
  GET_WEBSOCKET_CONNECTION_SUCCESS,
  GET_WEBSOCKET_CONNECTION_FAILURE,

  GET_CITY_SUCCESS,
  GET_CITY_FAILURE,
} from "./generic.type";
/**
 * Represents the initial state of the Generic reducer.
 */
export interface GenericInitialState {
  /** Data for dropdowns. */
  dropDownData: any;
  /** Data for notifications. */
  notificationData: any;
  /** Data for states. */
  stateData: any;
  /** Data for cities. */
  cityData: any;
  /** Data for countries . */
  countryData: any;
  /** Data for countries prefix. */
  countryPrefixData: any;
  /** Data for generate captcha Data . */
  generateCaptchData: any;
  /** Data for regenerate captcha Data . */
  regenerateCaptchData: any;
  /** Data for verify captcha Data . */
  verifyCaptchData: any;
  /** Flag indicating websocket connection status. */
  webSocketFlag: boolean;
  /** Flag indicating default Redux action status. */
  defaultRedux: boolean;
  /** Flag indicating loading status. */
  loading: boolean;
}

/** Initial state for the Generic reducer. */
const initialState: GenericInitialState = {
  dropDownData: null,
  notificationData: null,
  stateData: null,
  cityData: null,
  countryData: null,
  countryPrefixData: null,
  generateCaptchData: null,
  regenerateCaptchData: null,
  verifyCaptchData: null,
  webSocketFlag: false,
  defaultRedux: true,
  loading: false,
};

/**
 * Reducer function for the Generic state.
 * @param state Current state of the Generic reducer.
 * @param action Action dispatched to the reducer.
 * @returns New state after processing the action.
 */
const genericReducer = (
  state: GenericInitialState = initialState,
  action: RooteAction
): GenericInitialState => {
  switch (action.type) {
    case GET_DATA_FOR_DROPDOWN_SUCCESS:
      return {
        ...state,
        dropDownData: action.payload,
        loading: false,
      };
    case GET_DATA_FOR_DROPDOWN_FAILURE:
      return {
        ...state,
        dropDownData: null,
        loading: false,
      };
    case GET_ALL_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notificationData: action.payload,
        loading: false,
      };

    case GET_ALL_NOTIFICATION_FAILURE:
      return {
        ...state,
        notificationData: null,
        loading: false,
      };

    case GET_WEBSOCKET_CONNECTION_SUCCESS:
      return {
        ...state,
        webSocketFlag: true,
        loading: false,
      };

    case GET_WEBSOCKET_CONNECTION_FAILURE:
      return {
        ...state,
        webSocketFlag: false,
        loading: false,
      };


    case GET_GENERATE_CAPTCHA_SUCCESS:
      return {
        ...state,
        generateCaptchData: action.payload,
        loading: false,
      };

    case GET_GENERATE_CAPTCHA_FAILURE:
      return {
        ...state,
        generateCaptchData: null,
        loading: false,
      };
    case GET_REGENERATE_CAPTCHA_SUCCESS:
      return {
        ...state,
        regenerateCaptchData: action.payload,
        loading: false,
      };

    case GET_REGENERATE_CAPTCHA_FAILURE:
      return {
        ...state,
        regenerateCaptchData: null,
        loading: false,
      };
    case GET_VERIFY_CAPTCHA_SUCCESS:
      return {
        ...state,
        verifyCaptchData: action.payload,
        loading: false,
      };
    case GET_VERIFY_CAPTCHA_FAILURE:
      return {
        ...state,
        verifyCaptchData: null,
        loading: false,
      };
    case GET_COUNTRY_PREFIX_SUCCESS:
      return {
        ...state,
        countryPrefixData: action.payload,
        loading: false,
      };

    case GET_COUNTRY_PREFIX_FAILURE:
      return {
        ...state,
        countryPrefixData: null,
        loading: false,
      };

    case GET_COUNTRY_SUCCESS:
      return {
        ...state,
        countryData: action.payload,
        loading: false,
      };

    case GET_COUNTRY_FAILURE:
      return {
        ...state,
        countryData: null,
        loading: false,
      };
    case GET_STATES_SUCCESS:
      return {
        ...state,
        stateData: action.payload,
        loading: false,
      };

    case GET_STATES_FAILURE:
      return {
        ...state,
        stateData: null,
        loading: false,
      };
    case GET_CITY_SUCCESS:
      return {
        ...state,
        cityData: action.payload,
        loading: false,
      };

    case GET_CITY_FAILURE:
      return {
        ...state,
        cityData: null,
        loading: false,
      };

    case RESET_GENERIC_DATA:
      return {
        ...state,
        dropDownData: null,
        stateData: null,
        cityData: null,
        loading: false,
      };

    case DEFAULT_REDUX_SUCCESS:
      return {
        ...state,
        defaultRedux: true,
        loading: false,
      };

    case DEFAULT_REDUX_FAILURE:
      return {
        ...state,
        defaultRedux: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default genericReducer;
