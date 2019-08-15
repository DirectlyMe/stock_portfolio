interface IRobinhoodAuth {
    type: string
    payload: {
        didInvalidate?: boolean;
        isFetching?: boolean;
        authToken?: string;
        username?: string;
        password?: string;
        mfa?: string;
    }
}

interface IRobinhoodAccountsAction {
    type: string,
    payload: {
        
    }
}