import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {login, loginEpics} from "../modules/login";
import {stores, storesEpics} from "../modules/stores";
import {sales, salesEpics} from "../modules/sales";
import {dashboard, dashboardEpics} from "../modules/dashboard";

const rootReducer = combineReducers({
    login, stores, sales, dashboard
});

const rootEpic = combineEpics(...loginEpics, ...storesEpics, ...salesEpics, ...dashboardEpics);
const epicMiddleware = createEpicMiddleware();
const store = createStore(
    rootReducer,
    compose(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);
export default store;
