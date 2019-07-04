import {ADMIN_LOGIN, ADMIN_LOGIN_FAILURE, ADMIN_LOGIN_SUCCESS,} from "./actionTypes";

export const user = (state = {data: null}, {type, payload}) => {
    switch (type) {
        case ADMIN_LOGIN:
            return {
                ...state,
                isLoading: true
            };
        case ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                data: payload[0],
                error: null,
                isLoading: false
            };
        case ADMIN_LOGIN_FAILURE:
            return {
                ...state,
                error: payload,
                isLoading: false
            };
        default:
            return state;
    }
};