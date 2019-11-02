import { Dispatch } from "redux";
import authHeader from "../helpers/authHeader";

const controllerURL = "https://localhost:5001/api/externalAccounts";

export const RECEIVE_USER_ACCOUNTS = "GET_USER_ACCOUNTS";
export function receiveUserAccounts(accounts: Account) {
    return {
        type: RECEIVE_USER_ACCOUNTS,
        payload: {
            accounts
        }
    };
}

export const FETCHING_USER_ACCOUNTS = "FETCHING_USER_ACCOUNTS";
export function fetchingUserAccounts() {
    return {
        type: FETCHING_USER_ACCOUNTS
    };
}

export const GET_USER_ACCOUNTS_ERROR = "GET_USER_ACCOUNTS_ERROR";
export function getUserAccountsError(getAccountsError: string) {
    return {
        type: GET_USER_ACCOUNTS_ERROR,
        payload: {
            getAccountsError
        }
    };
}

export const USER_ADD_ACCOUNT_ERROR = "USER_ADD_ACCOUNT_ERROR";
export function addAccountError(addAccountError: string) {
    return {
        type: USER_ADD_ACCOUNT_ERROR,
        payload: {
            addAccountError
        }
    };
}

export const USER_ADD_ACCOUNT_FETCHING = "USER_ADD_ACCOUNT_FETCHING";
export function addAccountPending() {
    return {
        type: USER_ADD_ACCOUNT_FETCHING,
    };
}

export const USER_ADD_ACCOUNT = "USER_ADD_ACCOUNT";
export function addAccount(accountType: string, username: string) {
    return {
        type: USER_ADD_ACCOUNT,
        payload: {
            account: {
                accountType,
                username,
            }
        }
    };
}

export const USER_DELETE_ACCOUNT = "USER_DELETE_ACCOUNT";
export function deleteAccount(accountType: string) {
    return {
        type: USER_DELETE_ACCOUNT,
        payload: {
            accountType
        }
    };
}

export const USER_CLEAR_ACCOUNTS = "USER_CLEAR_ACCOUNTS";
export function clearUserAccounts() {
    return {
        type: USER_CLEAR_ACCOUNTS
    };
}

export const UPDATE_ACCOUNT_AUTH = "UPDATE_ACCOUNT_AUTH";
export function updateAccountAuth(accountId: number, accountAuth: ExternalAccountAuth) {
    return {
        type: UPDATE_ACCOUNT_AUTH,
        payload: {
            accountId,
            accountAuth
        }
    };
}

export function addNewAccount(type: string, username:string, password: string, confirmPassword: string) {
    return async (dispatch: Dispatch) => {
        dispatch(addAccountPending());

        try {
            const response = await fetch(controllerURL, {
                method: "POST",
                body: JSON.stringify({ username, password, confirmPassword, type }),
                headers: authHeader
            });

            const responseBody = await response.json();

            if (responseBody.hasOwnProperty("success")) {
                dispatch(addAccount(type, username));
            }
            else if (responseBody.hasOwnProperty("error")) {
                dispatch(addAccountError(responseBody.error));
            }
        } catch (err) {
            dispatch(addAccountError(err));
        }
    };
}

export function getUserAccounts() {
    return async (dispatch: Dispatch) => {
        dispatch(fetchingUserAccounts());

        try {
            const response = await fetch(controllerURL, {
                method: "GET",
                headers: authHeader
            });

            const responseBody = await response.json();

            if (responseBody.hasOwnProperty("accounts"))
                dispatch(receiveUserAccounts(responseBody.accounts));
            else
                dispatch(getUserAccountsError("Failed to retrieve accounts"));
        } catch (err) {
            dispatch(getUserAccountsError(err.toString()));
        }
    };
}