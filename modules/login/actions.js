import {actionCreator} from "../../common/utils";
import {ADMIN_LOGIN, ADMIN_LOGIN_FAILURE, ADMIN_LOGIN_SUCCESS,} from "./actionTypes";

export const adminLogin = actionCreator(ADMIN_LOGIN);
export const adminLoginSuccess = actionCreator(ADMIN_LOGIN_SUCCESS);
export const adminLoginFailure = actionCreator(ADMIN_LOGIN_FAILURE);
