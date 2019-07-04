import Help from "./components/Help";
import * as epics from "./epics";
import * as reducers from "./reducers";
import {combineReducers} from "redux";

export const helpEpics = Object.values(epics);

export const help = combineReducers({
    ...reducers
});

export {
    Help
};
