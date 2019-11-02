import {
    USER_ADD_ACCOUNT,
    USER_DELETE_ACCOUNT,
    USER_ADD_ACCOUNT_FETCHING,
    USER_ADD_ACCOUNT_ERROR,
    RECEIVE_USER_ACCOUNTS,
    FETCHING_USER_ACCOUNTS,
    GET_USER_ACCOUNTS_ERROR,
    USER_CLEAR_ACCOUNTS,
    UPDATE_ACCOUNT_AUTH,
} from "../userAccountsActions";
import update from "immutability-helper";

interface InitialState {
    accounts: Account[];
    fetchingAccounts: boolean;
    didFetchAccounts: boolean;
    getAccountsError: string;
    addingAccount: boolean;
    didAddAccount: boolean;
    addAccountError: string;
}

const initialState: InitialState = {
    accounts: [],
    fetchingAccounts: false,
    didFetchAccounts: false,
    getAccountsError: "",
    addingAccount: false,
    didAddAccount: false,
    addAccountError: "",
};

export function userAccounts(state = initialState, action: IAccountAction) {
    switch (action.type) {
        case RECEIVE_USER_ACCOUNTS:
            const { accounts } = action.payload;
            return {
                ...state,
                accounts,
                fetchingAccounts: false,
                didFetchAccounts: true,
            };
        case FETCHING_USER_ACCOUNTS:
            return {
                fetchingAccounts: true,
                didFetchAccounts: false,
            };
        case GET_USER_ACCOUNTS_ERROR:
            const { getAccountsError } = action.payload;
            return {
                ...state,
                fetchingAccounts: false,
                didFetchAccounts: false,
                getAccountsError:
                    getAccountsError !== "" && getAccountsError !== undefined
                        ? getAccountsError
                        : "",
            };
        case USER_ADD_ACCOUNT:
            const { account } = action.payload;
            return {
                ...state,
                accounts: [...state.accounts, account],
                addingAccount: false,
                didAddAccount: true,
                addAccountError: "",
            };
        case USER_ADD_ACCOUNT_FETCHING:
            return {
                ...state,
                didAddAccount: false,
                addingAccount: true,
            };
        case USER_ADD_ACCOUNT_ERROR:
            const { addAccountError } = action.payload;
            return {
                ...state,
                addingAccount: false,
                addAccountError:
                    addAccountError !== undefined && addAccountError !== ""
                        ? addAccountError
                        : "",
            };
        case USER_DELETE_ACCOUNT:
            return state;
        case USER_CLEAR_ACCOUNTS:
            return {
                initialState,
            };
        case UPDATE_ACCOUNT_AUTH:
            const { accountId, accountAuth } = action.payload;
            const accountMatch = state.accounts.find(
                account => account.accountId == accountId
            );

            let index = 0;
            if (accountMatch != undefined) {
                index = state.accounts.indexOf(accountMatch);
                console.log(index);
                console.log(accountMatch);
                console.log(accountAuth);
            } else return state;

            return {
                ...state,
                accounts: state.accounts.map((account, i) =>
                    i === index ? { ...account, accountAuth } : account
                ),
            };
        default:
            return state;
    }
}