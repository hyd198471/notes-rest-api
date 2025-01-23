import { ActionReducer } from '@ngrx/store';
import { arrayClone, arrayReplace } from '../types/array.type';
import { UnaryFunction } from '../types/function.type';

export type StateContainer<K extends string, T> = Record<K, T>;

/** Extract the state type from an ActionReducer. */
export type ActionReducerState<R extends ActionReducer<unknown>> =
  R extends ActionReducer<infer T> ? T : never;

/**
 * Convenience function to append items to an array within a reducer.
 *
 * @example
 * on(actions.myAction, (state, action) => ({ ...state, myItems: reducerAppendItems(state.myItems, action.newItem)}))
 */
export function reducerAppendItems<T>(items: T[], ...newItems: T[]): T[] {
  items = arrayClone(items);
  items.push(...newItems);
  return items;
}

/**
 * Convenience function to replace an item in an array within a reducer.
 *
 * @example
 * on(actions.myAction, (state, action) => ({ ...state, myItems: reducerReplaceItem(state.myItems, action.newItem, (item) => item.id)}))
 */
export function reducerReplaceItem<T, I>(
  items: T[],
  replacementItem: T,
  identityFn: UnaryFunction<T, I>
): T[] {
  const replaceId = identityFn(replacementItem);
  const index = items.findIndex((item) => identityFn(item) === replaceId);
  if (index >= 0) {
    items = arrayReplace(arrayClone(items), index, replacementItem);
  }
  return items;
}
