import Stores from "./components/Stores";
import * as epics from "./epics";
import * as reducers from "./reducers";
import {combineReducers} from "redux";

export const storesEpics = Object.values(epics);

export const stores = combineReducers({
    ...reducers
});

export {
    Stores
};
