import { Component } from "@angular/core";
import { ScreenLoadingService } from "../../../core/services/screen-loading.service";

@Component({
  selector: "app-screen-loading",
  standalone: true,
  templateUrl: "./screen-loading.component.html",
  styleUrl: "./screen-loading.component.scss",
})
export class ScreenLoadingComponent {
  constructor(public readonly loadingService: ScreenLoadingService) {}
}
