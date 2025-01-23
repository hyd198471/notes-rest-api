import { Routes } from '@angular/router';
import { NotebookComponent } from './notebook/notebook.component';
import { provideState } from '@ngrx/store';
import { noteReducer, STATE_NAME } from './notebook/store/notebook.reducer';
import { provideEffects } from '@ngrx/effects';
import { NoteEffect } from './notebook/store/notebook.effect';

export const routes: Routes = [
  { path: '', redirectTo: '/notebooks', pathMatch: 'full' },
  {
    path: 'notebooks',
    pathMatch: 'full',
    component: NotebookComponent,
    providers: [
      provideState({ name: STATE_NAME, reducer: noteReducer }),
      provideEffects([NoteEffect]),
    ],
  },
];
