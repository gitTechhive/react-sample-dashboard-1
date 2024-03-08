import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_URL, BASE_URL } from "./Config";
import {
    getServerValidation,
    getToken,
    excludeTokenAPIList,
    getRefreshToken,
    // getClientId,
} from "./Helper";
import { te, ts } from "./Toaster";
import { ResponseWrapperDTO } from "../interfaces/interface";
import { GET_LOGIN_DATA_API } from "./ApiList";
// import { GET_LOGIN_DATA_API } from './ApiList';


export type responseType = ReturnType<typeof handleResponse>;
export type errorType = ReturnType<typeof handleError>;


const axiosInstance = axios.create({
    // base URL
    baseURL: API_URL,
    // other axios configurations
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
    //    console.log(originalRequest);
    //    console.log( window.__INITIAL_HEADERS__);
  
      // If the response is unauthorized and it's the first attempt to refresh the token

      if(!error.config.url.includes("refreshToken")){

    
      if (error.response.status === 401 ) {
        // originalRequest._retry = true; // Prevent infinite retry loop
  
        try {
          // Refresh the token
          const refreshToken = getRefreshToken(); // Retrieve the refresh token from wherever it is stored
          const response = await axiosInstance.post(`${API_URL}refreshToken`, { refreshToken });
        //   console.log(response);
          const newAccessToken = response.data.data.token;
          localStorage.setItem("token",response.data.data.token);
          localStorage.setItem("refreshToken",response.data.data.refreshToken);
          // Update the token in your application's state or wherever it is stored
        //   saveToken(newAccessToken); // Update the access token in your storage
  
          // Retry the original request with the new access token
          originalRequest.headers['Authorization'] = newAccessToken ? `Bearer ${newAccessToken}` : '';
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Handle token refresh error (e.g., refresh token expired)
          console.error(refreshError);
          return logoutFromSystem();
          // Redirect to login or perform other error handling

        }
      }
  
      // For all other error cases, pass the error along
      return Promise.reject(error);
    }

}
  );

let count: any = 1;
export const get = (
    url: string,
    // headers: any,
    // isPrivate = true,
    // responseType = undefined,
    // customUrl = false
): Promise<AxiosResponse> => {
    let apiUrl = API_URL + url;
    // if (customUrl) {
    //     apiUrl = url;
    // }
    // if (isPrivate && getToken()) {
    //     const isParam = apiUrl.includes("?");
    //     if (isParam) apiUrl = `${apiUrl}&&api_token=${getToken()}`;
    //     else apiUrl = `${apiUrl}?api_token=${getToken()}`;
    // }
    const axiosObj: AxiosRequestConfig = {
        method: "get",
        url: apiUrl,
        
    };
    if (excludeTokenAPIList.indexOf(url) < 0) {
        axiosObj.headers = {
            Authorization: getToken() ?  `${"Bearer " + getToken()}`: "",
            // "Access-Control-Allow-Origin": "*",
        };
    }
    // if (responseType) axiosObj.responseType = responseType;
    return axiosInstance(axiosObj)
        .then((response: any) => handleResponse(response))
        .catch((error: any) => {
            // console.log("return handleError(error)", error);
            return handleError(error);
        });
};
export const post = (
    url: string,
    bodyObj = {} as any,
    isPrivate = true,
    mediaFile = false,
    uat = false
): Promise<AxiosResponse> => {
    // console.log("bodyObj", bodyObj);
    const apiUrl = !uat ? API_URL + url : url;
    // if (mediaFile == true) {
    //     const formData = new FormData();
    //     console.log("bodyObj", bodyObj);
    //     Object.keys(bodyObj).map((key) => {
    //         formData.append(key, bodyObj[key]);
    //     });
    //     bodyObj = formData;
    // }
    let header: any = { "Content-Type": "application/json" };
    if (excludeTokenAPIList.indexOf(url) < 0) {
        header = {
            Authorization: getToken() ? `${"Bearer " + getToken()}` : "",
            "Access-Control-Allow-Origin": "*",
        };
    }
    // if (url === GET_LOGIN_DATA_API) {
    //     header = {
    //         'Content-Type': "application/json"
    //     };
    // }
    return axiosInstance
        .post(apiUrl, bodyObj, {
            headers: header,
        })
        .then((response: any) => handleResponse(response))
        .catch((error: any) => {
            // console.log("error interceptor", error);
            // te(error.message);
            return handleError(error);
        });
};
export const put = (
    url: string,
    bodyObj: any = {},
    isPrivate = true,
    mediaFile = false,
    uat = false
): Promise<AxiosResponse> => {
    const apiUrl = !uat ? API_URL + url : url;

    if (mediaFile === true) {
        const formData = new FormData();
        // console.log("bodyObj", bodyObj);
        Object.keys(bodyObj).map((key) => {
      formData.append(key, bodyObj[key]);
        });
        bodyObj = formData;
    }
    let header: any = {};
    if (excludeTokenAPIList.indexOf(url) < 0) {
        header = {
            Authorization: getToken() ? `${"Bearer " + getToken()}` : "",
            "Access-Control-Allow-Origin": "*",
        };
    }
    return axiosInstance
        .put(apiUrl, bodyObj, {
            headers: header,
        })
        .then((response: any) => handleResponse(response))
        .catch((error: any) => {
            // console.log("error interceptor", error);

            return handleError(error);
        });
};
const handleResponse = (response: any): AxiosResponse<ResponseWrapperDTO> => {
    return {
        ...response,
    };
};

