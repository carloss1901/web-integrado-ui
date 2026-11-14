import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ScreenLoadingService {
  private readonly visibleState = signal(false);
  readonly visible = this.visibleState.asReadonly();

  show(): void {
    this.visibleState.set(true);
  }

  hide(): void {
    this.visibleState.set(false);
  }
}
