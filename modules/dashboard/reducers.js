import {
    GET_ORDERS_DAY,
    GET_ORDERS_DAY_SUCCESS,
    GET_ORDERS_DAY_FAILURE,
    GET_ORDERS_WEEK,
    GET_ORDERS_WEEK_SUCCESS,
    GET_ORDERS_WEEK_FAILURE,
    GET_ORDERS_MONTH,
    GET_ORDERS_MONTH_SUCCESS,
    GET_ORDERS_MONTH_FAILURE,
} from "./actionTypes";

export const orders = (state = {
    isLoadingDay: false,
    itemsDay: [],
    totalDay: 0,
    isLoadingWeek: false,
    itemsWeek: [],
    totalWeek: 0,
    isLoadingMonth: false,
    itemsMonth: [],
    totalMonth: 0,
    totalSalesDay: 0,
    totalSalesWeek: 0,
    totalSalesMonth: 0,
}, {type, payload}) => {
    switch (type) {
        case GET_ORDERS_DAY:
            return {
                ...state,
                isLoadingDay: true
            };
        case GET_ORDERS_WEEK:
            return {
                ...state,
                isLoadingWeek: true
            };
        case GET_ORDERS_MONTH:
            return {
                ...state,
                isLoadingMonth: true
            };
        case GET_ORDERS_DAY_SUCCESS:
            return {
                ...state,
                itemsDay: payload[0].orders,
                totalDay: payload[0].orders_count,
                errorDay: null,
                isLoadingDay: false,
                totalSalesDay: payload[0].sales,
                orderDataDay: payload[0].orders,
                online_customers: payload[0].online_customers
            };
        case GET_ORDERS_WEEK_SUCCESS:
            return {
                ...state,
                itemsWeek: payload[0].orders,
                totalWeek: payload[0].orders_count,
                errorWeek: null,
                isLoadingWeek: false,
                totalSalesWeek: payload[0].sales,
                orderDataWeek: payload[0].orders,
                online_customers: payload[0].online_customers
            };
        case GET_ORDERS_MONTH_SUCCESS:
            return {
                ...state,
                itemsMonth: payload[0].orders,
                totalMonth: payload[0].orders_count,
                errorMonth: null,
                isLoadingMonth: false,
                totalSalesMonth: payload[0].sales,
                orderDataMonth: payload[0].orders,
                online_customers: payload[0].online_customers
            };
        case GET_ORDERS_DAY_FAILURE:
            return {
                ...state,
                errorDay: payload,
                isLoadingDay: false
            };
        case GET_ORDERS_WEEK_FAILURE:
            return {
                ...state,
                errorWeek: payload,
                isLoadingWeek: false
            };
        case GET_ORDERS_MONTH_FAILURE:
            return {
                ...state,
                errorMonth: payload,
                isLoadingMonth: false
            };
        default:
            return state;
    }
};
