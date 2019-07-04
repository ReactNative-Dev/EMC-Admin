import Login from "./components/Login";
import * as epics from "./epics";
import * as reducers from "./reducers";
import {combineReducers} from "redux";

export const loginEpics = Object.values(epics);

export const login = combineReducers({
    ...reducers
});

export {
    Login
};
