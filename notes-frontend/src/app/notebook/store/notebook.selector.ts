import { createPropertySelector } from "../../vendor/rxjs/selector-util";
import { NoteStateContainer } from "./notebook.reducer";

const state = (state: NoteStateContainer) => state.notes;

export const notebooks = createPropertySelector(state, 'notebooks');
export const loading = createPropertySelector(state, 'loading');
