import { combineReducers } from "redux";
import { robinhoodAuth } from "./robinhood";
import { userAuth } from "./userAuth";

//@ts-ignore
const reducers = combineReducers({
    //@ts-ignore
    robinhoodAuth, userAuth
});

export default reducers;
