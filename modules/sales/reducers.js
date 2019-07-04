import {
    CANCEL_ORDER,
    CANCEL_ORDER_FAILURE,
    CANCEL_ORDER_SUCCESS,
    EMAIL_ORDER_STATUS,
    EMAIL_ORDER_STATUS_FAILURE,
    EMAIL_ORDER_STATUS_SUCCESS,
    GET_LOCATION,
    GET_LOCATION_FAILURE,
    GET_LOCATION_SUCCESS,
    GET_ORDER_FAILURE,
    GET_ORDER_SUCCESS,
    GET_ORDERS,
    GET_ORDERS_FAILURE,
    GET_ORDERS_SUCCESS,
    HOLD_ORDER,
    HOLD_ORDER_FAILURE,
    HOLD_ORDER_SUCCESS,
    INVOICE_ORDER,
    INVOICE_ORDER_FAILURE,
    INVOICE_ORDER_SUCCESS,
    SHIP_ORDER,
    SHIP_ORDER_FAILURE,
    SHIP_ORDER_SUCCESS,
    UNHOLD_ORDER,
    UNHOLD_ORDER_FAILURE,
    UNHOLD_ORDER_SUCCESS,
    DATE_DAY_FILTER,
    DATE_DAY_FILTER_SUCCESS,
    DATE_DAY_FILTER_FAILURE,
    DATE_WEEK_FILTER,
    DATE_WEEK_FILTER_SUCCESS,
    DATE_WEEK_FILTER_FAILURE,
    DATE_MONTH_FILTER,
    DATE_MONTH_FILTER_SUCCESS,
    DATE_MONTH_FILTER_FAILURE
} from "./actionTypes";
import {GET_ORDER} from "../../common/endpoints";
import _ from 'lodash';

export const orders = (state = {
    isLoading: false,
    items: [],
    criteria: [],
    total: 0,
    itemsDay: [],
    itemsWeek: [],
    itemsMonth: [],
}, {type, payload}) => {
    switch (type) {
        case GET_ORDERS:
        case GET_ORDER:
            return {
                ...state,
                isLoading: true
            };
        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                items: payload.search_criteria.current_page === undefined || payload.search_criteria.current_page == 1
                    ? payload.items
                    : state.items.concat(payload.items),
                criteria: payload.search_criteria,
                total: payload.total_count,
                error: null,
                isLoading: false
            };
        case GET_ORDERS_FAILURE:
            return {
                ...state,
                error: payload,
                isLoading: false
            };
        case GET_ORDER_SUCCESS:
            let items = state.items;
            let index = _.findIndex(items, {'entity_id': payload.entity_id});
            if (index !== -1)
                items[index] = payload;
            return {
                ...state,
                items: items,
                isLoading: false
            };
        case GET_ORDER_FAILURE:
            return {
                ...state,
                error: payload,
                isLoading: false
            };
        case DATE_DAY_FILTER:
            return {
                ...state,
                isLoadingDay: true
            };
        case DATE_WEEK_FILTER:
            return {
                ...state,
                isLoadingWeek: true
            };
        case DATE_MONTH_FILTER:
            return {
                ...state,
                isLoadingMonth: true
            };
        case DATE_DAY_FILTER_SUCCESS:
            return {
                ...state,
                itemsDay: payload.items,
                isLoadingDay: false,
            };
        case DATE_WEEK_FILTER_SUCCESS:
            return {
                ...state,
                itemsWeek: payload.items,
                isLoadingWeek: false,
              };
        case DATE_MONTH_FILTER_SUCCESS:
            return {
                ...state,
                itemsMonth: payload.items,
                isLoadingMonth: false,
                };
        case DATE_DAY_FILTER_FAILURE:
            return {
                ...state,
                isLoadingDay: false
            };
        case DATE_WEEK_FILTER_FAILURE:
            return {
                ...state,
                isLoadingWeek: false
            };
        case DATE_MONTH_FILTER_FAILURE:
            return {
                ...state,
                isLoadingMonth: false
            };
        default:
            return state;
    }
};

export const action = (state = {
    isLoading: false,
    actionResponse: null
}, {type, payload}) => {
    switch (type) {
        case HOLD_ORDER:
        case UNHOLD_ORDER:
        case EMAIL_ORDER_STATUS:
        case CANCEL_ORDER:
        case SHIP_ORDER:
        case INVOICE_ORDER:
            return {
                ...state,
                isLoading: true,
                actionResponse: null
            };
        case HOLD_ORDER_SUCCESS:
        case UNHOLD_ORDER_SUCCESS:
        case EMAIL_ORDER_STATUS_SUCCESS:
        case CANCEL_ORDER_SUCCESS:
        case SHIP_ORDER_SUCCESS:
        case INVOICE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                actionResponse: payload ? 'Order status updated' : 'Unable to update order status'
            };
        case HOLD_ORDER_FAILURE:
        case UNHOLD_ORDER_FAILURE:
        case EMAIL_ORDER_STATUS_FAILURE:
        case CANCEL_ORDER_FAILURE:
        case SHIP_ORDER_FAILURE:
        case INVOICE_ORDER_FAILURE:
            return {
                ...state,
                isLoading: false,
                actionResponse: 'Unable to update order status'
            };
        default:
            return state;
    }
};

export const location = (state = {
    isLoading: false,
    coordinates: null,
    error: null
}, {type, payload}) => {
    switch (type) {
        case GET_LOCATION:
            return {
                ...state,
                isLoading: true
            };
        case GET_LOCATION_SUCCESS:
            let coordinates = {};
            if (payload.results[0]){
                coordinates = payload.results[0].geometry.location
            } else {
                coordinates["lat"] = 13.0969864
                coordinates["lng"] = 80.2001714
            }
            return {
                ...state,
                coordinates: coordinates,
                error: null,
                isLoading: false
            };
        case GET_LOCATION_FAILURE:
            return {
                ...state,
                error: payload,
                isLoading: false
            };
        default:
            return state;
    }
};
