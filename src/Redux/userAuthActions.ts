import { Dispatch } from "redux";

const controllerUrl = "https://localhost:5001/api/users";

export const USER_INVALIDATE_REGISTER = "USER_INVALIDATE_REGISTER";
export function invalidateUserRegister(error: any) {
    return {
        type: USER_INVALIDATE_REGISTER,
        payload: {
            registerError: error,
        },
    };
}

export const USER_INVALIDATE_LOGIN = "USER_INVALIDATE_LOGIN";
export function invalidateUserLogin(error: any) {
    return {
        type: USER_INVALIDATE_LOGIN,
        payload: {
            loginError: error
        }
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

export const USER_LOGOUT = "USER_LOGOUT";
export function logoutUser() {
    return {
        type: USER_LOGOUT
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

            const responseText = await response.json();

            if (responseText.hasOwnProperty("error")) {
                dispatch(invalidateUserRegister(responseText.error));
            } else if (responseText.hasOwnProperty("ConfirmPassword")) {
                dispatch(invalidateUserRegister(responseText.ConfirmPassword[0]));
            } else {          
                //@ts-ignore
                dispatch(loginUser(username, password));
            }

        } catch (err) {
            dispatch(invalidateUserRegister("Registration failed"));
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

            const response = await fetch(`${controllerUrl}/authenticate`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });

            const responseBody = await response.json();
            if (responseBody.hasOwnProperty("token")) {
                dispatch(receiveUserAuth(responseBody.token));
            } else if (responseBody.hasOwnProperty("error")) {
                dispatch(invalidateUserLogin(responseBody.error));
            } else {
                dispatch(invalidateUserLogin("Authentication failed"));
            }
        } catch (err) {
            dispatch(invalidateUserLogin("Authentication failed"));
        }
    };
}
