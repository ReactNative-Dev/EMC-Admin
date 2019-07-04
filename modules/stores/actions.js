import {actionCreator} from "../../common/utils";
import {AVAILABLE_STORES, AVAILABLE_STORES_FAILURE, AVAILABLE_STORES_SUCCESS,} from "./actionTypes";

export const availableStores = actionCreator(AVAILABLE_STORES);
export const availableStoresSuccess = actionCreator(AVAILABLE_STORES_SUCCESS);
export const availableStoresFailure = actionCreator(AVAILABLE_STORES_FAILURE);
