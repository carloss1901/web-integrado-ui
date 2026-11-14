import { Injectable, NgZone } from "@angular/core";

export interface AlertErrorDetail { campo?: string; mensaje?: string; }

export interface AlertToast {
  message: string;
  classname: string;
  delay: number;
  errores: AlertErrorDetail[];
}

@Injectable({ providedIn: "root" })
export class AlertService {
  toasts: AlertToast[] = [];

  constructor(private readonly zone: NgZone) {}

  success(message: string, delay = 3000): void { this.show(message, "bg-alert-success", delay); }
  error(message = "Ocurrió un error.", errores: AlertErrorDetail[] = [], delay = 4000): void {
    this.show(message, "bg-alert-danger", delay, errores);
  }
  warning(message: string, errores: AlertErrorDetail[] = [], delay = 4000): void {
    this.show(message, "bg-alert-warning", delay, errores);
  }
  info(message: string, errores: AlertErrorDetail[] = [], delay = 4000): void {
    this.show(message, "bg-alert-info", delay, errores);
  }

  private show(message: string, classname: string, delay: number, errores: AlertErrorDetail[] = []): void {
    this.zone.run(() => this.toasts.push({ message, classname, delay, errores }));
  }

  remove(toast: AlertToast): void {
    this.toasts = this.toasts.filter((item) => item !== toast);
  }
}
