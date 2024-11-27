import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { noteReducer, STATE_NAME } from "./notebook.reducer";
import { NoteEffect } from "./notebook.effect";

@NgModule({
    imports: [
      StoreModule.forFeature(STATE_NAME, noteReducer),
      EffectsModule.forFeature([NoteEffect]),
    ]
  })
  export class NoteStoreModule {}