import { RooteAction } from "../store";
import { GET_FORGOT_PASSWORD_FAILURE, GET_FORGOT_PASSWORD_SUCCESS, GET_VERIFY_OTP_FAILURE, GET_VERIFY_OTP_SUCCESS, SEND_OTP_TO_MAIL_FAILURE, SEND_OTP_TO_MAIL_SUCCESS } from "./forgotPassword.type";

/**
 * Represents the initial state for the forgot password feature.
 */
export interface ForgotPasswordInitializeState {
     /** Indicates whether the forgot password request was successful */
    forgotPasswordSuccess: boolean;
   /** Contains data related to the forgot password process */
    forgotPasswordData: any;
     /** Contains data related to sending OTP to email */
    sendOtpToEmailData: any;


  /** Contains data related to OTP verification */
    verifyOtpData: any;
    /** Indicates whether an asynchronous operation is in progress */
    loading: boolean;
  }
  /** Define the initial state */
  const initialState: ForgotPasswordInitializeState = {
    forgotPasswordSuccess: false,
    forgotPasswordData: [],
    sendOtpToEmailData: [],
    verifyOtpData: [],
    loading: false,
  };
  
 /**
 * Reducer function responsible for managing state related to the forgot password feature.
 * @param state Current state of the forgot password module. Defaults to initial state if not provided.
 * @param action Action dispatched to update the state.
 * @returns Updated state based on the dispatched action.
 */
  function ForgotPasswordReducer(
    state: ForgotPasswordInitializeState = initialState,
    action: RooteAction
  ): ForgotPasswordInitializeState {
    switch (action.type) {
      case GET_FORGOT_PASSWORD_SUCCESS:
        return {
          ...state,
          forgotPasswordSuccess: true,
          forgotPasswordData: action.payload,
          loading: false,
        };
  
      case GET_FORGOT_PASSWORD_FAILURE:
        return {
          ...state,
          forgotPasswordSuccess: false,
          forgotPasswordData: null,
          loading: false,
        };
      case SEND_OTP_TO_MAIL_SUCCESS:
        return {
          ...state,
          forgotPasswordSuccess: true,
          sendOtpToEmailData: action.payload,
          loading: false,
        };
  
      case SEND_OTP_TO_MAIL_FAILURE:
        return {
          ...state,
          forgotPasswordSuccess: false,
          sendOtpToEmailData: null,
          loading: false,
        };
    
      case GET_VERIFY_OTP_SUCCESS:
        return {
          ...state,
          forgotPasswordSuccess: true,
          verifyOtpData: action.payload,
          loading: false,
        };
  
      case GET_VERIFY_OTP_FAILURE:
        return {
          ...state,
          forgotPasswordSuccess: false,
          verifyOtpData: null,
          loading: false,
        };
    
  
  
      default:
        return state;
    }
  }
  export default ForgotPasswordReducer;