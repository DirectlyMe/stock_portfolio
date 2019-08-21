import { Dispatch } from "redux";

export const USER_ADD_ACCOUNT = "USER_ADD_ACCOUNT";
export function addAccount(accountType: string, username: string, password: string) {
    return {
        type: USER_ADD_ACCOUNT,
        payload: {
            accountType,
            username,
            password
        }
    };
}

export const USER_DELETE_ACCOUNT = "USER_DELETE_ACCOUNT";
export function deleteAccount(accountType: string) {
    return {
        type: USER_DELETE_ACCOUNT,
        payload: {
            accountType
        }
    };
}

// export function addNewAccount(accountType: string, username:string, password: string) {
//     return async (dispatch: Dispatch) => {
//         try {
            
//         }
//     };
// }