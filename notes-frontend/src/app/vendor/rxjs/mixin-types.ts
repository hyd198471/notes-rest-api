/** Class constructor type. */
export type Constructor<T> = new (...args: any[]) => T;

/** Class constructor type for the `abstract` flavour. */
export type AbstractConstructor<T = object> = abstract new (...args: any[]) => T;

/** Stand-in base class to be use with mixins when no actual base class exists. */
export abstract class MixinBaseClass {}
