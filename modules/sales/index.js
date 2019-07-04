import Sales from "./components/Sales";
import OrderDetails from "./components/OrderDetails";
import * as epics from "./epics";
import * as reducers from "./reducers";
import {combineReducers} from "redux";

export const salesEpics = Object.values(epics);

export const sales = combineReducers({
    ...reducers
});

export {
    Sales, OrderDetails
};
