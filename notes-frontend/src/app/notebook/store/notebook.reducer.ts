import { createReducer, on } from "@ngrx/store";
import { reducerAppendItems, StateContainer } from "../../vendor/rxjs/reducer-util"
import { Notebook } from "../notebook";

import { noteBookActions as actions } from './notebook.action';
import { arrayClone } from "../../vendor/types/array.type";

export const STATE_NAME = 'notes'

export type NoteStateContainer = StateContainer<typeof STATE_NAME, NoteState>

export interface NoteState {
    loading: boolean;
    notebooks: Notebook[];
  }
  
  const initialState: NoteState = {
    loading: false,
    notebooks: []
  };

  export const noteReducer = createReducer(
    initialState,
    on(actions.listNotebooks, (state, action) => ({
        ...state,
        loading: true,
        notebooks: []
      })),
      on(actions.listNotebooksFailure, (state) => ({ ...state, loading: false })),
      on(actions.listNotebooksSuccess, (state, action) => ({
        ...state,
        loading: false,
        notebooks: arrayClone(action.notebooks)
      })),


    
    on(actions.createNotebookFailure, (state) => ({ ...state })),
    on(actions.createNotebookSuccess, (state, action)=>({
      ...state,
      notebooks: reducerAppendItems(state.notebooks, action.notebook)  
    }))

  )