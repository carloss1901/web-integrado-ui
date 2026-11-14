import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NgbToast } from "@ng-bootstrap/ng-bootstrap";
import { AlertService, AlertToast } from "../../../core/services/alert.service";

@Component({
  selector: "app-alert",
  standalone: true,
  imports: [CommonModule, NgbToast],
  templateUrl: "./app-alert.component.html",
})
export class AppAlertComponent {
  constructor(public readonly alertService: AlertService) {}

  getIcon(classname: string): string {
    switch (classname) {
      case "bg-alert-success": return "icon-check-circle";
      case "bg-alert-warning": return "icon-alert-triangle";
      case "bg-alert-info": return "icon-info";
      default: return "icon-slash";
    }
  }

  cerrar(toast: AlertToast): void { this.alertService.remove(toast); }
}
