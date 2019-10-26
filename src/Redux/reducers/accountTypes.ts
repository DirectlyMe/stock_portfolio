import {
    ACCOUNT_TYPES_RECEIVED,
    ACCOUNT_TYPES_FETCHING,
    ACCOUNT_TYPES_ERROR,
} from "../accountTypesActions";

const initialState = {
    accountTypes: [],
    isFetching: false,
    error: "",
};

export function accountTypes(state = initialState, action: IAccountTypeAction) {
    switch (action.type) {
        case ACCOUNT_TYPES_RECEIVED: 
            const { accountTypes } = action.payload;
            return {
                ...state,
                isFetching: false,
                accountTypes
            };
        case ACCOUNT_TYPES_FETCHING:
            return {
                ...state,
                isFetching: true,
            };
        case ACCOUNT_TYPES_ERROR:
            const { error } = action.payload;
            return {
                ...state,
                isFetching: false,
                error
            };
        default:
            return state;
    }
}
