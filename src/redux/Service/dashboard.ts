import { DASHBOARD } from "../../Utility/ApiList";
import { post, get } from "../../Utility/httpInterceptor";
import { loading } from "../Loader/loader.action";
import { dashboardFailure, dashboardSuccess } from "../Dashboard/dashboard.action";
import { AppDispatch } from "../store";



export const dashBoardAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            /** Dispatch loading action to indicate start of API call */
            dispatch(loading(true));
            try {
                /**Make API call to fetch  data  */
                const response: any = await get(DASHBOARD);
                /**Check if response doesn't contain error  */
                if (!response.data.error) {
                    /**Dispatch success action with fetched data  */
                    return dispatch(dashboardSuccess(response.data.data));
                } else {
                    /**  Dispatch failure action if API returns error */
                    dispatch(dashboardFailure());
                }
            } catch (err) {
                /**Catch any errors that occur during API call and dispatch failure action  */
                dispatch(dashboardFailure());
            } finally {
                /**Dispatch loading action to indicate end of API call  */
                dispatch(loading(false));
            }
        };