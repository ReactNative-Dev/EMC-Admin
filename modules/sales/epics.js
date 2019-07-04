import {catchError, map, switchMap, tap} from "rxjs/operators";
import {fromPromise} from "rxjs/observable/fromPromise";
import {of} from "rxjs/observable/of";
import {ofType} from "redux-observable";

import {
    CANCEL_ORDER,
    EMAIL_ORDER_STATUS,
    GET_LOCATION,
    GET_ORDER,
    GET_ORDER_COMMENTS,
    GET_ORDER_STATUS,
    GET_ORDERS,
    HOLD_ORDER,
    INVOICE_ORDER,
    POST_ORDER_COMMENT,
    SHIP_ORDER,
    UNHOLD_ORDER,
    DATE_DAY_FILTER,
    DATE_WEEK_FILTER,
    DATE_MONTH_FILTER
} from "./actionTypes";
import {
    cancelOrderFailure,
    cancelOrderSuccess,
    emailOrderStatusFailure,
    emailOrderStatusSuccess,
    getLocationFailure,
    getLocationSuccess,
    getOrderCommentsFailure,
    getOrderCommentsSuccess,
    getOrderFailure,
    getOrdersFailure,
    getOrdersSuccess,
    getOrderStatusFailure,
    getOrderStatusSuccess,
    getOrderSuccess,
    holdOrderFailure,
    holdOrderSuccess,
    invoiceOrderFailure,
    invoiceOrderSuccess,
    postOrderCommentFailure,
    postOrderCommentSuccess,
    shipOrderFailure,
    shipOrderSuccess,
    unholdOrderFailure,
    unholdOrderSuccess,
    dateDayFilterSuccess,
    dateDayFilterFailure,
    dateWeekFilterFailure,
    dateWeekFilterSuccess,
    dateMonthFilterFailure,
    dateMonthFilterSuccess
} from "./actions";
import {handleResponse} from "../../common/utils";
import {
    cancelOrder$$,
    emailOrderStatus$$,
    getLocation$$,
    getOrder$$,
    getOrderComments$$,
    getOrders$$,
    getOrderStatus$$,
    holdOrder$$,
    invoiceOrder$$,
    postOrderComment$$,
    shipOrder$$,
    unholdOrder$$,
    dateDayFilter$$,
    dateWeekFilter$$,
    dateMonthFilter$$
} from "./api";

export const getOrders$ = action$ => {
    return action$.pipe(
        ofType(GET_ORDERS),
        switchMap(({payload}) => {
            return fromPromise(getOrders$$(payload)).pipe(
                map(response =>
                    handleResponse(response, getOrdersSuccess, getOrdersFailure)
                ),
                catchError(err => of(getOrdersFailure(err)))
            );
        })
    );
};

export const getOrder$ = action$ => {
    return action$.pipe(
        ofType(GET_ORDER),
        switchMap(({payload}) => {
            return fromPromise(getOrder$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, getOrderSuccess, getOrderFailure)
                ),
                catchError(err => of(getOrderFailure(err)))
            );
        })
    );
};

export const holdOrder$ = action$ => {
    return action$.pipe(
        ofType(HOLD_ORDER),
        switchMap(({payload}) => {
            return fromPromise(holdOrder$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, holdOrderSuccess, holdOrderFailure)
                ),
                catchError(err => of(holdOrderFailure(err)))
            );
        })
    );
};

export const unholdOrder$ = action$ => {
    return action$.pipe(
        ofType(UNHOLD_ORDER),
        switchMap(({payload}) => {
            return fromPromise(unholdOrder$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, unholdOrderSuccess, unholdOrderFailure)
                ),
                catchError(err => of(unholdOrderFailure(err)))
            );
        })
    );
};

