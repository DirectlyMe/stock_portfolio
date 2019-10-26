import { combineReducers } from "redux";
import { userAuth } from "./userAuth";
import { userAccounts } from "./userAccounts";
import { accountTypes } from "./accountTypes";

//@ts-ignore
const reducers = combineReducers({
    //@ts-ignore
    userAuth, userAccounts, accountTypes
});

export default reducers;
