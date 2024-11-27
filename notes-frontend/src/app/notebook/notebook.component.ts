import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeNGModule } from '../primeng.module';
import { TranslocoModule } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { noteBookActions as actions } from './store/notebook.action';
import { notebooks } from './store/notebook.selector';
import { mixinSubscribeDestroy } from '../vendor/rxjs/subscribe-destroy.mixin';
import { Notebook } from './notebook';
import { Actions, ofType } from '@ngrx/effects';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-notebook',
  standalone: true,
  imports: [ReactiveFormsModule, PrimeNGModule, TranslocoModule, CommonModule],
  templateUrl: './notebook.component.html',
  styleUrl: './notebook.component.scss'
})
export class NotebookComponent extends  mixinSubscribeDestroy() implements OnInit {
  private fb = inject(FormBuilder);

  private readonly _store: Store= inject(Store);
  private readonly _actions: Actions = inject(Actions)

  public notebooks!: Notebook[];

  cols!: Column[];


  public form: FormGroup = this.fb.group({
    id: new FormControl<string | null>(null),
    name: new FormControl<string | null>(null, Validators.required),
    description: new FormControl<string | null>(null)
  });

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'createdAt', header: 'CreatedAt' },
      { field: 'updatedAt', header: 'updatedAt' }
  ];

    this._store.select(notebooks).pipe(this.untilDestroyed()).subscribe((value)=> this.notebooks = value);
    this._actions.pipe(ofType(
        actions.createNotebookSuccess
      ), this.untilDestroyed()
    ).subscribe(()=> {
      this.form.reset();
    })
    this._store.dispatch(actions.listNotebooks());
  }

  submit() {
    const value = this.form.getRawValue();
    this._store.dispatch(
      actions.createNotebook({notebook: value})
    )
  }

}
