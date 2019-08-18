interface IRobinhoodAuth {
    type: string;
    payload: {
        didInvalidate?: boolean;
        error?: string;
        didAuthenticate?: boolean;
        isFetching?: boolean;
        authToken?: string;
        username?: string;
        password?: string;
        mfa?: string;
    };
}

interface IRobinhoodAccountsAction {
    type: string;
    payload: {
        
    };
}

interface IUserAuth {
    type: string;
    payload: {
        didInvalidate?: boolean;
        registerError?: string;
        loginError?: string;
        didAuthenticate?: boolean;
        isFetching?: boolean;
        authToken?: string;
        username?: string;
        password?: string;
    }
}