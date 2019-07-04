import {actionCreator} from "../../common/utils";
import {
    GET_ORDERS,
    GET_ORDERS_FAILURE,
    GET_ORDERS_SUCCESS,
    GET_ORDER,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILURE,
    HOLD_ORDER,
    HOLD_ORDER_SUCCESS,
    HOLD_ORDER_FAILURE,
    UNHOLD_ORDER,
    UNHOLD_ORDER_SUCCESS,
    UNHOLD_ORDER_FAILURE,
    EMAIL_ORDER_STATUS,
    EMAIL_ORDER_STATUS_SUCCESS,
    EMAIL_ORDER_STATUS_FAILURE,
    CANCEL_ORDER,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAILURE,
    GET_ORDER_STATUS,
    GET_ORDER_STATUS_SUCCESS,
    GET_ORDER_STATUS_FAILURE,
    GET_ORDER_COMMENTS,
    GET_ORDER_COMMENTS_SUCCESS,
    GET_ORDER_COMMENTS_FAILURE,
    POST_ORDER_COMMENT,
    POST_ORDER_COMMENT_SUCCESS,
    POST_ORDER_COMMENT_FAILURE,
    SHIP_ORDER,
    SHIP_ORDER_SUCCESS,
    SHIP_ORDER_FAILURE,
    INVOICE_ORDER,
    INVOICE_ORDER_SUCCESS,
    INVOICE_ORDER_FAILURE,
    GET_LOCATION,
    GET_LOCATION_SUCCESS,
    GET_LOCATION_FAILURE,
    DATE_DAY_FILTER,
    DATE_DAY_FILTER_FAILURE,
    DATE_DAY_FILTER_SUCCESS,
    DATE_MONTH_FILTER,
    DATE_MONTH_FILTER_FAILURE,
    DATE_MONTH_FILTER_SUCCESS,
    DATE_WEEK_FILTER,
    DATE_WEEK_FILTER_FAILURE,
    DATE_WEEK_FILTER_SUCCESS,
} from "./actionTypes";

export const getOrders = actionCreator(GET_ORDERS);
export const getOrdersSuccess = actionCreator(GET_ORDERS_SUCCESS);
export const getOrdersFailure = actionCreator(GET_ORDERS_FAILURE);

export const getOrder = actionCreator(GET_ORDER);
export const getOrderSuccess = actionCreator(GET_ORDER_SUCCESS);
export const getOrderFailure = actionCreator(GET_ORDER_FAILURE);

export const holdOrder = actionCreator(HOLD_ORDER);
export const holdOrderSuccess = actionCreator(HOLD_ORDER_SUCCESS);
export const holdOrderFailure = actionCreator(HOLD_ORDER_FAILURE);

export const unholdOrder = actionCreator(UNHOLD_ORDER);
export const unholdOrderSuccess = actionCreator(UNHOLD_ORDER_SUCCESS);
export const unholdOrderFailure = actionCreator(UNHOLD_ORDER_FAILURE);

export const emailOrderStatus = actionCreator(EMAIL_ORDER_STATUS);
export const emailOrderStatusSuccess = actionCreator(EMAIL_ORDER_STATUS_SUCCESS);
export const emailOrderStatusFailure = actionCreator(EMAIL_ORDER_STATUS_FAILURE);

export const cancelOrder = actionCreator(CANCEL_ORDER);
export const cancelOrderSuccess = actionCreator(CANCEL_ORDER_SUCCESS);
export const cancelOrderFailure = actionCreator(CANCEL_ORDER_FAILURE);

export const getOrderStatus = actionCreator(GET_ORDER_STATUS);
export const getOrderStatusSuccess = actionCreator(GET_ORDER_STATUS_SUCCESS);
export const getOrderStatusFailure = actionCreator(GET_ORDER_STATUS_FAILURE);

export const getOrderComments = actionCreator(GET_ORDER_COMMENTS);
export const getOrderCommentsSuccess = actionCreator(GET_ORDER_COMMENTS_SUCCESS);
export const getOrderCommentsFailure = actionCreator(GET_ORDER_COMMENTS_FAILURE);

export const postOrderComment = actionCreator(POST_ORDER_COMMENT);
export const postOrderCommentSuccess = actionCreator(POST_ORDER_COMMENT_SUCCESS);
export const postOrderCommentFailure = actionCreator(POST_ORDER_COMMENT_FAILURE);

export const shipOrder = actionCreator(SHIP_ORDER);
export const shipOrderSuccess = actionCreator(SHIP_ORDER_SUCCESS);
export const shipOrderFailure = actionCreator(SHIP_ORDER_FAILURE);

export const invoiceOrder = actionCreator(INVOICE_ORDER);
export const invoiceOrderSuccess = actionCreator(INVOICE_ORDER_SUCCESS);
export const invoiceOrderFailure = actionCreator(INVOICE_ORDER_FAILURE);

export const getLocation = actionCreator(GET_LOCATION);
export const getLocationSuccess = actionCreator(GET_LOCATION_SUCCESS);
export const getLocationFailure = actionCreator(GET_LOCATION_FAILURE);

export const dateDayFilter = actionCreator(DATE_DAY_FILTER);
export const dateDayFilterSuccess = actionCreator(DATE_DAY_FILTER_SUCCESS);
export const dateDayFilterFailure = actionCreator(DATE_DAY_FILTER_FAILURE);

export const dateWeekFilter = actionCreator(DATE_WEEK_FILTER);
export const dateWeekFilterSuccess = actionCreator(DATE_WEEK_FILTER_SUCCESS);
export const dateWeekFilterFailure = actionCreator(DATE_WEEK_FILTER_FAILURE);

export const dateMonthFilter = actionCreator(DATE_MONTH_FILTER);
export const dateMonthFilterSuccess = actionCreator(DATE_MONTH_FILTER_SUCCESS);
export const dateMonthFilterFailure = actionCreator(DATE_MONTH_FILTER_FAILURE);
