import {actionCreator} from "../../common/utils";
import {
    GET_ORDERS_DAY,
    GET_ORDERS_DAY_FAILURE,
    GET_ORDERS_DAY_SUCCESS,
    GET_ORDERS_MONTH,
    GET_ORDERS_MONTH_FAILURE,
    GET_ORDERS_MONTH_SUCCESS,
    GET_ORDERS_WEEK,
    GET_ORDERS_WEEK_FAILURE,
    GET_ORDERS_WEEK_SUCCESS,
} from "./actionTypes";

export const getOrdersDay = actionCreator(GET_ORDERS_DAY);
export const getOrdersDaySuccess = actionCreator(GET_ORDERS_DAY_SUCCESS);
export const getOrdersDayFailure = actionCreator(GET_ORDERS_DAY_FAILURE);

export const getOrdersWeek = actionCreator(GET_ORDERS_WEEK);
export const getOrdersWeekSuccess = actionCreator(GET_ORDERS_WEEK_SUCCESS);
export const getOrdersWeekFailure = actionCreator(GET_ORDERS_WEEK_FAILURE);

export const getOrdersMonth = actionCreator(GET_ORDERS_MONTH);
export const getOrdersMonthSuccess = actionCreator(GET_ORDERS_MONTH_SUCCESS);
export const getOrdersMonthFailure = actionCreator(GET_ORDERS_MONTH_FAILURE);