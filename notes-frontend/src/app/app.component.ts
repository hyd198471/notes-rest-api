import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'notes-frontend';
  constructor(private _primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    // Initialize PrimeNG configuration if needed
    this._primengConfig.ripple = true; // Example PrimeNG configuration
  }
}
