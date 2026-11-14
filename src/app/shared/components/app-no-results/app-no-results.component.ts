import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-results',
  standalone: true,
  templateUrl: './app-no-results.component.html',
  styleUrl: './app-no-results.component.scss'
})
export class AppNoResultsComponent {
  @Input() message = 'No se encontraron resultados.';
}
