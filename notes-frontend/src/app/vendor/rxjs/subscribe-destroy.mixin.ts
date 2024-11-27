import { OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, Subject, takeUntil } from 'rxjs';
import { AbstractConstructor, Constructor, MixinBaseClass } from './mixin-types';


// --------------------------------------
// Observable auto unsubscription mixin
// --------------------------------------

// loosely based on Angular Material mixins
// @see https://github.com/angular/components/blob/main/src/material/core/common-behaviors/color.ts

interface CanSubscribeDestroy extends OnDestroy {
  // must declare public unless ticket is solved
  // @see https://github.com/Microsoft/TypeScript/issues/17744#issuecomment-558990381

  /**
   * RxJS operator function to pipe through, adding automatic unsubscription to all future subscriptions.
   *
   * @example
   * myObservable$.pipe(this.untilDestroyed()).subscribe(..);
   */
  /* protected */ untilDestroyed<T>(): MonoTypeOperatorFunction<T>;

  /**
   * Add automatic unsubscription to a RxJS `Observable`.
   * @param obs the `Observable` to be enhanced.
   *
   * @example
   * this.destroying(myObservable$).subscribe(..);
   */
  /* protected */ destroying<T>(obs: Observable<T>): Observable<T>;
}

type CanSubscribeDestroyCtor = Constructor<CanSubscribeDestroy> & AbstractConstructor<CanSubscribeDestroy>;

interface MaybeOnDestroy extends Partial<OnDestroy> {
  // must explicitly override because `Partial` loses method metainfo
  ngOnDestroy?(): void;
}

/** Mix-in ability to automatically unsubscribe from RxJS `Observable`s when a component reaches the end of its lifecycle.
 *
 * @example
 * export class MyClass extends mixinSubscribeDestroy(MyOriginalBaseClass) {
 *   ...
 *
 *   ngOnInit(): void {
 *     this.myObs$.pipe(this.untilDestroyed()).subscribe((val) => this.result = val);
 *   }
 * }
 */
export function mixinSubscribeDestroy<T extends AbstractConstructor<MaybeOnDestroy>>(
  base?: T
): CanSubscribeDestroyCtor & T;
// -- implementation
export function mixinSubscribeDestroy<T extends Constructor<MaybeOnDestroy>>(
  base: T = MixinBaseClass as any
): CanSubscribeDestroyCtor & T {
  return class extends base implements CanSubscribeDestroy {
    private readonly __destroy$ = new Subject<void>();

    /* protected */ untilDestroyed<T>(): MonoTypeOperatorFunction<T> {
      return (source) => source.pipe(takeUntil(this.__destroy$));
    }

    /* protected */ destroying<T>(obs: Observable<T>): Observable<T> {
      return obs.pipe(takeUntil(this.__destroy$));
    }

    override ngOnDestroy(): void {
      if (super.ngOnDestroy) {
        super.ngOnDestroy();
      }

      this.__destroy$.next();
      this.__destroy$.complete();
    }
  };
}
