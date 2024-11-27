import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeNGModule } from '../primeng.module';
import { TranslocoModule } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { noteBookActions as actions } from './store/notebook.action';
import { noteReducer, STATE_NAME } from './store/notebook.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NoteEffect } from './store/notebook.effect';
@Component({
  selector: 'app-notebook',
  standalone: true,
  imports: [ReactiveFormsModule, PrimeNGModule, TranslocoModule, CommonModule],
  templateUrl: './notebook.component.html',
  styleUrl: './notebook.component.scss'
})
export class NotebookComponent implements OnInit {
  private fb = inject(FormBuilder);

  private readonly _store: Store= inject(Store);


  public form: FormGroup = this.fb.group({
    id: new FormControl<string | null>(null),
    name: new FormControl<string | null>(null, Validators.required),
    description: new FormControl<string | null>(null)
  });

  ngOnInit(): void {
    

  }

  submit() {
    const value = this.form.getRawValue();
    this._store.dispatch(
      actions.createNotebook({notebook: value})
    )
  }

}
