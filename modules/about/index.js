import About from "./components/About";
import * as epics from "./epics";
import * as reducers from "./reducers";
import {combineReducers} from "redux";

export const aboutEpics = Object.values(epics);

export const about = combineReducers({
    ...reducers
});

export {
    About
};
