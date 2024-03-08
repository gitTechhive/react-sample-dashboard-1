import { RooteAction } from "../store";
import {
  GET_LOGIN_FAILURE,
  GET_LOGIN_SUCCESS,
  GET_LOGOUT_FAILURE,
  GET_LOGOUT_SUCCESS,
  RESET_STATE,
} from "./login.type";

export interface LoginInitializeState {
  loginSuccess: boolean;
  loginData: any;
  logoutSuccess: boolean;
  userData: any;
  loading: boolean;
}

const initialState: LoginInitializeState = {
  loginSuccess: false,
  loginData: [],
  logoutSuccess: false,
  userData: [],
  loading: false,
};

function LoginReducer(
  state: LoginInitializeState = initialState,
  action: RooteAction
): LoginInitializeState {
  switch (action.type) {
    case GET_LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true,
        loginData: action.payload,
        loading: false,
      };

    case GET_LOGIN_FAILURE:
      return {
        ...state,
        loginSuccess: false,
        loginData: null,
        loading: false,
      };

    case GET_LOGOUT_SUCCESS:
      return {
        ...state,
        logoutSuccess: true,
        loading: false,
      };

    case GET_LOGOUT_FAILURE:
      return {
        ...state,
        logoutSuccess: false,
        loading: false,
      };

    case RESET_STATE: {
      return {
        ...state,
        loginSuccess: false,
        loginData: [],
        logoutSuccess: false,
        userData: [],
        loading: false,
      };
    }

    default:
      return state;
  }
}
export default LoginReducer;
