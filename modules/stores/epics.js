import {catchError, map, switchMap, tap} from "rxjs/operators";
import {fromPromise} from "rxjs/observable/fromPromise";
import {of} from "rxjs/observable/of";
import {ofType} from "redux-observable";

import {AVAILABLE_STORES} from "./actionTypes";
import {availableStoresFailure, availableStoresSuccess} from "./actions";
import {handleResponse} from "../../common/utils";
import {availableStores$$} from "./api";

export const availableStores$ = action$ => {
    return action$.pipe(
        ofType(AVAILABLE_STORES),
        switchMap(({payload}) => {
            return fromPromise(availableStores$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, availableStoresSuccess, availableStoresFailure)
                ),
                catchError(err => of(availableStoresFailure(err)))
            );
        })
    );
};
