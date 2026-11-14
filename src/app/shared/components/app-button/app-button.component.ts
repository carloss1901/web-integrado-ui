import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

type ButtonColor = "primary" | "light" | "danger" | "secondary";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./app-button.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppButtonComponent {
  @Input() texto = "Aceptar";
  @Input() icon = "";
  @Input() color: ButtonColor = "primary";
  @Input() type: "button" | "submit" | "reset" = "button";
  @Input() disabled = false;
  @Input() loading = false;
  @Input() loadingTexto = "Guardando...";
}
