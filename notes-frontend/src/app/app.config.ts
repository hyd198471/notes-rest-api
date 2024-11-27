import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { provideState, provideStore } from '@ngrx/store';
import { noteReducer, STATE_NAME } from './notebook/store/notebook.reducer';
import { NoteEffect } from './notebook/store/notebook.effect';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideTransloco({
        config: {
            availableLangs: ['en'],
            defaultLang: 'en',
            // Remove this option if your application doesn't support changing language in runtime.
            reRenderOnLangChange: true,
            prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
    }), provideStore(),
    provideState({name: STATE_NAME, reducer:noteReducer}), provideEffects([NoteEffect])]
};
