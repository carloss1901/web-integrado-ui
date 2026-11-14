import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { MaestroResponse } from "../../../../api/api/models/maestro-response";
import { PlaceholderEnum } from "../../../../core/enums/placeholder.enum";

@Component({ selector: "app-incidencias-filter", standalone: true, imports: [CommonModule, ReactiveFormsModule, NgSelectModule], templateUrl: "./incidencias-filter.component.html" })
export class IncidenciasFilterComponent {
  readonly placeholders = PlaceholderEnum;
  @Input({ required: true }) form!: FormGroup;
  @Input() estados: MaestroResponse[] = [];
  @Input() categorias: MaestroResponse[] = [];
  @Input() severidades: MaestroResponse[] = [];
  @Input() prioridades: MaestroResponse[] = [];
  @Input() ubicaciones: MaestroResponse[] = [];
  @Output() search = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
}
