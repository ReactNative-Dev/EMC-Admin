import {AVAILABLE_STORES, AVAILABLE_STORES_FAILURE, AVAILABLE_STORES_SUCCESS} from "./actionTypes";

export const available = (state = {data: null}, {type, payload}) => {
    switch (type) {
        case AVAILABLE_STORES:
            return {
                ...state,
                isLoading: true
            };
        case AVAILABLE_STORES_SUCCESS:
            return {
                ...state,
                data: payload,
                isLoading: false
            };
        case AVAILABLE_STORES_FAILURE:
            return {
                ...state,
                error: payload,
                isLoading: false
            };
        default:
            return state;
    }
};
