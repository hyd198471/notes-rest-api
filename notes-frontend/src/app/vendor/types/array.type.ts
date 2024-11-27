import { UnaryFunction } from "./function.type";

/** Convenience function for array cloning. */
export function arrayClone<T>(items: Array<T>, cloneFn?: UnaryFunction<T,T>): Array<T> {
    return cloneFn ? items.map(cloneFn): items.slice();
}

export function arrayReplace<T>(items: Array<T>, index: number, ...newItems: Array<T>): Array<T> {
    items.splice(arrayIndex(items, index), newItems.length, ...newItems)
    return items;
}

/** __PURE__ __INLINE__ */
function arrayIndex<T>(items: Array<T>, index: number): number {
    return index < 0 ? items.length + index : index;
  }
  