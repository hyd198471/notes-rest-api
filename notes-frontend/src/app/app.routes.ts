import { Routes } from '@angular/router';
import { NotebookComponent } from './notebook/notebook.component';

export const routes: Routes = [
    { path: '', redirectTo: '/notebooks', pathMatch: 'full' },
    { path: 'notebooks', pathMatch: 'full', component: NotebookComponent },
];
