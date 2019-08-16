import {
    ROBINHOOD_REQUEST_AUTHENTICATION,
    ROBINHOOD_INVALIDATE_AUTHENTICATION,
    ROBINHOOD_RECEIVE_AUTHENTICATION,
} from "../robinhoodAuthActions";

const initialAuthState = {
    authToken: "",
    isFetching: false,
    didInvalidate: false,
    error: "",
    didAuthenticate: false,
    username: "",
    password: "",
    mfa: ""
};

export function robinhoodAuth(state = initialAuthState, action: IRobinhoodAuth) {
    switch (action.type) {
        case ROBINHOOD_INVALIDATE_AUTHENTICATION: 
            const { error } = action.payload;
            return {
                ...state,
                didInvalidate: true,
                error,
                isFetching: false
            };
        case ROBINHOOD_REQUEST_AUTHENTICATION: 
            const { username, password, mfa } = action.payload; 
            return {
                ...state,
                isFetching: true,
                username,
                password,
                mfa
            };
        case ROBINHOOD_RECEIVE_AUTHENTICATION: 
            const { authToken } = action.payload;
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                didAuthenticate: true,
                authToken
            };
        default: 
            return state;
    }
}

const initialAccountsState = {
    userAccounts: []
};

export function robinhoodAccounts(state = initialAccountsState, action: any) {
    switch (action.type) {
        default:
            return state;
    }
}
