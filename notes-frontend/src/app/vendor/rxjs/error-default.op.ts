import { catchError, MonoTypeOperatorFunction, throwError } from "rxjs";

export interface IServiceError {
    status?: number;
    message: string;
    error?: IServiceErrorDetails | null;
  }
  
  export interface IServiceErrorDetails {
    errorcode?: string;
    message: string;
    severity?: string;
    stackTrace?: string[];
    status?: string;
  }

  
export function errorDefault<T>(): MonoTypeOperatorFunction<T> {
    return (source) =>
      source.pipe(
        catchError((err: IServiceError, caught) =>
          throwError(() => {
            // NgRx tests for strict action serializability which causes problems with XHR errors
            // catch XHR errors in such manner that NgRx can live undisturbed
            // @see https://ngrx.io/guide/store/configuration/runtime-checks#strictactionserializability
            if (err.error instanceof ProgressEvent) {
              return <IServiceErrorDetails>{ message: err.error.message };
            }
            return err.error;
          })
        )
      );
  }
  
  export type ActionFault<F = unknown> = Record<'fault', F>;