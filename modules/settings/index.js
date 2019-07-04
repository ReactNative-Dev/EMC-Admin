import Settings from "./components/Settings";
import * as epics from "./epics";
import * as reducers from "./reducers";
import {combineReducers} from "redux";

export const settingsEpics = Object.values(epics);

export const settings = combineReducers({
    ...reducers
});

export {
    Settings
};
