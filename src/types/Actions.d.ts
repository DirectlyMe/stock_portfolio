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

interface IAccountTypeAction {
    type: string;
    payload: {
        error?: string,
        accountTypes?: string[]
    }
}

interface IAccountAction {
    type: string;
    payload: {
        addAccountError?: string;
        getAccountsError?: string;
        account?: {
            type: string;
            username: string;
        };
        accounts?: [{
            type: string;
            username: string;
        }];
        accountId: number;
        accountAuth: ExternalAccountAuth;
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