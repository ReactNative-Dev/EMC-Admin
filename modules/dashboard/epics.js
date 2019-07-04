import {catchError, map, switchMap, tap} from "rxjs/operators";
import {fromPromise} from "rxjs/observable/fromPromise";
import {of} from "rxjs/observable/of";
import {ofType} from "redux-observable";

import {GET_ORDERS_DAY, GET_ORDERS_MONTH, GET_ORDERS_WEEK} from "./actionTypes";
import {
    getOrdersDayFailure,
    getOrdersDaySuccess,
    getOrdersMonthFailure,
    getOrdersMonthSuccess,
    getOrdersWeekFailure,
    getOrdersWeekSuccess
} from "./actions";
import {handleResponse} from "../../common/utils";
import {getOrdersDay$$, getOrdersMonth$$, getOrdersWeek$$} from "./api";

export const getOrdersDay$ = action$ => {
    return action$.pipe(
        ofType(GET_ORDERS_DAY),
        switchMap(({payload}) => {
            return fromPromise(getOrdersDay$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, getOrdersDaySuccess, getOrdersDayFailure)
                ),
                catchError(err => of(getOrdersDayFailure(err)))
            );
        })
    );
};

export const getOrdersWeek$ = action$ => {
    return action$.pipe(
        ofType(GET_ORDERS_WEEK),
        switchMap(({payload}) => {
            return fromPromise(getOrdersWeek$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, getOrdersWeekSuccess, getOrdersWeekFailure)
                ),
                catchError(err => of(getOrdersWeekFailure(err)))
            );
        })
    );
};

export const getOrdersMonth$ = action$ => {
    return action$.pipe(
        ofType(GET_ORDERS_MONTH),
        switchMap(({payload}) => {
            return fromPromise(getOrdersMonth$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, getOrdersMonthSuccess, getOrdersMonthFailure)
                ),
                catchError(err => of(getOrdersMonthFailure(err)))
            );
        })
    );
};