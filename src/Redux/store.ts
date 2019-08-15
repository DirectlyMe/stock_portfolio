import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const loggerMiddleware = createLogger();

export default createStore(rootReducer, composeWithDevTools(
    applyMiddleware(loggerMiddleware, thunkMiddleware)
));