const logoutFromSystem = (objBody = {}) => {
    te('Unauthorized user');

    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
};

const handleError = (error: any): any => {
    const { response } = error;
    // console.log(response);
    // console.log(response.status);

    const parsedError = response && JSON.parse(JSON.stringify(response.data));
    // console.log("handleError",
    //     parsedError,
    //     parsedError.statusCode,
    //     parsedError && parsedError.statusCode == 401
    // );

    let errorMsg: string | undefined =
        "Sorry, something went wrong. Please try again.";
    if (response && response !== undefined && response.status === 422) {
        // handle server validation
        if (response.data && response.data.errors)
            errorMsg = getServerValidation(response.data.errors) || errorMsg;
        else if (response.data.message) errorMsg = response.data.message;
    } else if (parsedError && parsedError.status === 503) {
        errorMsg = parsedError.error;
        te(errorMsg);
        return;
    } else if (
        response &&
        response !== undefined &&
        JSON.parse(JSON.stringify(response.data)).toString().includes("401")
    ) {
        syncLogout();
    }
    //  else if (response && response !== undefined && response.status === 401) {
    //     const obj = {
    //         clientId: localStorage.getItem("clientId"),
    //         username: localStorage.getItem("userId"),
    //     };
    //     if (count === 1) {
    //         localStorage.removeItem("token");
    //         logoutFromSystem(obj);
    //         count = 0;
    //     }
    // }
    else if ((response && response !== undefined && response.status === 400)) {

        te(response.data.message);
    }
    else if ((response && response !== undefined && response.status === 403)) {

        te(response.data.message);
    }
    else if ((response && response !== undefined && response.status === 405)) {
        // console.log(response.data.Message)
        te (response.data.message);
    }
    else if (response && response != undefined && response.status === 500) {
        te (response.data.message);
    //   const obj = {
    //     clientId: localStorage.getItem("clientId"),
    //     username: localStorage.getItem("userId"),
    //   };
    //   if (count === 1) {
    //     localStorage.removeItem("token");
    //     logoutFromSystem(obj);
    //     count = 0;
    //   }
    }
    else {
        te("Sorry, something went wrong. Please try again.");
    }
};

function syncLogout() {
    throw new Error("Logout");
}

export const downloadFileAPI = (url: string): Promise<any> => {
    const apiUrl = API_URL + url;
    let header = {};
    if (excludeTokenAPIList.indexOf(url) < 0) {
        header = {
            token: getToken() ? getToken() : "",
            Authorization: getToken() ?  `${"Bearer " + getToken()}`: "",
            "Access-Control-Allow-Origin": "*",
        };
    }
    // Fetch the dynamically generated excel document from the server.
    return axiosInstance
        .get(apiUrl, { responseType: "arraybuffer", headers: header })
        .then((response: any) => {
            // // Log somewhat to show that the browser actually exposes the custom HTTP header
            // console.log('2@ res', JSON.parse(new TextDecoder().decode(response.data)))
            // console.log("RESPONSE " + response);
            if (response.status === 200) {
                const fileNameHeader = 'content-disposition';
                console.log(response.headers[fileNameHeader],"response ");
                const suggestedFileName = response.headers[fileNameHeader].split('filename=')[1];

                const effectiveFileName =
                    suggestedFileName === undefined
                        ? "sampleFile.csv"
                        : suggestedFileName;
                // console.log(
                //     `Received header[${fileNameHeader}]: ${suggestedFileName}, effective fileName: ${effectiveFileName} `
                // );

                // Let the user save the file.
                // FileSaver.saveAs(response.data);

                // const outputFilename = effectiveFileName;

                // If you want to download file automatically using link attribute.
                const url = URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", effectiveFileName);
                document.body.appendChild(link);
                link.click();

                const customResponse: ResponseWrapperDTO = {
                    status: "200",
                    message: "File Downloaded Successfully.",
                    error: false,
                    data: {
                        data: { fileName: suggestedFileName },
                    },
                    path: url,
                };
                return handleResponse(customResponse);
            } else {
                // console.log(
                //     "2@ res",
                //     JSON.parse(new TextDecoder().decode(response.data))
                // );
                const obj = JSON.parse(new TextDecoder().decode(response.data));
                // console.log(obj);
                return handleResponse(obj);
            }
        })
        .catch((error: any) => {
            // console.log(error);

            const { response } = error;
            // console.log('2@ res', JSON.parse(new TextDecoder().decode(response.data)))
            const obj = JSON.parse(new TextDecoder().decode(response.data));
            // console.log(obj);

            return handleResponse(obj);
        });
};

