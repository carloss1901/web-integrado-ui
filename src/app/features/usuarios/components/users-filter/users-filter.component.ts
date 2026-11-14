import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

import { PlaceholderEnum } from "../../../../core/enums/placeholder.enum";

@Component({
  selector: "app-users-filter",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: "./users-filter.component.html",
})
export class UsersFilterComponent {
  readonly placeholders = PlaceholderEnum;
  @Input({ required: true }) form!: FormGroup;
  @Input() estadoOptions: { valor: string; descripcion: string }[] = [];
  @Output() search = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
}
