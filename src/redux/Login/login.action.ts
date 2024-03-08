import { RooteAction } from "../store";
import {
  GET_LOGIN_FAILURE,
  GET_LOGIN_SUCCESS,
  GET_LOGOUT_FAILURE,
  GET_LOGOUT_SUCCESS,
  RESET_STATE,
} from "./login.type";

export const getLoginSuccess = (obj): RooteAction => {
  return { type: GET_LOGIN_SUCCESS, payload: obj };
};

export const getLoginFailure = (): RooteAction => {
  return { type: GET_LOGIN_FAILURE, payload: {} };
};

export const getLogoutSuccess = (obj): RooteAction => {
  return { type: GET_LOGOUT_SUCCESS, payload: obj };
};

export const getLogoutFailure = (): RooteAction => {
  return { type: GET_LOGOUT_FAILURE, payload: {} };
};

export const resetState = (): RooteAction => {
  return { type: RESET_STATE, payload: {} };
};
