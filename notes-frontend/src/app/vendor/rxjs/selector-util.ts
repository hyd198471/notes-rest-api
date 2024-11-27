import { createSelector, Selector } from "@ngrx/store";

/** Convenience function to create a simple selector that picks a property from a state. */
export function createPropertySelector<S, K extends keyof S>(
    parent: Selector<any, S>,
    property: K
  ): Selector<any, S[K]> {
    return createSelector(parent, (state) => state[property]);
  }