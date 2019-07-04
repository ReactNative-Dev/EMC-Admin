import {catchError, map, switchMap, tap} from "rxjs/operators";
import {fromPromise} from "rxjs/observable/fromPromise";
import {of} from "rxjs/observable/of";
import {ofType} from "redux-observable";

import {ADMIN_LOGIN} from "./actionTypes";
import {adminLoginFailure, adminLoginSuccess,} from "./actions";
import {handleResponse} from "../../common/utils";
import {adminLogin$$} from "./api";

export const adminLogin$ = action$ => {
    return action$.pipe(
        ofType(ADMIN_LOGIN),
        switchMap(({payload}) => {
            return fromPromise(adminLogin$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, adminLoginSuccess, adminLoginFailure)
                ),
                catchError(err => of(adminLoginFailure(err)))
            );
        })
    );
};