export const downloadFilePostAPI = (url: string,bodyObj = {} as any,): Promise<any> => {
    const apiUrl = API_URL + url;
    let header = {};
    if (excludeTokenAPIList.indexOf(url) < 0) {
        header = {
            Authorization: getToken() ? `Bearer ${getToken()}` : "",
            "Access-Control-Allow-Origin": "*",
        };
    }
    // Fetch the dynamically generated excel document from the server.
    return axios
        .post(apiUrl, bodyObj, { responseType: "arraybuffer", headers: header })
        .then((response: any) => {
            // // Log somewhat to show that the browser actually exposes the custom HTTP header
            // console.log('2@ res', JSON.parse(new TextDecoder().decode(response.data)))
            //
            if (response.status === 200) {
                const fileNameHeader = "x-suggested-filename";
                const suggestedFileName = response.headers[fileNameHeader];
                const fileNameHeader1 = 'Content-Disposition:';
               
               
                // console.log(response.headers[fileNameHeader],"response ");
                // const suggestedFileName = response.headers[fileNameHeader].split('filename=')[1];
                const effectiveFileName =
                    suggestedFileName === undefined
                        ? "sampleFile.csv"
                        : suggestedFileName;
                console.log(
                    `Received header[${fileNameHeader}]: ${suggestedFileName}, effective fileName: ${effectiveFileName} `
                );

                // Let the user save the file.
                // FileSaver.saveAs(response.data);

                // const outputFilename = effectiveFileName;

                // If you want to download file automatically using link attribute.
                const url = URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", effectiveFileName);
                document.body.appendChild(link);
                link.click();

                const customResponse: ResponseWrapperDTO = {
                    status: "200",
                    message: "File Downloaded Successfully.",
                    error: false,
                    data: {
                        data: { fileName: suggestedFileName },
                    },
                    path: url,
                };
                return handleResponse(customResponse);
            } else {
                console.log(
                    "2@ res",
                    JSON.parse(new TextDecoder().decode(response.data))
                );
                const obj = JSON.parse(new TextDecoder().decode(response.data));
               
                return handleResponse(obj);
            }
        })
        .catch((error: any) => {
           

            const { response } = error;
            // console.log('2@ res', JSON.parse(new TextDecoder().decode(response.data)))
            const obj = JSON.parse(new TextDecoder().decode(response.data));
           

            return handleResponse(obj);
        });
};


export const deleteAPI = (
    url: string,
    bodyObj: any = {},
    isPrivate = true,
    mediaFile = false,
    uat = false
): Promise<AxiosResponse> => {
    const apiUrl = !uat ? API_URL + url : url;

    if (mediaFile === true) {
        const formData = new FormData();
        // console.log("bodyObj", bodyObj);
        Object.keys(bodyObj).map((key) => {
            formData.append(key, bodyObj[key]);
        });
        bodyObj = formData;
    }
    let header: any = {};
    if (excludeTokenAPIList.indexOf(url) < 0) {
        header = {
            Authorization: getToken() ? getToken() : "",
            "Access-Control-Allow-Origin": "*",
        };
    }
    return axiosInstance
        .delete(apiUrl, {
            headers: header,
        })
        .then((response: any) => handleResponse(response))
        .catch((error: any) => {
            // console.log("error interceptor", error);
            return handleError(error);
        });
};

export const getFilePath = (filePath: string) =>
    filePath && filePath.replace("/var/www/html", BASE_URL);

// export const downloadXLSFile = async (url) => {
//   const apiUrl = API_URL + url;
//   // Its important to set the 'Content-Type': 'blob' and responseType:'arraybuffer'.
//   const headers = {'Content-Type': 'blob'};
//   const config: AxiosRequestConfig = {method: 'GET', url: API_URL, responseType: 'arraybuffer', headers};

//   try {
//       const response = await axios(config);

//       const outputFilename = `${ Date.now() }.xls`;

//       // If you want to download file automatically using link attribute.
//       const url = URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', outputFilename);
//       document.body.appendChild(link);
//       link.click();

//       // // OR you can save/write file locally.
//       // fs.writeFileSync(outputFilename, response.data);
//   } catch (error) {
//     te("Could not Download the Excel report from the backend.");

//   }
// }
