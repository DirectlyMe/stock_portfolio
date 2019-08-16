import { USER_RECEIVE_AUTH, USER_INVALIDATE_AUTH, USER_REQUEST_AUTH } from "../userAuthActions";

const initialState = {
    username: "",
    password: "",
    didInvalidate: false,
    errors: [],
    isFetching: false,
    didAuthorize: false,
    authToken: ""
};

export function userAuth(state = initialState, action: IUserAuth) {
    switch (action.type) {
        case USER_INVALIDATE_AUTH:
            const { error } = action.payload;
            return {
                ...state,
                errors: error ? error.split(".") : [],
                didInvalidate: true,
                isFetching: false,
                didAuthorize: false,
            };
        case USER_REQUEST_AUTH: 
            return {
                ...state,
                errors: [],
                didInvalidate: false,
                isFetching: true,
                didAuthorize: false
            };
        case USER_RECEIVE_AUTH: 
            const { authToken } = action.payload;
            return {
                ...state,
                didInvalidate: false,
                isFetching: false,
                didAuthorize: true,
                authToken,
                errors: []
            };
        default:
            return state;
    }
}