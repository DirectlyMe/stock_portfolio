import {
    USER_RECEIVE_AUTH,
    USER_INVALIDATE_LOGIN,
    USER_INVALIDATE_REGISTER,
    USER_REQUEST_AUTH,
    USER_LOGOUT,
} from "../userAuthActions";

let user: IUser | null = null;
let retrievedUser: string | null = localStorage.getItem("user");
if (retrievedUser) {
    user = JSON.parse(retrievedUser);
    console.log(user);
}

const initialState = {
    username: user ? user.username : "",
    password: "",
    didInvalidate: false,
    registerError: "",
    loginError: "",
    isFetching: false,
    didAuthorize: user ? true: false,
    authToken: user ? user.token : "",
};

console.log(initialState);

export function userAuth(state = initialState, action: IUserAuth) {
    switch (action.type) {
        case USER_INVALIDATE_LOGIN:
            const { loginError } = action.payload;
            return {
                ...state,
                loginError: loginError !== undefined && loginError !== "" ? loginError : "",
                didInvalidate: true,
                isFetching: false,
                didAuthorize: false,
            };
        case USER_INVALIDATE_REGISTER:
            const { registerError } = action.payload;
            return {
                ...state,
                registerError: registerError !== undefined && registerError !== "" ? registerError : "",
                didInvalidate: true,
                isFetching: false,
                didAuthorize: false,
            };
        case USER_REQUEST_AUTH:
            const { username, password } = action.payload;
            return {
                ...state,
                username,
                password,
                errors: [],
                didInvalidate: false,
                isFetching: true,
                didAuthorize: false,
            };
        case USER_RECEIVE_AUTH:
            const { authToken } = action.payload;
            return {
                ...state,
                didInvalidate: false,
                isFetching: false,
                didAuthorize: true,
                authToken,
                errors: [],
            };
        case USER_LOGOUT:
            return {
                ...state,
                username: "",
                password: "",
                didAuthorize: false,
                authToken: "",
            };
        default:
            return state;
    }
}
