import { Dispatch } from "redux";

const controllerUrl = "https://localhost:5001/api/generalauth";

export const USER_INVALIDATE_AUTH = "USER_INVALIDATE_AUTH";
export function invalidUserAuth(error: any) {
    return {
        type: USER_INVALIDATE_AUTH,
        payload: {
            error,
        },
    };
}
export const USER_REQUEST_AUTH = "USER_REQUEST_AUTH";
export function requestUserAuth(username: string, password: string) {
    return {
        type: USER_REQUEST_AUTH,
        payload: {
            username,
            password,
        },
    };
}

export const USER_RECEIVE_AUTH = "USER_RECEIVE_AUTH";
export function receiveUserAuth(authToken: string) {
    return {
        type: USER_RECEIVE_AUTH,
        payload: {
            authToken,
        },
    };
}

export function registerUser(
    username: string,
    password: string,
    confirmPassword: string
) {
    return async (dispatch: Dispatch) => {
        dispatch(requestUserAuth(username, password));

        try {
            const payload = {
                UserName: username,
                Password: password,
                ConfirmPassword: confirmPassword,
            };

            const response = await fetch(`${controllerUrl}/register`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });

            const responseText = await response.text();
            responseText === ""
                //@ts-ignore
                ? dispatch(loginUser(username, password))
                : dispatch(invalidUserAuth(responseText));
        } catch (err) {
            dispatch(invalidUserAuth(err));
        }
    };
}

export function loginUser(username: string, password: string) {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(requestUserAuth(username, password));

            const payload = {
                UserName: username,
                Password: password,
            };

            const response = await fetch(`${controllerUrl}/login`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });

            // const responseBody = await response.json();
            dispatch(receiveUserAuth("Test Complete"));
        } catch (err) {
            dispatch(invalidUserAuth(err));
        }
    };
}
