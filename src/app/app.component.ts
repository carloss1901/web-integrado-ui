import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppAlertComponent } from './shared/components/app-alert/app-alert.component';
import { ScreenLoadingComponent } from './shared/components/screen-loading/screen-loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppAlertComponent, ScreenLoadingComponent],
  template: '<router-outlet /><app-alert /><app-screen-loading />'
})
export class AppComponent {}