export const emailOrderStatus$ = action$ => {
    return action$.pipe(
        ofType(EMAIL_ORDER_STATUS),
        switchMap(({payload}) => {
            return fromPromise(emailOrderStatus$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, emailOrderStatusSuccess, emailOrderStatusFailure)
                ),
                catchError(err => of(emailOrderStatusFailure(err)))
            );
        })
    );
};

export const cancelOrder$ = action$ => {
    return action$.pipe(
        ofType(CANCEL_ORDER),
        switchMap(({payload}) => {
            return fromPromise(cancelOrder$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, cancelOrderSuccess, cancelOrderFailure)
                ),
                catchError(err => of(cancelOrderFailure(err)))
            );
        })
    );
};

export const getOrderStatus$ = action$ => {
    return action$.pipe(
        ofType(GET_ORDER_STATUS),
        switchMap(({payload}) => {
            return fromPromise(getOrderStatus$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, getOrderStatusSuccess, getOrderStatusFailure)
                ),
                catchError(err => of(getOrderStatusFailure(err)))
            );
        })
    );
};

export const getOrderComments$ = action$ => {
    return action$.pipe(
        ofType(GET_ORDER_COMMENTS),
        switchMap(({payload}) => {
            return fromPromise(getOrderComments$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, getOrderCommentsSuccess, getOrderCommentsFailure)
                ),
                catchError(err => of(getOrderCommentsFailure(err)))
            );
        })
    );
};

export const postOrderComment$ = action$ => {
    return action$.pipe(
        ofType(POST_ORDER_COMMENT),
        switchMap(({payload}) => {
            return fromPromise(postOrderComment$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, postOrderCommentSuccess, postOrderCommentFailure)
                ),
                catchError(err => of(postOrderCommentFailure(err)))
            );
        })
    );
};

export const shipOrder$ = action$ => {
    return action$.pipe(
        ofType(SHIP_ORDER),
        switchMap(({payload}) => {
            return fromPromise(shipOrder$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, shipOrderSuccess, shipOrderFailure)
                ),
                catchError(err => of(shipOrderFailure(err)))
            );
        })
    );
};

export const invoiceOrder$ = action$ => {
    return action$.pipe(
        ofType(INVOICE_ORDER),
        switchMap(({payload}) => {
            return fromPromise(invoiceOrder$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, invoiceOrderSuccess, invoiceOrderFailure)
                ),
                catchError(err => of(invoiceOrderFailure(err)))
            );
        })
    );
};

export const getLocation$ = action$ => {
    return action$.pipe(
        ofType(GET_LOCATION),
        switchMap(({payload}) => {
            return fromPromise(getLocation$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, getLocationSuccess, getLocationFailure)
                ),
                catchError(err => of(getLocationFailure(err)))
            );
        })
    );
};

export const dateDayFilter$ = action$ => {
    return action$.pipe(
        ofType(DATE_DAY_FILTER),
        switchMap(({payload}) => {
            return fromPromise(dateDayFilter$$(payload)).pipe(
                map(response =>
                    handleResponse(response, dateDayFilterSuccess, dateDayFilterFailure)
                ),
                catchError(err => of(dateDayFilterFailure(err)))
            );
        })
    );
};

export const dateWeekFilter$ = action$ => {
    return action$.pipe(
        ofType(DATE_WEEK_FILTER),
        switchMap(({payload}) => {
            return fromPromise(dateWeekFilter$$(payload)).pipe(
                map(response =>
                    handleResponse(response, dateWeekFilterSuccess, dateWeekFilterFailure)
                ),
                catchError(err => of(dateWeekFilterFailure(err)))
            );
        })
    );
};

export const dateMonthFilter$ = action$ => {
    return action$.pipe(
        ofType(DATE_MONTH_FILTER),
        switchMap(({payload}) => {
            return fromPromise(dateMonthFilter$$(payload)).pipe(
                map(response =>
                    handleResponse(response, dateMonthFilterSuccess, dateMonthFilterFailure)
                ),
                catchError(err => of(dateMonthFilterFailure(err)))
            );
        })
    );
};
