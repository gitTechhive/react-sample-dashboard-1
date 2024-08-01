import { RooteAction } from "../store";
import { GET_SIGN_UP_FAILURE, GET_SIGN_UP_SUCCESS, GET_SIGN_UP_WITH_GOOGLE_FAILURE, GET_SIGN_UP_WITH_GOOGLE_SUCCESS, SEND_OTP_FAILURE, SEND_OTP_SUCCESS } from "./signUp.type";

/**
 * Interface representing the initial state for sign up.
 */
export interface SignUpInitializeState {
    /** Indicates whether the sign up was successful */
    signUpSuccess: boolean;
    /** Contains sign up related data */
    signUpData: any;
    /** Contains Google sign up related data */
    signUpWithGoogleData: any;
   
    /** Indicates whether an asynchronous operation is in progress */
    loading: boolean;
}
/** Define the initial state */
const initialState: SignUpInitializeState = {
    signUpSuccess: false,
    signUpData: [],
    signUpWithGoogleData: [],
    loading: false,
};

/**
 * Reducer function responsible for managing sign up related state.
 * @param state Current state of the sign up module. Defaults to initial state if not provided.
 * @param action Action dispatched to update the state.
 * @returns Updated state based on the dispatched action.
 */
function SignUpReducer(
    state: SignUpInitializeState = initialState,
    action: RooteAction
): SignUpInitializeState {
    switch (action.type) {
        case GET_SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpSuccess: true,
                signUpData: action.payload,
                loading: false,
            };

        case GET_SIGN_UP_FAILURE:
            return {
                ...state,
                signUpSuccess: false,
                signUpData: null,
                loading: false,
            };
        case GET_SIGN_UP_WITH_GOOGLE_SUCCESS:
            return {
                ...state,
                signUpSuccess: true,
                signUpWithGoogleData: action.payload,
                loading: false,
            };

        case GET_SIGN_UP_WITH_GOOGLE_FAILURE:
            return {
                ...state,
                signUpSuccess: false,
                signUpWithGoogleData: null,
                loading: false,
            };

        default:
            return state;
    }
}
export default SignUpReducer;
