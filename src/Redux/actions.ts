const serverUrl = "https://localhost:5001/api";

export const ROBINHOOD_REQUEST_AUTHENTICATION =
    "ROBINHOOD_REQUEST_AUTHENTICATION";
export function robinhoodRequestAuth(
    username: string,
    password: string,
    mfa: string
) {
    return {
        type: ROBINHOOD_REQUEST_AUTHENTICATION,
        payload: {
            username,
            password,
            mfa,
        },
    };
}

export const ROBINHOOD_INVALIDATE_AUTHENTICATION =
    "ROBINHOOD_INVALIDATE_AUTHENTICATION";
export function robinhoodInvalidAuth() {
    return {
        type: ROBINHOOD_INVALIDATE_AUTHENTICATION,
    };
}

export const ROBINHOOD_RECEIVE_AUTHENTICATION =
    "ROBINHOOD_RECEIVE_AUTHENTICATION";
export function robinhoodReceiveAuth(authToken: string) {
    return {
        type: ROBINHOOD_RECEIVE_AUTHENTICATION,
        payload: {
            authToken,
        },
    };
}

export function fetchAuth(username: string, password: string, mfa: string) {
    return async (dispatch: any) => {
        dispatch(robinhoodRequestAuth(username, password, mfa));

        try {
            const response = await fetch(`${serverUrl}/robinhoodauth`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify({ username, password, mfa }),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });

            const responseBody = await response.json();
            console.log(responseBody.access_token);
            dispatch(robinhoodReceiveAuth(responseBody.access_token));
        } catch (err) {
            console.log(err);
        }
    };
}
