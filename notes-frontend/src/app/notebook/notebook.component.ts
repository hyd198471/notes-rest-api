import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '../primeng.module';
import { TranslocoModule } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notebook',
  standalone: true,
  imports: [ReactiveFormsModule, PrimeNGModule,TranslocoModule, CommonModule],
  templateUrl: './notebook.component.html',
  styleUrl: './notebook.component.scss'
})
export class NotebookComponent implements OnInit{
  private fb = inject(FormBuilder);
  public form: FormGroup = this.fb.group({
    id: null as unknown as number, 
    name: null as unknown as string
  });
  ngOnInit(): void {
  }

 
}
