import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, ActionCreator, Creator, Store } from "@ngrx/store";
import { UnaryFunction } from "../types/function.type";
import { catchError, concatMap, map, Observable, of } from "rxjs";
import { ActionFault } from "./error-default.op";

@Injectable({providedIn: 'root'})
export class EffectUtil {
    constructor(
        public readonly actions$: Actions,
        public readonly store: Store,
      ) {}
        /**
   * Convenience function for creating effects with dedicated action, success and failure phases.
   * @param action the action to be observed.
   * @param actionCallFn the function to run once the action has been detected.
   * @param actionSuccessFn the action constructor to invoke after the call.
   * @param actionFailureFn (optional) the action constructor to invoke if the call faíls. *MUST* be an actionFailure compatible action.
   *
   * @example
   * serviceCallFor(
   *   actions.myAction,
   *   (action) => myService.callBackend(action.params).pipe(map((callResult) => ({ successActionParam: callResult.param }))),
   *   actions.myActionSuccess,
   *   actions.myActionFailure
   * );
   */
  serviceCallFor<TPayload extends object, TResult>(
    action: ActionCreator<string, Creator<any[], TPayload>>,
    actionCallFn: UnaryFunction<TPayload, Observable<TResult>>,
    actionSuccessFn: UnaryFunction<TResult, Action<string>>,
    actionFailureFn?: UnaryFunction<ActionFault, Action<string>>
  ) {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(action),
        concatMap((payload) => {
          let result$ = actionCallFn(payload as TPayload).pipe(map(actionSuccessFn));
          if (actionFailureFn) {
            result$ = result$.pipe(catchError((fault: unknown) => of(actionFailureFn({ fault }))));
          }
          return result$;
        })
      );
    });
  }
}