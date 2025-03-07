import { Configs, LocalKeys } from "@/lib/constants";
import { toast } from "sonner";

const storeDataLocalStorage = async (fieldname, fieldvalue) => {
    fieldname = fieldname.toString();
    localStorage.setItem(fieldname, JSON.stringify(fieldvalue));
    return;
}

const getLocalStoreData = async (fieldname) => {
    fieldname = fieldname.toString();
    let data = await localStorage.getItem(fieldname);
    if (typeof data == "string") {
        data = JSON.parse(data);
    }
    return data;
}

const removeLocalStoreData = async (fieldname) => {
    fieldname = fieldname.toString();
    return await localStorage.removeItem(fieldname);
}

export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

const commonApiCall = async (props) => {
    try {
        const { apiUri, method, body = {},  isAuthenticatedCall = true } = props;

        let headers:any = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        if (isAuthenticatedCall) {
            let getData:any = await getLocalStoreData(LocalKeys.USER_DATA);
            let { token } = getData;
console.log('token',token)
            headers.Authorization = `Bearer ${token}`;
        }

        // Do not include body in GET requests
        const fetchOptions:any = {
            method,
            headers,
        };

        if (method !== "GET" && method !== "HEAD") {
            fetchOptions.body = JSON.stringify(body);
        }

        const response = await fetch(`${Configs.BASE_URL + apiUri}`, fetchOptions);
        const responseJson = await response.json();

        if (responseJson.response_code == 401) {
            // toast.error(responseJson.message);/
            localStorage.clear();
            window.location.href = "/";
            return {}; // Unauthorized, return empty object
        }
        // console.log('response json  0----- ',responseJson);


        return responseJson;
    } catch (error) {
        console.error("API Call Error:", error);
        throw error; // Propagate error to the caller
    }
};




export default {
    commonApiCall, removeLocalStoreData, getLocalStoreData, storeDataLocalStorage
}