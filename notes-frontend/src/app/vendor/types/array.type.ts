import { UnaryFunction } from './function.type';

/** Convenience function for array cloning. */
export function arrayClone<T>(items: T[], cloneFn?: UnaryFunction<T, T>): T[] {
  return cloneFn ? items.map(cloneFn) : items.slice();
}

export function arrayReplace<T>(items: T[], index: number, ...newItems: T[]): T[] {
  items.splice(arrayIndex(items, index), newItems.length, ...newItems);
  return items;
}

/** __PURE__ __INLINE__ */
function arrayIndex<T>(items: T[], index: number): number {
  return index < 0 ? items.length + index : index;
}
