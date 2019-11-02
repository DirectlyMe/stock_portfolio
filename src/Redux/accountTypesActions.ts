import { Dispatch } from "redux";
import authHeader from "../helpers/authHeader";

const controllerUrl = "https://localhost:5001/api/externalaccounttypes";

export const ACCOUNT_TYPES_RECEIVED = "ACCOUNT_TYPES_RECEIVED";
export function receivedAccountTypes(accountTypes: string[]) {
    return {
        type: ACCOUNT_TYPES_RECEIVED,
        payload: {
            accountTypes
        }
    };
}

export const ACCOUNT_TYPES_FETCHING = "ACCOUNT_TYPES_FETCHING";
export function fetchAccountTypes() {
    return {
        type: ACCOUNT_TYPES_FETCHING,
    };
}

export const ACCOUNT_TYPES_ERROR = "ACCOUNT_TYPES_ERROR";
export function accountTypesError(error: string) {
    return {
        type: ACCOUNT_TYPES_ERROR,
        payload: {
            error
        }
    };
}

export const ACCOUNT_TYPES_CLEAR = "ACCOUNT_TYPES_CLEAR";
export function clearAccountTypes() {
    return {
        type: ACCOUNT_TYPES_CLEAR
    };
}

export function getAccountTypes() {
    return async (dispatch: Dispatch) => {
        dispatch(fetchAccountTypes());

        try {
            const response = await fetch(controllerUrl, {
                method: "GET",
                mode: "cors",
                headers: authHeader
            });

            const responseBody = await response.json();

            if (responseBody.hasOwnProperty("accountTypes"))
                dispatch(receivedAccountTypes(responseBody.accountTypes));
            else if (responseBody.hasOwnProperty("error"))
                dispatch(accountTypesError(responseBody.error));

        } catch (err) {
            dispatch(accountTypesError(err.toString()));
        }
    };
}

