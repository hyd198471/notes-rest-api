/** Type retaining object spread. */
export function objectClone<T extends object>(obj: T): T {
    return { ...obj };
  }