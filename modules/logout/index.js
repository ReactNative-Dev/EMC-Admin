import Logout from "./components/Logout";
import * as epics from "./epics";
import * as reducers from "./reducers";
import {combineReducers} from "redux";

export const logoutEpics = Object.values(epics);

export const logout = combineReducers({
    ...reducers
});

export {
    Logout
};
