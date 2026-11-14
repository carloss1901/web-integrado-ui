import { Directive, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appOnlyNumbers]",
  standalone: true,
})
export class OnlyNumbersDirective {
  @Input() appOnlyNumbers = 8;

  @HostListener("input", ["$event"])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const maxDigits = Number(this.appOnlyNumbers) || 8;
    const value = input.value.replace(/\D/g, "").slice(0, maxDigits);

    if (input.value !== value) {
      input.value = value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
}
