import Dashboard from "./components/Dashboard";
import * as epics from "./epics";
import * as reducers from "./reducers";
import {combineReducers} from "redux";

export const dashboardEpics = Object.values(epics);

export const dashboard = combineReducers({
    ...reducers
});

export {
    Dashboard
};
