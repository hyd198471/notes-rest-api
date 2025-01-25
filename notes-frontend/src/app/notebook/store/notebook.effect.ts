import { inject, Injectable } from '@angular/core';
import { noteBookActions as actions } from './notebook.action';
import { EffectUtil } from '../../vendor/rxjs/effect-util';
import { NotebookService } from './notebook.service';
import { map } from 'rxjs';

@Injectable()
export class NoteEffect {
  private effects: EffectUtil = inject(EffectUtil);
  private service: NotebookService = inject(NotebookService);

  listNotebooks$ = this.effects.serviceCallFor(
    actions.listNotebooks,
    (action) => this.service.listNotebooks().pipe(map((notebooks) => ({ notebooks }))),
    actions.listNotebooksSuccess,
    actions.listNotebooksFailure
  );

  createNotebook$ = this.effects.serviceCallFor(
    actions.createNotebook,
    (action) =>
      this.service.createNotebook(action.notebook).pipe(map((notebook) => ({ notebook }))),
    actions.createNotebookSuccess,
    actions.createNotebookFailure
  );

  updateNotebook$ = this.effects.serviceCallFor(
    actions.updateNotebook,
    (action) =>
      this.service
        .updateNotebook(action.notebook, action.id)
        .pipe(map((notebook) => ({ notebook }))),
    actions.updateNotebookSuccess,
    actions.updateNotebookFailure
  );

  deleteNotebook$ = this.effects.serviceCallFor(
    actions.deleteNotebook,
    (action) => this.service.deleteNotebook(action.id),
    actions.deleteNotebookSuccess,
    actions.deleteNotebookFailure
  );
}
