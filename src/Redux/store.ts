import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import * as userAuthActions from "./userAuthActions";
import * as robinhoodAuthActions from "./robinhoodAuthActions";

const loggerMiddleware = createLogger();
//@ts-ignore
const composeEnhancers = composeWithDevTools({ userAuthActions, robinhoodAuthActions, trace: true, traceLimit: 25});

export default createStore(rootReducer, composeEnhancers(
    applyMiddleware(loggerMiddleware, thunkMiddleware)
));