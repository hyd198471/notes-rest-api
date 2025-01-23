import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Notebook } from '../notebook';
import { ActionFault } from '../../vendor/rxjs/error-default.op';

export const noteBookActions = createActionGroup({
  source: 'Notes',
  events: {
    'List Notebooks': emptyProps(),
    'List Notebooks Success': props<{ notebooks: Notebook[] }>(),
    'List Notebooks Failure': props<ActionFault>(),
    'Create Notebook': props<{ notebook: Notebook }>(),
    'Create Notebook Success': props<{ notebook: Notebook }>(),
    'Create Notebook Failure': props<ActionFault>(),
    'Update Notebook': props<{ notebook: Notebook; id: number }>(),
    'Update Notebook Success': props<{ notebook: Notebook }>(),
    'Update Notebook Failure': props<ActionFault>(),
    'Delete Notebook': props<{ id: string }>(),
    'Delete Notebook Success': props<{ id: string }>(),
    'Delete Notebook Failure': props<ActionFault>(),
  },
});
